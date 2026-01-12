#!/bin/bash
set -e

echo "========================================="
echo "🚀 Starting Build Process"
echo "========================================="

# Step 1: Install yt-dlp
echo ""
echo "📥 Step 1: Installing yt-dlp..."
curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o yt-dlp
chmod a+rx yt-dlp
export PATH="$PWD:$PATH"

# Verify yt-dlp
if ./yt-dlp --version; then
    echo "✅ yt-dlp installed successfully"
else
    echo "❌ yt-dlp installation failed"
    exit 1
fi

# Step 2: Install Node dependencies
echo ""
echo "📦 Step 2: Installing Node.js dependencies..."
npm ci --production

echo ""
echo "========================================="
echo "✅ Build Complete!"
echo "========================================="