#!/bin/bash

# Generate Responsive Image Sizes
# Creates multiple sizes for srcset (400w, 800w, 1200w)

set -e

IMAGES_DIR="./public/images"
QUALITY=85

echo "==================================="
echo "  Generating Responsive Images"
echo "==================================="
echo ""

# Thumbnails to process (homepage critical images)
THUMBNAILS=(
    "thumbnail-toolkit.webp"
    "thumbnail-connect.webp"
    "thumbnail-sqool-suite.webp"
    "thumbnail-dailymotion-web-platform.webp"
    "thumbnail-pagesjaunes-multidevices.webp"
    "francevae/thumbnail_france_vae.webp"
    "francevae/thumbnail_france_vae_02.webp"
    "toolkit/thumbnail_toolkit_02.webp"
    "dailymotion/thubmnail_dailymotion_03.webp"
)

SIZES=(400 800 1200)

for thumb in "${THUMBNAILS[@]}"; do
    input="$IMAGES_DIR/$thumb"

    if [ ! -f "$input" ]; then
        echo "Skipping (not found): $thumb"
        continue
    fi

    filename=$(basename "$input" .webp)
    dir=$(dirname "$input")

    echo "Processing: $thumb"

    for size in "${SIZES[@]}"; do
        output="$dir/${filename}-${size}w.webp"

        # Skip if already exists
        if [ -f "$output" ]; then
            echo "  ${size}w exists, skipping"
            continue
        fi

        # Resize using cwebp with resize
        cwebp -q $QUALITY -resize $size 0 "$input" -o "$output" 2>/dev/null

        if [ $? -eq 0 ]; then
            new_size=$(ls -lh "$output" | awk '{print $5}')
            echo "  Created: ${filename}-${size}w.webp ($new_size)"
        fi
    done
done

echo ""
echo "==================================="
echo "  Complete!"
echo "==================================="
