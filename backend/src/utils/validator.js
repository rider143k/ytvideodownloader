// src/utils/validator.js

/**
 * Validate YouTube URL
 * Only allows public YouTube video URLs
 */
function isValidYouTubeUrl(url) {
  if (!url || typeof url !== 'string') return false;

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();

    // Allow youtube.com and youtu.be domains
    const validHosts = [
      'www.youtube.com',
      'youtube.com',
      'm.youtube.com',
      'youtu.be'
    ];

    if (!validHosts.includes(hostname)) {
      return false;
    }

    // Check for video ID
    const videoId = urlObj.searchParams.get('v') || 
                   (hostname === 'youtu.be' ? urlObj.pathname.slice(1) : null);

    return !!videoId && videoId.length === 11;

  } catch {
    return false;
  }
}

module.exports = { isValidYouTubeUrl };