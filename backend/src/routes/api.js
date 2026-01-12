// src/routes/api.js
const express = require('express');
const router = express.Router();
const { getVideoInfo, downloadVideo } = require('../controllers/videoController');

// POST /api/info - Get video metadata
router.post('/info', getVideoInfo);

// GET /api/download - Download video/audio
router.get('/download', downloadVideo);

module.exports = router;