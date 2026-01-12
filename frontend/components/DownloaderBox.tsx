"use client";

import { useState } from "react";
import { Link, Download, Copy, Check } from "lucide-react";

interface DownloaderBoxProps {
  onFetch: (url: string) => void;
  loading?: boolean;
  currentUrl?: string;
}

export default function DownloaderBox({ onFetch, loading = false, currentUrl = "" }: DownloaderBoxProps) {
  const [url, setUrl] = useState(currentUrl);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim() && !loading) {
      onFetch(url.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      // Fallback for older browsers
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.focus();
      document.execCommand("paste");
      setUrl(input.value);
      document.body.removeChild(input);
    }
  };

  const copyExample = () => {
    const exampleUrl = "https://youtu.be/DxsDekHDKXo?si=K6fps7q5Cjr-g8Lv";
    navigator.clipboard.writeText(exampleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const popularPlatforms = [
    { name: "YouTube", icon: "▶️", domain: "youtube.com" },
    { name: "Facebook", icon: "📘", domain: "facebook.com" },
    { name: "Instagram", icon: "📷", domain: "instagram.com" },
    { name: "TikTok", icon: "🎵", domain: "tiktok.com" },
    { name: "Twitter", icon: "🐦", domain: "twitter.com" },
  ];

  return (
    <div className="w-full">
      {/* Main Download Box */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-200 p-6 md:p-8 shadow-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-green-100 to-green-50 mb-4">
            <Link className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Paste Video URL
          </h2>
          <p className="text-gray-600">
            Enter video link from YouTube, Facebook, Instagram, TikTok, etc.
          </p>
        </div>

        {/* URL Input Form */}
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                <Link className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                required
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading || !url.trim()}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-lg rounded-2xl hover:shadow-xl hover:shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center min-w-[180px]"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" />
                  Get Video Info
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button
            onClick={handlePaste}
            className="px-5 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center"
          >
            <Copy className="w-4 h-4 mr-2" />
            Paste from Clipboard
          </button>
          
          <button
            onClick={copyExample}
            className="px-5 py-2.5 bg-blue-50 text-blue-700 font-medium rounded-xl hover:bg-blue-100 transition-colors flex items-center"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Copied!
              </>
            ) : (
              "See Example"
            )}
          </button>
        </div>

        </div>

      
    </div>
  );
}