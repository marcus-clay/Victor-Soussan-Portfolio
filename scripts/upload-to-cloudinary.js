#!/usr/bin/env node

/**
 * Upload all images from public/images to Cloudinary
 *
 * Usage: node scripts/upload-to-cloudinary.js
 *
 * This script:
 * 1. Scans public/images for all image files
 * 2. Uploads each to Cloudinary with the same folder structure
 * 3. Preserves original quality (Cloudinary optimizes on-the-fly)
 */

import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dqohphelh',
  api_key: '944738695712364',
  api_secret: 'MRhjIhk3JKlQSshHT2ng3VlcGnY',
});

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg'];

// Track upload progress
let uploaded = 0;
let skipped = 0;
let failed = 0;
let total = 0;

/**
 * Recursively get all image files in a directory
 */
function getImageFiles(dir, baseDir = dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return files;
  }

  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getImageFiles(fullPath, baseDir));
    } else {
      const ext = path.extname(item).toLowerCase();
      if (SUPPORTED_EXTENSIONS.includes(ext)) {
        const relativePath = path.relative(baseDir, fullPath);
        files.push({ fullPath, relativePath });
      }
    }
  }

  return files;
}

/**
 * Convert local path to Cloudinary public ID
 */
function toPublicId(relativePath) {
  // Remove extension and convert to forward slashes
  const withoutExt = relativePath.replace(/\.[^.]+$/, '');
  const normalized = withoutExt.split(path.sep).join('/');
  return `portfolio/${normalized}`;
}

/**
 * Check if image already exists in Cloudinary
 */
async function imageExists(publicId) {
  try {
    await cloudinary.api.resource(publicId);
    return true;
  } catch (error) {
    if (error.error?.http_code === 404) {
      return false;
    }
    throw error;
  }
}

/**
 * Upload a single image to Cloudinary
 */
async function uploadImage(filePath, relativePath, options = {}) {
  const publicId = toPublicId(relativePath);
  const { overwrite = false } = options;

  try {
    // Check if already exists (skip if not overwriting)
    if (!overwrite) {
      const exists = await imageExists(publicId);
      if (exists) {
        skipped++;
        console.log(`⏭️  Skipped (exists): ${relativePath}`);
        return { success: true, skipped: true };
      }
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      overwrite: overwrite,
      resource_type: 'image',
      // Preserve original quality - Cloudinary optimizes on delivery
      quality: 'auto:best',
      // Keep original format for SVGs, convert others
      format: path.extname(relativePath).toLowerCase() === '.svg' ? 'svg' : undefined,
    });

    uploaded++;
    const sizeMB = (result.bytes / 1024 / 1024).toFixed(2);
    console.log(`✅ Uploaded: ${relativePath} (${sizeMB}MB)`);

    return { success: true, result };
  } catch (error) {
    failed++;
    console.error(`❌ Failed: ${relativePath} - ${error.message}`);
    return { success: false, error };
  }
}

/**
 * Upload all images with concurrency control
 */
async function uploadAllImages(options = {}) {
  const { concurrency = 5, overwrite = false } = options;

  console.log('\n📁 Scanning for images in public/images...\n');

  const images = getImageFiles(IMAGES_DIR);
  total = images.length;

  if (total === 0) {
    console.log('No images found to upload.');
    return;
  }

  console.log(`Found ${total} images to process.\n`);
  console.log('─'.repeat(50));

  // Process in batches for concurrency control
  for (let i = 0; i < images.length; i += concurrency) {
    const batch = images.slice(i, i + concurrency);
    await Promise.all(
      batch.map(({ fullPath, relativePath }) =>
        uploadImage(fullPath, relativePath, { overwrite })
      )
    );

    // Progress update
    const progress = Math.min(i + concurrency, total);
    console.log(`\n📊 Progress: ${progress}/${total} (${Math.round(progress / total * 100)}%)\n`);
  }

  // Summary
  console.log('\n' + '═'.repeat(50));
  console.log('📋 UPLOAD SUMMARY');
  console.log('═'.repeat(50));
  console.log(`✅ Uploaded: ${uploaded}`);
  console.log(`⏭️  Skipped:  ${skipped}`);
  console.log(`❌ Failed:   ${failed}`);
  console.log(`📁 Total:    ${total}`);
  console.log('═'.repeat(50));

  if (uploaded > 0) {
    console.log('\n🎉 Images are now available via Cloudinary CDN!');
    console.log('   Use the cloudinary.ts utility to generate optimized URLs.\n');
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const overwrite = args.includes('--overwrite') || args.includes('-o');
const concurrency = parseInt(args.find(a => a.startsWith('--concurrency='))?.split('=')[1] || '5');

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Cloudinary Image Upload Script

Usage: node scripts/upload-to-cloudinary.js [options]

Options:
  --overwrite, -o     Overwrite existing images in Cloudinary
  --concurrency=N     Number of parallel uploads (default: 5)
  --help, -h          Show this help message

Examples:
  node scripts/upload-to-cloudinary.js
  node scripts/upload-to-cloudinary.js --overwrite
  node scripts/upload-to-cloudinary.js --concurrency=10
`);
  process.exit(0);
}

// Run the upload
uploadAllImages({ overwrite, concurrency });
