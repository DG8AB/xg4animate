
import React, { useState } from 'react';

interface PromptFormProps {
  onSubmit: (prompt: string, image: File | null) => void;
  isLoading: boolean;
}

const WandIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path d="M17.293 2.293a1 1 0 011.414 0l.001.001a1 1 0 010 1.414l-11 11a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L6 12.586l10.293-10.293a1 1 0 011.414-.001z" clipRule="evenodd" />
    <path fillRule="evenodd" d="M11.172 6.172a.5.5 0 01.707 0l2.5 2.5a.5.5 0 010 .707l-2.5 2.5a.5.5 0 01-.707-.707L12.664 9.5H2.5a.5.5 0 010-1h10.164l-1.192-1.192a.5.5 0 010-.707z" clipRule="evenodd" />
    <path d="M16 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" />
  </svg>
);

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);


const PromptForm: React.FC<PromptFormProps> = ({ onSubmit, isLoading }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt, imageFile);
    }
  };
  
  const removeImage = () => {
      setImageFile(null);
      setImagePreview(null);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-3xl space-y-4 border border-gray-700">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the animation you want to create... e.g., 'A cat wearing a wizard hat casting a spell'"
        className="w-full p-4 bg-gray-900 text-white rounded-md focus:ring-2 focus:ring-cyan-500 focus:outline-none transition duration-200 h-28 resize-none"
        disabled={isLoading}
      />
      <div className="flex items-center justify-between gap-4">
        <label htmlFor="image-upload" className="flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center">
          <UploadIcon />
          {imageFile ? "Change Image" : "Upload Image (Optional)"}
        </label>
        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isLoading} />
        
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="flex-1 bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
        >
          <WandIcon />
          Generate Animation
        </button>
      </div>
      {imagePreview && (
        <div className="mt-4 relative w-40 h-40 mx-auto">
          <img src={imagePreview} alt="Image preview" className="rounded-lg object-cover w-full h-full" />
           <button onClick={removeImage} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-7 w-7 flex items-center justify-center text-lg font-bold hover:bg-red-700">&times;</button>
        </div>
      )}
    </form>
  );
};

export default PromptForm;
