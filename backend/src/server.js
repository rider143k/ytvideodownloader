// src/server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Ensure temp directory exists
const tempDir = path.join(__dirname, '../temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Add yt-dlp to PATH for Render production
if (process.env.NODE_ENV === 'production') {
  const ytdlpPath = path.resolve(__dirname, '..');
  process.env.PATH = `${ytdlpPath}:${process.env.PATH}`;
  console.log('✅ Production mode: yt-dlp added to PATH');
}

// ===================== CORS CONFIG ===================== //

const allowedOrigins = [
  process.env.FRONTEND_URL,                // env frontend
  'http://localhost:3000',                 // local dev
  /\.vercel\.app$/,                        // vercel preview + prod
  /\.onrender\.com$/,                      // render backend
  /\.railway\.app$/,                       // railway backend (future)
  'https://yourfuturedomain.com'           // custom domain placeholder
].filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.some(rule =>
    (rule instanceof RegExp ? rule.test(origin) : rule === origin)
  )) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length');

  // handle preflight
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// ======================================================== //

app.use(express.json({ limit: '10mb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api', apiRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('========================================');
  console.log(`✅ Backend running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Temp directory: ${tempDir}`);
  console.log(`✅ Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`);
  console.log('========================================');
});
