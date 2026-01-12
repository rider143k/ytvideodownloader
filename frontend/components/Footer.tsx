"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-3">
              VideoDownload<span className="text-green-400">Link</span>
            </h3>
            <p className="text-sm">
              Free video downloader for YouTube and other platforms. 
              Simple, fast, and secure.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-3">Tools</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/yt" className="text-sm hover:text-white hover:underline">
                  YouTube Downloader
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm hover:text-white hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-white hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="text-sm hover:text-white hover:underline">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-3">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm hover:text-white hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-white hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              © {new Date().getFullYear()} VideoDownloadLink — All rights reserved
            </div>
            <div className="text-gray-500 text-xs">
              Made for educational purposes only
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}