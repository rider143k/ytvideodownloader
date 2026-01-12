"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                VideoDownload<span className="text-green-600">Link</span>
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Free Video Downloader
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
              Home
            </Link>
            <Link href="/yt" className="text-gray-700 hover:text-green-600 font-medium">
              YouTube Downloader
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-green-600 font-medium">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 font-medium">
              Contact
            </Link>
            <Link 
              href="/yt"
              className="ml-4 px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:shadow-md transition-shadow"
            >
              Download Now
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link 
                href="/" 
                onClick={() => setMenuOpen(false)}
                className="py-2 text-gray-700 hover:text-green-600"
              >
                Home
              </Link>
              <Link 
                href="/yt" 
                onClick={() => setMenuOpen(false)}
                className="py-2 text-gray-700 hover:text-green-600"
              >
                YouTube Downloader
              </Link>
              <Link 
                href="/faq" 
                onClick={() => setMenuOpen(false)}
                className="py-2 text-gray-700 hover:text-green-600"
              >
                FAQ
              </Link>
              <Link 
                href="/contact" 
                onClick={() => setMenuOpen(false)}
                className="py-2 text-gray-700 hover:text-green-600"
              >
                Contact
              </Link>
              <Link 
                href="/yt" 
                onClick={() => setMenuOpen(false)}
                className="mt-2 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg text-center"
              >
                Start Downloading
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}