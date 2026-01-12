# YouTube Video Downloader Backend

Simple, stable, and production-ready backend for YouTube video downloading.

## ✅ Features

- **Two endpoints**: `/api/info` and `/api/download`
- **Formats**: MP4 (video) and MP3 (audio)
- **Security**: No logging, no data storage
- **Stability**: Simple spawn-based yt-dlp execution
- **Cross-platform**: Works on Windows and Linux

---

## 📦 Installation

### 1. Install yt-dlp

**Ubuntu/Linux:**
```bash
sudo wget https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -O /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

**Windows:**
- Download `yt-dlp.exe` from [official releases](https://github.com/yt-dlp/yt-dlp/releases)
- Place it in your PATH or project root

**Verify installation:**
```bash
yt-dlp --version
```

### 2. Install Node.js dependencies

```bash
npm install
```

### 3. Create `.env` file

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
FRONTEND_URL=http://localhost:3000
```

---

## 🚀 Usage

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

Server runs on: `http://localhost:5000`

---

## 🔌 API Endpoints

### 1️⃣ POST `/api/info`

Get video metadata.

**Request:**
```json
{
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
}
```

**Response:**
```json
{
  "title": "Rick Astley - Never Gonna Give You Up",
  "thumbnail": "https://...",
  "duration": 212,
  "formats": [
    {
      "id": "mp4",
      "label": "MP4 Video",
      "sizeMB": "8.5"
    },
    {
      "id": "mp3",
      "label": "MP3 Audio",
      "sizeMB": "3.2"
    }
  ]
}
```

### 2️⃣ GET `/api/download`

Download video/audio file.

**Request:**
```
GET /api/download?url=<youtube_url>&format=mp4
```

**Parameters:**
- `url`: YouTube video URL
- `format`: `mp4` or `mp3`

**Response:**
- Direct file download stream

---

## 🌐 Frontend Integration

Update your **Next.js** `.env.local`:

```bash
NEXT_PUBLIC_API_BASE=http://localhost:5000
```

Your frontend code is already compatible! The backend matches these endpoints:
- `POST /api/info` ✅
- `GET /api/download` ✅

---

## 📂 Folder Structure

```
youtube-downloader-backend/
├── src/
│   ├── server.js              # Express server
│   ├── routes/
│   │   └── api.js             # API routes
│   ├── controllers/
│   │   └── videoController.js # Request handlers
│   ├── services/
│   │   └── ytdlpService.js    # yt-dlp wrapper
│   └── utils/
│       ├── validator.js       # URL validation
│       └── cleaner.js         # Temp file cleanup
├── temp/                      # Temporary downloads (auto-cleanup)
├── .env
├── package.json
└── README.md
```

---

## 🔒 Security & Privacy

✅ **What we DO:**
- Download public YouTube videos
- Use temporary files (auto-deleted)
- Validate URLs strictly

❌ **What we DON'T:**
- Log user data or IPs
- Store videos permanently
- Support private/DRM content
- Track users

---

## 🧪 Testing

Test with a real YouTube URL:

```bash
curl -X POST http://localhost:5000/api/info \
  -H "Content-Type: application/json" \
  -d '{"url":"https://www.youtube.com/watch?v=dQw4w9WgXcQ"}'
```

Download test:
```bash
curl "http://localhost:5000/api/download?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ&format=mp3" \
  --output test.mp3
```

---

## 🐛 Troubleshooting

### `yt-dlp: command not found`
- Ensure yt-dlp is installed and in PATH
- Run `yt-dlp --version` to verify

### Backend hangs
- Check yt-dlp is working: `yt-dlp --version`
- Ensure URL is valid public YouTube video
- Check firewall/antivirus settings

### CORS errors
- Verify `FRONTEND_URL` in `.env` matches your frontend URL

---

## 📝 Notes

- Temp files are deleted after 1 hour automatically
- Only public YouTube videos are supported
- No database or caching layer needed
- Simple and maintainable by design

---

## 📄 License

MIT License - Use responsibly and respect YouTube's Terms of Service.