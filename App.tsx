import React, { useState, useCallback } from 'react';
import PromptForm from './components/PromptForm';
import VideoGallery from './components/VideoGallery';
import Loader from './components/Loader';
import { generateAnimation } from './services/geminiService';
import { GeneratedVideo } from './types';

const App: React.FC = () => {
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (prompt: string, image: File | null) => {
    setIsLoading(true);
    setLoadingMessage('Waking up the AI artists...');
    setError(null);

    try {
      const onProgress = (message: string) => {
        setLoadingMessage(message);
      };

      const videoUrl = await generateAnimation(prompt, image, onProgress);
      
      const newVideo: GeneratedVideo = {
        id: new Date().toISOString(),
        url: videoUrl,
        prompt: prompt,
        imageUrl: image ? URL.createObjectURL(image) : undefined
      };

      setGeneratedVideos(prev => [newVideo, ...prev]);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen font-sans">
      {isLoading && <Loader message={loadingMessage} />}
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 pt-8">
          <h1 className="text-6xl font-bold tracking-tighter text-glow">
            xg4 animate
          </h1>
          <p className="mt-4 text-lg text-text-muted-color max-w-3xl mx-auto">
            Bring your ideas to life. Describe a scene, and let our AI create an animation for you.
          </p>
        </header>

        <main className="flex flex-col items-center w-full">
          <PromptForm onSubmit={handleGenerate} isLoading={isLoading} />
          {error && (
            <div className="mt-8 futuristic-card bg-red-900/50 border-error-color text-red-200 px-6 py-4 w-full max-w-3xl" role="alert">
              <strong className="font-bold text-red-100">ERROR: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <VideoGallery videos={generatedVideos} />
        </main>
      </div>
    </div>
  );
};

export default App;
