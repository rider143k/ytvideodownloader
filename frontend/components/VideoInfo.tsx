"use client";

interface VideoInfoProps {
  title: string;
  thumbnail: string;
  duration: number;
  uploader: string;
}

export default function VideoInfo({ title, thumbnail, duration, uploader }: VideoInfoProps) {
  
  const formatDuration = (seconds: number): string => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      {/* Thumbnail */}
      <div className="relative">
        <div className="aspect-video w-full bg-gray-200">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg";
              }}
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center">
              <span className="text-4xl">🎬</span>
            </div>
          )}
        </div>
        
        {duration > 0 && (
          <div className="absolute bottom-3 right-3 bg-black/80 text-white px-2 py-1 rounded text-sm">
            {formatDuration(duration)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title || "Video Title"}
        </h2>

        <div className="flex items-center justify-between text-gray-600 mb-4">
          <div className="flex items-center">
            <span className="mr-2">👤</span>
            <span>{uploader || "Unknown"}</span>
          </div>
          {duration > 0 && (
            <div className="flex items-center">
              <span className="mr-2">⏱️</span>
              <span>{formatDuration(duration)}</span>
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
}