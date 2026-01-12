"use client";

import { Download } from "lucide-react";

interface Format {
  id: string;
  label: string;
  sizeMB: string;
  quality: string;
  type: string;
  formatId: string;
}

interface FormatListProps {
  formats: Format[];
  onDownload: (formatId: string) => void;
  downloading?: string | null;
}

export default function FormatList({ formats, onDownload, downloading }: FormatListProps) {
  return (
    <div className="bg-white rounded-xl border shadow-sm p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Available Formats
      </h3>

      {formats.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No formats available</p>
      ) : (
        <div className="space-y-3">
          {formats.map((format) => (
            <div
              key={format.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:border-green-400 transition-colors"
            >
              <div>
                <div className="font-medium text-gray-900">{format.label}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {format.quality} • {format.sizeMB}
                </div>
              </div>
              
              <button
                onClick={() => onDownload(format.formatId)}
                disabled={downloading === format.formatId}
                className={`px-4 py-2 rounded-lg font-medium flex items-center ${
                  downloading === format.formatId
                    ? "bg-gray-100 text-gray-700"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {downloading === format.formatId ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">
          💡 <span className="font-medium">Tip:</span> Choose lower quality for faster downloads
        </p>
      </div>
    </div>
  );
}