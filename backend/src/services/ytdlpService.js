// src/services/ytdlpService.js
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const TEMP_DIR = path.join(__dirname, '../../temp');

function extractVideoInfo(url) {
  return new Promise((resolve, reject) => {
    const args = [
      '--dump-json',
      '--no-warnings',
      '--skip-download',
      '--no-playlist',
      '--extractor-args', 'youtube:player_client=android,web',
      '--user-agent', 'com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip',
      url
    ];

    const ytdlp = spawn("python", ["-m", "yt_dlp", ...args]);
    let stdout = '';
    let stderr = '';

    ytdlp.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    ytdlp.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    ytdlp.on('close', (code) => {
      if (code !== 0) {
        console.error('yt-dlp error:', stderr);
        return reject(new Error('Failed to fetch video info. YouTube may be blocking requests'));
      }

      try {
        const info = JSON.parse(stdout);
        const formats = [];
        const videoFormats = info.formats || [];
        
        const qualityMap = {
          '360': { height: 360, label: '360p' },
          '480': { height: 480, label: '480p' },
          '720': { height: 720, label: '720p' },
          '1080': { height: 1080, label: '1080p' }
        };

        Object.entries(qualityMap).forEach(([key, { height, label }]) => {
          const matchingFormats = videoFormats.filter(f => 
            f.height === height && 
            f.vcodec && f.vcodec !== 'none' &&
            (f.ext === 'mp4' || f.ext === 'webm')
          );

          if (matchingFormats.length > 0) {
            matchingFormats.sort((a, b) => (b.filesize || 0) - (a.filesize || 0));
            const bestFormat = matchingFormats[0];

            formats.push({
              id: `mp4-${key}`,
              label: `MP4 ${label}`,
              quality: key,
              sizeMB: bestFormat.filesize 
                ? (bestFormat.filesize / (1024 * 1024)).toFixed(1)
                : calculateEstimatedSize(info.duration, height),
              format_id: bestFormat.format_id
            });
          }
        });

        if (formats.length === 0) {
          formats.push({
            id: 'mp4-best',
            label: 'MP4 Best Quality',
            quality: 'best',
            sizeMB: info.filesize 
              ? (info.filesize / (1024 * 1024)).toFixed(1)
              : calculateEstimatedSize(info.duration, 720),
            format_id: null
          });
        }

        const audioSize = info.filesize 
          ? ((info.filesize * 0.1) / (1024 * 1024)).toFixed(1)
          : ((info.duration * 128 * 1024) / (8 * 1024 * 1024)).toFixed(1);

        formats.push({
          id: 'mp3',
          label: 'MP3 Audio',
          quality: 'audio',
          sizeMB: audioSize,
          format_id: null
        });

        formats.sort((a, b) => {
          if (a.quality === 'audio') return 1;
          if (b.quality === 'audio') return -1;
          if (a.quality === 'best') return -1;
          if (b.quality === 'best') return 1;
          return parseInt(b.quality) - parseInt(a.quality);
        });

        const result = {
          title: sanitizeFilename(info.title || 'Unknown Title'),
          thumbnail: info.thumbnail || '',
          duration: info.duration || 0,
          formats: formats
        };

        resolve(result);
      } catch (err) {
        reject(new Error('Failed to parse video info'));
      }
    });

    setTimeout(() => {
      ytdlp.kill();
      reject(new Error('Request timeout'));
    }, 30000);
  });
}

function calculateEstimatedSize(duration, height) {
  if (!duration) return '~';
  const bitrateMap = { 360: 500, 480: 1000, 720: 2500, 1080: 5000 };
  const bitrate = bitrateMap[height] || 2500;
  const sizeBytes = (duration * bitrate * 1024) / 8;
  const sizeMB = sizeBytes / (1024 * 1024);
  return sizeMB.toFixed(1);
}

function sanitizeFilename(name) {
  return name.replace(/[<>:"/\\|?*]/g, '').replace(/\s+/g, '_').substring(0, 100);
}

function downloadVideoFile(url, formatData) {
  return new Promise((resolve, reject) => {
    const timestamp = Date.now();
    const outputTemplate = path.join(TEMP_DIR, `${timestamp}.%(ext)s`);

    let args;
    
    if (formatData.id === 'mp3') {
      args = [
        '-x',
        '--audio-format', 'mp3',
        '--audio-quality', '0',
        '--extractor-args', 'youtube:player_client=android,web',
        '--user-agent', 'com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip',
        '--no-warnings',
        '--no-playlist',
        '--no-check-certificates',
        '-o', outputTemplate,
        url
      ];
    } else {
      if (formatData.format_id) {
        args = [
          '-f', `${formatData.format_id}+bestaudio[ext=m4a]/bestaudio/best`,
          '--merge-output-format', 'mp4',
          '--extractor-args', 'youtube:player_client=android,web',
          '--user-agent', 'com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip',
          '--no-warnings',
          '--no-playlist',
          '--no-check-certificates',
          '--add-metadata',
          '-o', outputTemplate,
          url
        ];
      } else {
        args = [
          '-f', 'bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best',
          '--merge-output-format', 'mp4',
          '--extractor-args', 'youtube:player_client=android,web',
          '--user-agent', 'com.google.android.youtube/19.09.37 (Linux; U; Android 11) gzip',
          '--no-warnings',
          '--no-playlist',
          '--no-check-certificates',
          '--add-metadata',
          '-o', outputTemplate,
          url
        ];
      }
    }

    const ytdlp = spawn("python", ["-m", "yt_dlp", ...args]);
    let stderr = '';

    ytdlp.stderr.on('data', (data) => {
      const msg = data.toString();
      stderr += msg;
      if (msg.includes('%')) {
        process.stdout.write(`\r${msg.trim()}`);
      }
    });

    ytdlp.on('close', (code) => {
      if (code !== 0) {
        console.error('Download error:', stderr);
        return reject(new Error('Download failed'));
      }

      const ext = formatData.id === 'mp3' ? 'mp3' : 'mp4';
      const expectedPath = path.join(TEMP_DIR, `${timestamp}.${ext}`);

      if (!fs.existsSync(expectedPath)) {
        return reject(new Error('Downloaded file not found'));
      }

      const stats = fs.statSync(expectedPath);
      const actualSizeMB = (stats.size / (1024 * 1024)).toFixed(1);

      resolve({
        path: expectedPath,
        filename: `${sanitizeFilename(formatData.title || 'video')}_${formatData.quality}.${ext}`,
        sizeMB: actualSizeMB
      });
    });

    setTimeout(() => {
      ytdlp.kill();
      reject(new Error('Download timeout'));
    }, 600000);
  });
}

module.exports = { extractVideoInfo, downloadVideoFile };
