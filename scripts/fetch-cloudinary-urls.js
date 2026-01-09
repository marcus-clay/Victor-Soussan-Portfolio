/**
 * Script pour récupérer toutes les URLs des assets Cloudinary
 *
 * Usage:
 * 1. Renseigne tes credentials Cloudinary ci-dessous
 * 2. Exécute: node scripts/fetch-cloudinary-urls.js
 * 3. Le résultat sera sauvegardé dans cloudinary-assets.json
 */

const https = require('https');
const fs = require('fs');

// ============================================
// RENSEIGNE TES CREDENTIALS ICI
// ============================================
const CLOUD_NAME = 'dqohphelh';
const API_KEY = 'REMPLACE_PAR_TON_API_KEY';
const API_SECRET = 'REMPLACE_PAR_TON_API_SECRET';
// ============================================

async function fetchAllResources(resourceType = 'image', nextCursor = null, allResources = []) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString('base64');

    let path = `/v1_1/${CLOUD_NAME}/resources/${resourceType}?max_results=500`;
    if (nextCursor) {
      path += `&next_cursor=${nextCursor}`;
    }

    const options = {
      hostname: 'api.cloudinary.com',
      path: path,
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const result = JSON.parse(data);

          if (result.error) {
            reject(new Error(result.error.message));
            return;
          }

          const resources = result.resources || [];
          allResources.push(...resources);

          console.log(`Fetched ${resources.length} ${resourceType}s (total: ${allResources.length})`);

          // Si il y a plus de résultats, continuer la pagination
          if (result.next_cursor) {
            const more = await fetchAllResources(resourceType, result.next_cursor, allResources);
            resolve(more);
          } else {
            resolve(allResources);
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function main() {
  console.log('🔍 Fetching all Cloudinary assets...\n');

  try {
    // Récupérer images et vidéos
    const images = await fetchAllResources('image');
    const videos = await fetchAllResources('video');

    const allAssets = [...images, ...videos];

    // Organiser par dossier
    const byFolder = {};
    allAssets.forEach(asset => {
      const folder = asset.folder || 'root';
      if (!byFolder[folder]) {
        byFolder[folder] = [];
      }
      byFolder[folder].push({
        public_id: asset.public_id,
        url: asset.secure_url,
        format: asset.format,
        width: asset.width,
        height: asset.height,
        resource_type: asset.resource_type
      });
    });

    // Créer le rapport
    const report = {
      total: allAssets.length,
      images: images.length,
      videos: videos.length,
      folders: Object.keys(byFolder).sort(),
      byFolder: byFolder,
      allUrls: allAssets.map(a => a.secure_url)
    };

    // Sauvegarder
    const outputPath = './cloudinary-assets.json';
    fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

    console.log('\n✅ Done!');
    console.log(`📊 Total assets: ${report.total}`);
    console.log(`   - Images: ${report.images}`);
    console.log(`   - Videos: ${report.videos}`);
    console.log(`📁 Folders: ${report.folders.length}`);
    console.log(`\n📄 Results saved to: ${outputPath}`);

    // Afficher les dossiers
    console.log('\n📂 Folders found:');
    report.folders.forEach(folder => {
      console.log(`   - ${folder} (${byFolder[folder].length} assets)`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n💡 Vérifie que tes credentials sont corrects.');
    console.log('   Tu peux les trouver dans Cloudinary > Settings > Access Keys');
  }
}

main();
