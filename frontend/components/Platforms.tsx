"use client";

import Image from "next/image";

export default function Platforms() {
  const platforms = [
    {
      name: "YouTube",
      icon: "/images/yt.png",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      features: ["MP4 up to 4K", "MP3 Audio", "Subtitles", "Playlists"]
    },
    {
      name: "Facebook",
      icon: "/images/facebook.png",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      features: ["HD Videos", "Reels", "Stories", "Live Videos"]
    },
    {
      name: "Instagram",
      icon: "/images/instagram.png",
      color: "from-pink-500 to-purple-600",
      bgColor: "bg-pink-50",
      features: ["Reels", "Stories", "IGTV", "Posts"]
    },
    {
      name: "TikTok",
      icon: "/images/tiktok.png",
      color: "from-gray-900 to-black",
      bgColor: "bg-gray-50",
      features: ["Short Videos", "No Watermark", "HD Quality", "With Sound"]
    },
    {
      name: "Pinterest",
      icon: "/images/pinterest.png",
      color: "from-red-600 to-red-700",
      bgColor: "bg-red-50",
      
    }
  ];

  const otherPlatforms = [
    "Twitter/X", "Vimeo", "Dailymotion", "LinkedIn", "Twitch",
    "Likee", "Snapchat", "Reddit", "Tumblr", "9GAG",
    "Bilibili", "OK.ru", "VK", "Metacafe", "Veoh"
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-medium mb-4">
            Supported Platforms
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Download From More Supported Websites
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We support all major social media and video platforms
          </p>
        </div>

        {/* Main Platforms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8 mb-12">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl border-2 border-gray-200 p-6 hover:shadow-2xl hover:border-transparent transition-all duration-300 hover:-translate-y-2"
            >
              {/* Platform Icon */}
              <div className="flex items-center justify-center mb-6">
                <div className={`w-20 h-20 ${platform.bgColor} rounded-2xl flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="relative w-12 h-12">
                    <Image
                      src={platform.icon}
                      alt={platform.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Platform Name */}
              <h3 className={`text-center text-xl font-bold mb-4 bg-gradient-to-r ${platform.color} bg-clip-text text-transparent`}>
                {platform.name}
              </h3>

              

            </div>
          ))}
        </div>

          
        </div>

        {/* How It Works */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              How To Download From Any Site
            </h3>
            <div className="space-y-6">
              {[
                {
                  step: "1",
                  title: "Copy Video URL",
                  desc: "Go to your favorite platform and copy the video link"
                },
                {
                  step: "2",
                  title: "Paste & Analyze",
                  desc: "Paste the link here and our system will analyze it"
                },
                {
                  step: "3",
                  title: "Choose Format",
                  desc: "Select your preferred video quality and format"
                },
                {
                  step: "4",
                  title: "Download & Enjoy",
                  desc: "Click download and save the video to your device"
                }
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center">
                    <span className="text-green-700 font-bold text-lg">{item.step}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image/Preview */}
          <div className="relative">
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
              {/* Mock Browser Window */}
              <div className="bg-gray-100 px-4 py-3 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 mx-4 bg-white rounded-lg px-4 py-2 text-sm text-gray-500">
                  videodownloadlink.com
                </div>
              </div>

              {/* Video Download Preview */}
              <div className="p-6 md:p-8">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Paste Video URL
                  </h3>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="https://youtube.com/watch?v=..."
                      className="flex-1 px-4 py-3 border-2 border-r-0 border-gray-300 rounded-l-xl focus:outline-none focus:border-green-500"
                      disabled
                    />
                    <button className="px-6 bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold rounded-r-xl">
                      Download
                    </button>
                  </div>
                </div>

                {/* Format Options */}
                <div className="grid grid-cols-2 gap-3">
                  {["MP4 1080p", "MP4 720p", "MP4 360p", "MP3 Audio"].map((format, idx) => (
                    <div
                      key={idx}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">{format}</span>
                        <span className="text-sm text-gray-500">Free</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white font-bold text-lg">HD</span>
            </div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
              <span className="text-white font-bold">MP3</span>
            </div>
          </div>
        </div>
    
 

      
    </section>
  );
}