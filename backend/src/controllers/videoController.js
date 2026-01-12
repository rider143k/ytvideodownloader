// src/controllers/videoController.js
const { extractVideoInfo, downloadVideoFile } = require('../services/ytdlpService');
const { isValidYouTubeUrl } = require('../utils/validator');
const { cleanupFile } = require('../utils/cleaner');

/**
 * POST /api/info
 * Get video metadata with all available qualities
 */
async function getVideoInfo(req, res) {
  try {
    const { url } = req.body;

    if (!url || !isValidYouTubeUrl(url)) {
      return res.status(400).json({ 
        error: 'Invalid YouTube URL' 
      });
    }

    console.log(`📥 Fetching info: ${url}`);
    
    const info = await extractVideoInfo(url);
    
    console.log(`✅ Found ${info.formats.length} formats`);
    
    res.json(info);

  } catch (error) {
    console.error('Info Error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch video info',
      message: error.message 
    });
  }
}

/**
 * GET /api/download
 * Download video/audio file
 */
async function downloadVideo(req, res) {
  let filePath = null;

  try {
    const { url, format, quality, title } = req.query;

    if (!url || !isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    if (!format) {
      return res.status(400).json({ error: 'Format is required' });
    }

    console.log(`⬇️  Downloading: ${format} (${quality || 'default'})`);

    // Get fresh metadata to ensure we have the correct format_id
    const info = await extractVideoInfo(url);
    const selectedFormat = info.formats.find(f => f.id === format);

    if (!selectedFormat) {
      return res.status(400).json({ error: 'Invalid format selected' });
    }

    // Add title to format for better filename
    const formatData = {
      ...selectedFormat,
      title: title || info.title
    };

    // Download file
    const { path: downloadPath, filename, sizeMB } = await downloadVideoFile(url, formatData);
    filePath = downloadPath;

    console.log(`✅ Download complete: ${filename} (${sizeMB} MB)`);

    // Get file stats
    const fs = require('fs');
    const stats = fs.statSync(filePath);
    
    // Set proper headers for DIRECT browser download
    const contentType = formatData.id === 'mp3' ? 'audio/mpeg' : 'video/mp4';
    const safeFilename = encodeURIComponent(filename).replace(/[!'()*]/g, (c) => {
      return '%' + c.charCodeAt(0).toString(16);
    });
    
    // CRITICAL HEADERS for browser download
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${safeFilename}`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('X-Content-Type-Options', 'nosniff');

    // Stream file to response with proper error handling
    const fileStream = fs.createReadStream(filePath);
    let streamClosed = false;

    fileStream.on('error', (err) => {
      console.error('Stream error:', err);
      streamClosed = true;
      if (!res.headersSent) {
        res.status(500).json({ error: 'Download failed' });
      }
      cleanupFile(filePath);
    });

    fileStream.on('end', () => {
      console.log('📤 File stream ended');
    });

    res.on('finish', () => {
      console.log('📤 Response finished, cleaning up...');
      if (!streamClosed) {
        setTimeout(() => cleanupFile(filePath), 2000);
      }
    });

    res.on('close', () => {
      console.log('📤 Connection closed');
      if (!streamClosed) {
        setTimeout(() => cleanupFile(filePath), 1000);
      }
    });

    res.on('error', (err) => {
      console.error('Response error:', err);
      streamClosed = true;
      cleanupFile(filePath);
    });

    // Pipe the file stream to response
    fileStream.pipe(res);

  } catch (error) {
    console.error('Download Error:', error.message);
    
    if (filePath) cleanupFile(filePath);
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Download failed',
        message: error.message 
      });
    }
  }
}

module.exports = { getVideoInfo, downloadVideo };