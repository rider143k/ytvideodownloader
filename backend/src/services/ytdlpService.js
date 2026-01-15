const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const TEMP_DIR = path.join(__dirname, '../../temp');
const COOKIE_PATH = path.join(__dirname, '../../cookies.txt');

// Ensure temp dir
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

/**
 * Extract Video Info (with anti-bot bypass)
 */
function extractVideoInfo(url) {
  return new Promise((resolve, reject) => {
    const args = [
      '--dump-json',
      '--skip-download',
      '--force-ipv4',
      '--geo-bypass',
      '--no-warnings',
      '--no-playlist',
      '--referer=https://www.youtube.com',
      '--extractor-args=youtube:player_client=android,player_skip=configs',
      '--user-agent=Mozilla/5.0 (Linux; Android 12; Mobile)',
    ];

    // optional cookie mode (for age-gated / music)
    if (fs.existsSync(COOKIE_PATH)) {
      args.push('--cookies', COOKIE_PATH);
    }

    args.push(url);

    const ytdlp = spawn('yt-dlp', args);

    let stdout = '';
    let stderr = '';

    ytdlp.stdout.on('data', (data) => stdout += data.toString());
    ytdlp.stderr.on('data', (data) => stderr += data.toString());

    ytdlp.on('close', (code) => {
      if (code !== 0) {
        console.error('yt-dlp info error:', stderr);
        return reject(new Error('Failed to fetch video info'));
      }

      try {
        const info = JSON.parse(stdout);
        const formats = buildFormats(info);
        resolve({
          title: sanitize(info.title),
          thumbnail: info.thumbnail || '',
          duration: info.duration || 0,
          formats
        });
      } catch (err) {
        reject(new Error('Failed to parse video info'));
      }
    });

    setTimeout(() => {
      ytdlp.kill();
      reject(new Error('Info request timed out'));
    }, 25000);
  });
}

/**
 * Build output format list
 */
function buildFormats(info) {
  const result = [];
  const available = info.formats || [];

  // supported qualities
  const preset = [1080, 720, 480, 360];

  preset.forEach(h => {
    const match = available.filter(f =>
      f.height === h &&
      f.vcodec !== 'none' &&
      (f.ext === 'mp4' || f.ext === 'webm')
    ).sort((a, b) => (b.filesize || 0) - (a.filesize || 0));

    if (match.length > 0) {
      const best = match[0];
      result.push({
        id: `mp4-${h}`,
        label: `MP4 ${h}p`,
        sizeMB: calcSize(info.duration, h, best.filesize),
        format_id: best.format_id,
        quality: h
      });
    }
  });

  // add fallback best video
  if (result.length === 0) {
    result.push({
      id: 'mp4-best',
      label: 'MP4 Best',
      sizeMB: calcSize(info.duration, 720),
      format_id: null,
      quality: 'best'
    });
  }

  // add MP3 option
  result.push({
    id: 'mp3',
    label: 'MP3 Audio',
    format_id: null,
    quality: 'audio',
    sizeMB: calcAudioSize(info.duration)
  });

  return result;
}

/**
 * Download video/audio
 */
function downloadVideoFile(url, fmt) {
  return new Promise((resolve, reject) => {
    const ts = Date.now();
    const out = path.join(TEMP_DIR, `${ts}.%(ext)s`);

    let args = [];

    if (fmt.id === 'mp3') {
      args = [
        '-x', '--audio-format', 'mp3', '--audio-quality', '0',
        '--no-warnings', '--geo-bypass', '--force-ipv4',
        '--referer=https://www.youtube.com',
        '--extractor-args=youtube:player_client=android,player_skip=configs',
        '--user-agent=Mozilla/5.0 (Linux; Android 12; Mobile)',
        '-o', out
      ];
    } else {
      if (fmt.format_id) {
        args = [
          '-f', `${fmt.format_id}+bestaudio[ext=m4a]/bestaudio`,
          '--merge-output-format', 'mp4',
          '--add-metadata', '--geo-bypass', '--force-ipv4',
          '--referer=https://www.youtube.com',
          '--extractor-args=youtube:player_client=android,player_skip=configs',
          '--user-agent=Mozilla/5.0 (Linux; Android 12; Mobile)',
          '-o', out
        ];
      } else {
        args = [
          '-f', 'bestvideo+bestaudio/best',
          '--merge-output-format', 'mp4',
          '--add-metadata', '--geo-bypass', '--force-ipv4',
          '--referer=https://www.youtube.com',
          '--extractor-args=youtube:player_client=android,player_skip=configs',
          '--user-agent=Mozilla/5.0 (Linux; Android 12; Mobile)',
          '-o', out
        ];
      }
    }

    if (fs.existsSync(COOKIE_PATH)) {
      args.push('--cookies', COOKIE_PATH);
    }

    args.push(url);

    const ytdlp = spawn('yt-dlp', args);

    ytdlp.on('close', (code) => {
      if (code !== 0) return reject(new Error('Download failed'));

      const ext = fmt.id === 'mp3' ? 'mp3' : 'mp4';
      const file = path.join(TEMP_DIR, `${ts}.${ext}`);

      if (!fs.existsSync(file)) return reject(new Error('File missing'));

      resolve({
        path: file,
        filename: `${sanitize(fmt.label)}.${ext}`,
        sizeMB: (fs.statSync(file).size / (1024 * 1024)).toFixed(1)
      });
    });
  });
}

/* Helpers */

function calcSize(duration, height, real) {
  if (real) return (real / 1024 / 1024).toFixed(1);
  const bitrate = {360:500,480:1000,720:2500,1080:5000}[height] || 2000;
  return ((duration * bitrate * 1024)/8/1024/1024).toFixed(1);
}

function calcAudioSize(duration) {
  const kbps = 128;
  return ((duration * kbps * 1024)/8/1024/1024).toFixed(1);
}

function sanitize(name) {
  return name.replace(/[<>:"/\\|?*]/g,'').substring(0,100);
}

module.exports = { extractVideoInfo, downloadVideoFile };
