#!/bin/bash
set -e

echo "========================================="
echo "🚀 Starting Railway Build"
echo "========================================="

# Step 1 — Install system deps
echo ""
echo "📥 Updating system packages..."
apt-get update -y || true

echo ""
echo "📥 Installing ffmpeg..."
apt-get install -y ffmpeg || true

# Step 2 — Install yt-dlp
echo ""
echo "📥 Installing yt-dlp..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
chmod +x /usr/local/bin/yt-dlp

# Verify yt-dlp
echo ""
if yt-dlp --version; then
    echo "✅ yt-dlp installed"
else
    echo "❌ yt-dlp failed"
    exit 1
fi

# Step 3 — Install Node deps
echo ""
echo "📦 Installing Node dependencies..."
npm install --omit=dev --legacy-peer-deps

echo ""
echo "========================================="
echo "💯 Railway Build Complete"
echo "========================================="
