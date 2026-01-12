// src/utils/cleaner.js
const fs = require('fs');
const path = require('path');

/**
 * Delete a file safely
 */
function cleanupFile(filePath) {
  if (!filePath) return;

  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Deleted: ${path.basename(filePath)}`);
    }
  } catch (err) {
    console.error(`Failed to delete ${filePath}:`, err.message);
  }
}

/**
 * Clean old temp files (older than 1 hour)
 */
function cleanOldFiles(tempDir, maxAgeMs = 3600000) {
  try {
    const files = fs.readdirSync(tempDir);
    const now = Date.now();

    files.forEach(file => {
      const filePath = path.join(tempDir, file);
      const stats = fs.statSync(filePath);
      const age = now - stats.mtimeMs;

      if (age > maxAgeMs) {
        cleanupFile(filePath);
      }
    });
  } catch (err) {
    console.error('Cleanup error:', err.message);
  }
}

// Run cleanup every 30 minutes
setInterval(() => {
  const tempDir = path.join(__dirname, '../../temp');
  cleanOldFiles(tempDir);
}, 1800000);

module.exports = { cleanupFile, cleanOldFiles };