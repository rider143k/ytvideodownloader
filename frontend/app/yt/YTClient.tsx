"use client";

import { useState } from "react";
import DownloaderBox from "@/components/DownloaderBox";
import VideoInfo from "@/components/VideoInfo";
import FormatList from "@/components/FormatList";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Platforms from "@/components/Platforms";

type VideoFormat = {
  id: string;
  label: string;
  quality: string;
  sizeMB: string;
  format_id?: string | null;
};

type VideoData = {
  title: string;
  thumbnail: string;
  duration: number;
  formats: VideoFormat[];
};

export default function YTClient() {
  const [video, setVideo] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);

  // API base URL
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

  const fetchInfo = async (url: string) => {
    if (!url.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    setCurrentUrl(url);
    setLoading(true);
    setError("");
    setVideo(null);

    try {
      const res = await fetch(`${API_BASE}/api/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch video info");
      }

      const data: VideoData = await res.json();
      setVideo(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(
        err instanceof Error 
          ? err.message 
          : "Unable to fetch video details. Please check the link."
      );
    } finally {
      setLoading(false);
    }
  };

  const download = (formatId: string) => {
    if (!currentUrl || !video) {
      setError("No video available for download");
      return;
    }

    setDownloadingFormat(formatId);

    // Build download URL
    const params = new URLSearchParams({
      url: currentUrl,
      format: formatId,
      quality: video.formats.find(f => f.id === formatId)?.quality || '',
      title: video.title
    });

    const downloadUrl = `${API_BASE}/api/download?${params}`;
    
    // Create hidden link and trigger download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = ''; // Let server set filename
    link.style.display = 'none';
    document.body.appendChild(link);
    
    // Trigger click
    link.click();
    
    // Cleanup and reset button
    setTimeout(() => {
      document.body.removeChild(link);
      setDownloadingFormat(null);
    }, 2000);
  };

  return (
    <>
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-10 border">
      <DownloaderBox onFetch={fetchInfo} />

      {/* 🔄 LOADING ANIMATION */}
      {loading && (
        <div className="flex flex-col items-center py-16">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200" />
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          </div>
          <p className="text-gray-600 text-sm font-medium">
            Fetching video details...
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Finding all available qualities
          </p>
        </div>
      )}

      {/* ❌ ERROR MESSAGE */}
      {error && (
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-red-800 text-sm font-medium">Error</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ VIDEO INFO & FORMATS */}
      {video && !loading && (
        <>
          <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8">
            <VideoInfo
              title={video.title}
              thumbnail={video.thumbnail}
              duration={video.duration}
            />

            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                Choose Quality & Format
              </h3>
              
              <div className="space-y-3">
                {video.formats.map((format) => (
                  <div
                    key={format.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-800">
                          {format.label}
                        </span>
                        {format.quality !== 'audio' && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                            {format.quality}p
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Size: {format.sizeMB} MB
                      </p>
                    </div>

                    <button
                      onClick={() => download(format.id)}
                      disabled={downloadingFormat === format.id}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        downloadingFormat === format.id
                          ? 'bg-green-500 text-white cursor-wait'
                          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
                      }`}
                    >
                      {downloadingFormat === format.id ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Downloading...
                        </span>
                      ) : (
                        <>
                          <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Download tip */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs text-gray-600">
                  💡 <strong>Tip:</strong> Higher quality = larger file size. Choose based on your needs.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* SEO CONTENT */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">
            YouTube Video Downloader - Multiple Qualities
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Download YouTube videos in multiple qualities: 360p, 480p, 720p, and 1080p. 
            Choose the perfect balance between quality and file size. Also supports MP3 audio 
            extraction. Fast, free, and works on all devices without installing software.
          </p>
        </div>
      </section>

      <Features />
      <Platforms />
      <FAQ />
      </div>
    </>
  );
}