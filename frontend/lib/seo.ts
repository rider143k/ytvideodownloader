// frontend/lib/seo.ts

export const SITE_NAME = "VideoDownloadLink";
export const SITE_URL = "https://videodownloadlink.online";

export const DEFAULT_KEYWORDS = [
  "video downloader",
  "youtube video downloader",
  "online video downloader",
  "free video downloader",
  "mp4 video downloader",
  "mp3 video downloader",
  "youtube mp3 downloader",
  "youtube mp4 downloader",
  "instagram video downloader",
  "insta video download",
  "reels video downloader",
  "shorts video downloader",
  "download youtube videos online",
  "fast video downloader",
  "best video downloader website",
  "no watermark video downloader",
];

export const defaultSEO = {
  title:
    "Video Downloader Online – Download YouTube & Instagram Videos Free",
  description:
    "Free online video downloader to download YouTube, Instagram, and other videos in MP4 or MP3 format. Fast, secure, and mobile friendly.",
  keywords: DEFAULT_KEYWORDS.join(", "),
  canonical: SITE_URL,
  robots: "index, follow",
};

/**
 * Page-specific SEO generator
 */
export function generateSEO({
  title,
  description,
  keywords,
  path = "",
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
}) {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords: (keywords || DEFAULT_KEYWORDS).join(", "),
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/**
 * SEO presets for important pages
 */
export const SEO_PRESETS = {
  home: generateSEO({
    title: "Video Downloader Online – MP4 & MP3 Free",
    description:
      "Download videos online using the best free video downloader. Supports YouTube, Instagram, MP4 and MP3 formats without software.",
    path: "/",
  }),

  yt: generateSEO({
    title: "YouTube Video Downloader – Download MP4 & MP3",
    description:
      "Free YouTube video downloader to download videos in MP4 or MP3 format. Fast, secure, and works on mobile and desktop.",
    keywords: [
      "youtube video downloader",
      "download youtube videos",
      "youtube mp3 downloader",
      "youtube mp4 downloader",
      "yt downloader online",
    ],
    path: "/yt",
  }),

  instagram: generateSEO({
    title: "Instagram Video Downloader – Download Reels & Videos",
    description:
      "Download Instagram videos and reels online for free. Fast Instagram video downloader without watermark.",
    keywords: [
      "instagram video downloader",
      "insta video download",
      "reels downloader",
      "download instagram reels",
    ],
    path: "/instagram",
  }),

  faq: generateSEO({
    title: "FAQ – Video Downloader",
    description:
      "Frequently asked questions about our video downloader, supported formats, safety, and legality.",
    path: "/faq",
  }),

  privacy: generateSEO({
    title: "Privacy Policy – Video Downloader",
    description:
      "Read our privacy policy to understand how we protect user data and privacy while using our video downloader.",
    path: "/privacy-policy",
  }),

  terms: generateSEO({
    title: "Terms of Service – Video Downloader",
    description:
      "Terms and conditions for using our online video downloader service.",
    path: "/terms",
  }),

  contact: generateSEO({
    title: "Contact Us – Video Downloader",
    description:
      "Contact us for support, feedback, or inquiries related to our video downloader.",
    path: "/contact",
  }),
};
