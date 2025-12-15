#!/bin/bash

# Image Optimization Script
# Converts PNG/JPG to WebP with high quality compression
# Usage: ./optimize-images.sh [--dry-run]

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Configuration
IMAGES_DIR="./public/images"
QUALITY=85  # WebP quality (0-100), 85 is a good balance
MIN_SIZE_KB=50  # Only convert files larger than this

DRY_RUN=false
if [ "$1" = "--dry-run" ]; then
    DRY_RUN=true
    echo -e "${YELLOW}[DRY RUN] No files will be modified${NC}"
fi

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

# Check dependencies
if ! command -v cwebp &> /dev/null; then
    echo -e "${RED}[ERROR] cwebp not found. Install with: brew install webp${NC}"
    exit 1
fi

echo ""
echo "=================================="
echo "  Image Optimization for Web"
echo "=================================="
echo ""

# Calculate initial size
INITIAL_SIZE=$(du -sh "$IMAGES_DIR" | cut -f1)
log_info "Initial images folder size: $INITIAL_SIZE"
echo ""

# Track statistics
CONVERTED=0
SKIPPED=0
SAVED_BYTES=0

# Convert PNG files to WebP
log_info "Converting PNG files to WebP..."
while IFS= read -r -d '' file; do
    # Get file size in KB
    SIZE_KB=$(ls -l "$file" | awk '{print int($5/1024)}')

    # Skip small files
    if [ "$SIZE_KB" -lt "$MIN_SIZE_KB" ]; then
        ((SKIPPED++))
        continue
    fi

    # Output file path (replace .png with .webp)
    WEBP_FILE="${file%.png}.webp"

    # Skip if webp already exists and is newer
    if [ -f "$WEBP_FILE" ] && [ "$WEBP_FILE" -nt "$file" ]; then
        ((SKIPPED++))
        continue
    fi

    if [ "$DRY_RUN" = true ]; then
        echo "Would convert: $file (${SIZE_KB}KB)"
        ((CONVERTED++))
    else
        # Convert to WebP
        if cwebp -q $QUALITY "$file" -o "$WEBP_FILE" 2>/dev/null; then
            # Get new size
            NEW_SIZE_KB=$(ls -l "$WEBP_FILE" | awk '{print int($5/1024)}')
            SAVED=$((SIZE_KB - NEW_SIZE_KB))
            SAVED_BYTES=$((SAVED_BYTES + SAVED))

            # Remove original PNG
            rm "$file"

            echo -e "${GREEN}✓${NC} $(basename "$file") → $(basename "$WEBP_FILE") (${SIZE_KB}KB → ${NEW_SIZE_KB}KB, saved ${SAVED}KB)"
            ((CONVERTED++))
        else
            log_warning "Failed to convert: $file"
        fi
    fi
done < <(find "$IMAGES_DIR" -type f -name "*.png" -print0)

# Convert JPG files to WebP
log_info "Converting JPG files to WebP..."
while IFS= read -r -d '' file; do
    SIZE_KB=$(ls -l "$file" | awk '{print int($5/1024)}')

    if [ "$SIZE_KB" -lt "$MIN_SIZE_KB" ]; then
        ((SKIPPED++))
        continue
    fi

    # Handle both .jpg and .jpeg extensions
    BASENAME="${file%.*}"
    WEBP_FILE="${BASENAME}.webp"

    if [ -f "$WEBP_FILE" ] && [ "$WEBP_FILE" -nt "$file" ]; then
        ((SKIPPED++))
        continue
    fi

    if [ "$DRY_RUN" = true ]; then
        echo "Would convert: $file (${SIZE_KB}KB)"
        ((CONVERTED++))
    else
        if cwebp -q $QUALITY "$file" -o "$WEBP_FILE" 2>/dev/null; then
            NEW_SIZE_KB=$(ls -l "$WEBP_FILE" | awk '{print int($5/1024)}')
            SAVED=$((SIZE_KB - NEW_SIZE_KB))
            SAVED_BYTES=$((SAVED_BYTES + SAVED))

            rm "$file"

            echo -e "${GREEN}✓${NC} $(basename "$file") → $(basename "$WEBP_FILE") (${SIZE_KB}KB → ${NEW_SIZE_KB}KB, saved ${SAVED}KB)"
            ((CONVERTED++))
        fi
    fi
done < <(find "$IMAGES_DIR" -type f \( -name "*.jpg" -o -name "*.jpeg" \) -print0)

# Optimize existing WebP files that are too large
log_info "Optimizing large WebP files..."
while IFS= read -r -d '' file; do
    SIZE_KB=$(ls -l "$file" | awk '{print int($5/1024)}')

    # Only re-optimize files larger than 500KB
    if [ "$SIZE_KB" -lt 500 ]; then
        continue
    fi

    if [ "$DRY_RUN" = true ]; then
        echo "Would re-optimize: $file (${SIZE_KB}KB)"
    else
        TEMP_FILE="${file}.tmp"
        if cwebp -q $QUALITY "$file" -o "$TEMP_FILE" 2>/dev/null; then
            NEW_SIZE_KB=$(ls -l "$TEMP_FILE" | awk '{print int($5/1024)}')

            # Only keep if smaller
            if [ "$NEW_SIZE_KB" -lt "$SIZE_KB" ]; then
                mv "$TEMP_FILE" "$file"
                SAVED=$((SIZE_KB - NEW_SIZE_KB))
                SAVED_BYTES=$((SAVED_BYTES + SAVED))
                echo -e "${GREEN}✓${NC} Re-optimized $(basename "$file") (${SIZE_KB}KB → ${NEW_SIZE_KB}KB)"
                ((CONVERTED++))
            else
                rm "$TEMP_FILE"
                ((SKIPPED++))
            fi
        fi
    fi
done < <(find "$IMAGES_DIR" -type f -name "*.webp" -print0)

echo ""
echo "=================================="
echo "  Summary"
echo "=================================="

if [ "$DRY_RUN" = false ]; then
    FINAL_SIZE=$(du -sh "$IMAGES_DIR" | cut -f1)
    echo -e "Initial size:  ${INITIAL_SIZE}"
    echo -e "Final size:    ${GREEN}${FINAL_SIZE}${NC}"
    echo -e "Space saved:   ${GREEN}~${SAVED_BYTES}KB${NC}"
fi

echo -e "Files converted: ${CONVERTED}"
echo -e "Files skipped:   ${SKIPPED}"
echo ""
log_success "Optimization complete!"
