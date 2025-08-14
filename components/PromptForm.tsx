import React, { useState } from 'react';

interface PromptFormProps {
  onSubmit: (prompt: string, image: File | null) => void;
  isLoading: boolean;
}

const GenerateIcon: React.FC = () => (
  <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v6M12 15v6M5.64 5.64l4.24 4.24M14.12 14.12l4.24 4.24M3 12h6M15 12h6M5.64 18.36l4.24-4.24M14.12 9.88l4.24-4.24" />
  </svg>
);

const UploadIcon: React.FC = () => (
    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="17 8 12 3 7 8" />
        <line x1="12" y1="3" x2="12" y2="15" />
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
      const fileInput = document.getElementById('image-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
  }

  return (
    <form onSubmit={handleSubmit} className="futuristic-card p-6 w-full max-w-3xl space-y-6">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the animation you want to create... e.g., 'A cat wearing a wizard hat casting a spell'"
        className="w-full p-4 bg-black/40 text-text-color rounded-md border border-border-color focus:ring-1 focus:ring-primary-color focus:outline-none focus:border-primary-color transition duration-200 h-28 resize-none placeholder-text-muted-color"
        disabled={isLoading}
      />
      <div className="flex flex-col sm:flex-row items-stretch justify-between gap-4">
        <label htmlFor="image-upload" className="flex-1 cursor-pointer border border-border-color hover:bg-primary-color/10 text-primary-color font-bold py-3 px-4 rounded-md transition duration-200 flex items-center justify-center">
          <UploadIcon />
          {imageFile ? "Change Image" : "Upload Image (Optional)"}
        </label>
        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} disabled={isLoading} />
        
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="flex-1 futuristic-btn bg-primary-color text-bg-color font-bold py-3 px-4 flex items-center justify-center text-lg hover:bg-primary-color/90"
        >
          <GenerateIcon />
          Generate
        </button>
      </div>
      {imagePreview && (
        <div className="mt-4 relative w-40 h-40 mx-auto p-1 border border-border-color" style={{clipPath: 'polygon(0 10px, 10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)'}}>
          <img src={imagePreview} alt="Image preview" className="object-cover w-full h-full" />
           <button type="button" onClick={removeImage} className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full h-7 w-7 flex items-center justify-center text-lg font-bold hover:bg-red-700 border-2 border-bg-color">&times;</button>
        </div>
      )}
    </form>
  );
};

export default PromptForm;
