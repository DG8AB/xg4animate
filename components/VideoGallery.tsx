import React from 'react';
import { GeneratedVideo } from '../types';

interface VideoGalleryProps {
  videos: GeneratedVideo[];
}

const VideoCard: React.FC<{ video: GeneratedVideo }> = ({ video }) => {
  return (
    <div className="futuristic-card group">
      <div className="relative" style={{clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'}}>
        {video.imageUrl && (
          <img src={video.imageUrl} alt="Input" className="absolute top-2 right-2 w-16 h-16 rounded-md border-2 border-primary-color object-cover z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        <video src={video.url} controls loop className="w-full aspect-square object-cover bg-black" />
      </div>
      <div className="p-4">
        <p className="text-text-muted-color font-mono text-sm truncate">{video.prompt}</p>
      </div>
    </div>
  );
};

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
  if (videos.length === 0) {
    return (
      <div className="text-center py-16 px-6 futuristic-card mt-12 border-dashed border-border-color">
        <h3 className="text-3xl font-bold text-primary-color">Creations Await</h3>
        <p className="mt-2 text-text-muted-color">Your generated animations will appear in this space.</p>
      </div>
    );
  }

  return (
    <div className="mt-12 w-full">
      <h2 className="text-4xl font-bold text-white mb-8 text-glow">Your Animations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default VideoGallery;
