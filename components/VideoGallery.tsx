
import React from 'react';
import { GeneratedVideo } from '../types';

interface VideoGalleryProps {
  videos: GeneratedVideo[];
}

const VideoCard: React.FC<{ video: GeneratedVideo }> = ({ video }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 transform hover:-translate-y-1 transition-transform duration-300">
      <div className="relative">
        {video.imageUrl && (
          <img src={video.imageUrl} alt="Input" className="absolute top-2 right-2 w-16 h-16 rounded-md border-2 border-cyan-500 object-cover" />
        )}
        <video src={video.url} controls loop className="w-full aspect-square object-cover bg-gray-900" />
      </div>
      <div className="p-4">
        <p className="text-gray-300 text-sm truncate">{video.prompt}</p>
      </div>
    </div>
  );
};

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-12 px-6 bg-gray-800 border border-dashed border-gray-600 rounded-lg mt-12">
        <h3 className="text-2xl font-semibold text-white">Your creations will appear here</h3>
        <p className="mt-2 text-gray-400">Use the form above to generate your first AI animation.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 w-full">
      <h2 className="text-3xl font-bold text-white mb-6">Your Animations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
