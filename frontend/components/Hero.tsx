import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Free Online Video Downloader
        </h1>
        <p className="opacity-90 mb-8">
          Download videos in MP4 or MP3 format instantly
        </p>

        <Link
          href="/yt"
          className="bg-green-500 hover:bg-green-600 px-8 py-4 rounded font-semibold"
        >
          Start Downloading
        </Link>
      </div>
    </section>
  );
}
