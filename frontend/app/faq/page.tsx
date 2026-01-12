import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ – Video Downloader | Frequently Asked Questions",
  description:
    "Find answers to common questions about using our video downloader. Learn how to download videos in MP4 or MP3, supported platforms, safety, and legality.",
};

export default function FAQPage() {
  return (
    <main className="bg-white min-h-screen">
  <div className="max-w-5xl mx-auto px-4 py-16 text-gray-800">


      <h1 className="text-4xl font-bold mb-6">
        Frequently Asked Questions (FAQ)
      </h1>

      <p className="mb-10 text-gray-600 leading-7">
        Below you can find answers to the most common questions about our
        video downloader. If you still need help, feel free to contact us.
      </p>

      {/* FAQ ITEM */}
      <section className="space-y-8">

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            What is this video downloader?
          </h2>
          <p className="leading-7 text-gray-700">
            This website is an online video downloader that allows users to
            download publicly available videos in MP4 or MP3 format. You do
            not need to install any software or create an account to use
            this service.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Is this video downloader free to use?
          </h2>
          <p className="leading-7 text-gray-700">
            Yes, our video downloader is completely free. There are no hidden
            charges, subscriptions, or registration requirements.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Which video platforms are supported?
          </h2>
          <p className="leading-7 text-gray-700">
            Currently, we support downloading videos from popular public
            platforms such as YouTube. Support for additional platforms may
            be added in the future.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Can I download videos in HD quality?
          </h2>
          <p className="leading-7 text-gray-700">
            Yes, you can download videos in multiple resolutions including
            360p, 480p, 720p, and in some cases 1080p. Available formats
            depend on the original video quality.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Can I download only the audio (MP3)?
          </h2>
          <p className="leading-7 text-gray-700">
            Yes, you can extract and download audio from videos in MP3 format.
            This option is useful for music, podcasts, and educational content.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Is it legal to download videos from YouTube?
          </h2>
          <p className="leading-7 text-gray-700">
            Downloading videos may be subject to copyright laws in your
            country. This tool is intended for downloading publicly available
            content for personal use only. Users are responsible for ensuring
            they comply with all applicable laws and the terms of service of
            the respective platforms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Do you store downloaded videos on your servers?
          </h2>
          <p className="leading-7 text-gray-700">
            No. We do not store any videos or audio files on our servers.
            All downloads are processed temporarily and streamed directly
            to the user.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Is this website safe to use?
          </h2>
          <p className="leading-7 text-gray-700">
            Yes. Our website does not require any software installation and
            does not contain malware or harmful scripts. Always ensure you
            are using the official website domain.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Why is a specific format not available for some videos?
          </h2>
          <p className="leading-7 text-gray-700">
            Available download formats depend on the original video source.
            Some videos may not provide certain resolutions or audio formats.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Does this downloader work on mobile devices?
          </h2>
          <p className="leading-7 text-gray-700">
            Yes. Our video downloader works on all modern devices including
            Android phones, iPhones, tablets, and desktop computers.
          </p>
        </div>
          



      </section>

      {/* DISCLAIMER */}
      <section className="mt-16 text-sm text-gray-600 leading-7">
        <p>
          <strong>Disclaimer:</strong> This website does not host any
          copyrighted content. All media is provided by third-party platforms.
          Users are responsible for how they use the downloaded content.
        </p>
      </section>

      </div>
</main>

  );
}
