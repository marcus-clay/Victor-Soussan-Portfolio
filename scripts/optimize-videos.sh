#!/bin/bash

# Video Optimization Script for Progressive Loading
# This script optimizes videos for web delivery using FFmpeg
#
# Features:
# - Moves moov atom to the beginning (fast-start) for progressive playback
# - Generates poster/thumbnail images in WebP format
#
# Usage: ./optimize-videos.sh [--full]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
VIDEO_DIR="./public/videos"
OUTPUT_DIR="./public/videos/optimized"
THUMBNAIL_DIR="./public/videos/thumbnails"

# Quality settings for full mode
CRF=23
PRESET="medium"
MAX_WIDTH=1920
MAX_HEIGHT=1080
AUDIO_BITRATE="128k"

# Parse mode
MODE="quick"
if [ "$1" = "--full" ]; then
    MODE="full"
fi

# Functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if FFmpeg is installed
check_ffmpeg() {
    if ! command -v ffmpeg &> /dev/null; then
        log_error "FFmpeg is not installed. Please install it first:"
        echo "  macOS: brew install ffmpeg"
        echo "  Ubuntu: sudo apt install ffmpeg"
        exit 1
    fi
    log_success "FFmpeg found: $(ffmpeg -version | head -1)"
}

# Create output directories
setup_directories() {
    mkdir -p "$OUTPUT_DIR"
    mkdir -p "$THUMBNAIL_DIR"
    log_info "Output directory: $OUTPUT_DIR"
    log_info "Thumbnail directory: $THUMBNAIL_DIR"
}

# Generate thumbnail/poster from video
generate_thumbnail() {
    local input_file="$1"
    local name="$2"
    local thumbnail_file="$THUMBNAIL_DIR/${name}_poster.webp"

    # Extract frame at 1 second (or first frame if video is shorter)
    if ffmpeg -i "$input_file" \
        -ss 00:00:01 \
        -vframes 1 \
        -vf "scale='min(1280,iw)':-1" \
        -c:v libwebp \
        -quality 80 \
        -y \
        "$thumbnail_file" \
        2>/dev/null; then
        log_success "Thumbnail: ${name}_poster.webp"
    else
        # Fallback: extract first frame if 1 second doesn't exist
        ffmpeg -i "$input_file" \
            -vframes 1 \
            -vf "scale='min(1280,iw)':-1" \
            -c:v libwebp \
            -quality 80 \
            -y \
            "$thumbnail_file" \
            2>/dev/null
        log_success "Thumbnail (fallback): ${name}_poster.webp"
    fi
}

# Quick optimize - just add fast-start without re-encoding
quick_optimize() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local name="${filename%.*}"
    local output_file="$OUTPUT_DIR/${name}_faststart.mp4"

    log_info "Quick optimize (fast-start only): $filename"

    # Get original file size
    local original_size=$(ls -lh "$input_file" | awk '{print $5}')

    # Just move moov atom without re-encoding
    ffmpeg -i "$input_file" \
        -c copy \
        -movflags +faststart \
        -y \
        "$output_file" \
        2>/dev/null

    # Get optimized file size
    local optimized_size=$(ls -lh "$output_file" | awk '{print $5}')

    log_success "Fast-start added: $filename ($original_size → $optimized_size)"

    # Generate thumbnail
    generate_thumbnail "$input_file" "$name"
}

# Full optimize with re-encoding
full_optimize() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local name="${filename%.*}"
    local output_file="$OUTPUT_DIR/${name}_optimized.mp4"

    log_info "Full optimize: $filename"

    # Get original file size
    local original_size=$(ls -lh "$input_file" | awk '{print $5}')

    # Full optimization with H.264, fast-start, and compression
    ffmpeg -i "$input_file" \
        -c:v libx264 \
        -preset "$PRESET" \
        -crf "$CRF" \
        -vf "scale='min($MAX_WIDTH,iw)':'min($MAX_HEIGHT,ih)':force_original_aspect_ratio=decrease" \
        -c:a aac \
        -b:a "$AUDIO_BITRATE" \
        -movflags +faststart \
        -y \
        "$output_file" \
        2>/dev/null

    # Get optimized file size
    local optimized_size=$(ls -lh "$output_file" | awk '{print $5}')

    log_success "Optimized: $filename ($original_size → $optimized_size)"

    # Generate thumbnail
    generate_thumbnail "$input_file" "$name"
}

# Process all videos
process_videos() {
    log_info "Scanning directory: $VIDEO_DIR"
    log_info "Mode: $MODE"

    local video_count=0

    # Find all video files (excluding already optimized ones and the optimized folder)
    while IFS= read -r -d '' video_file; do
        # Skip files in optimized folder
        if [[ "$video_file" == *"/optimized/"* ]]; then
            continue
        fi

        ((video_count++))

        if [ "$MODE" = "full" ]; then
            full_optimize "$video_file"
        else
            quick_optimize "$video_file"
        fi

    done < <(find "$VIDEO_DIR" -type f \( -name "*.mp4" -o -name "*.mov" -o -name "*.webm" -o -name "*.avi" \) -print0 2>/dev/null)

    if [ $video_count -eq 0 ]; then
        log_warning "No video files found in $VIDEO_DIR"
    else
        log_success "Processed $video_count video(s)"
    fi
}

# Main execution
main() {
    echo ""
    echo "=================================="
    echo "  Video Optimization for Web"
    echo "=================================="
    echo ""

    check_ffmpeg
    setup_directories
    echo ""
    process_videos

    echo ""
    log_success "All videos processed!"
    echo ""
    echo "Output files are in: $OUTPUT_DIR"
    echo "Thumbnails are in: $THUMBNAIL_DIR"
    echo ""
    echo "To use in your React components:"
    echo "  import ProgressiveVideo from './components/ProgressiveVideo';"
    echo "  <ProgressiveVideo"
    echo "    src=\"/videos/optimized/my_video_faststart.mp4\""
    echo "    poster=\"/videos/thumbnails/my_video_poster.webp\""
    echo "  />"
    echo ""
}

main
