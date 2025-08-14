
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = (error) => reject(error);
    });
};

export const generateAnimation = async (
    prompt: string,
    image: File | null,
    onProgress: (message: string) => void
): Promise<string> => {
    onProgress("Initializing AI animator...");

    const imagePart = image ? {
        imageBytes: await fileToBase64(image),
        mimeType: image.type,
    } : undefined;

    let operation = await ai.models.generateVideos({
        model: 'veo-2.0-generate-001',
        prompt: prompt,
        image: imagePart,
        config: {
            numberOfVideos: 1
        }
    });

    onProgress("AI is sketching the first frames...");

    let pollCount = 0;
    const progressMessages = [
        "Rendering the animation...",
        "Adding motion and details...",
        "Compositing the scenes...",
        "Applying special effects...",
        "Finalizing the video, almost there!",
    ];

    while (!operation.done) {
        onProgress(progressMessages[pollCount % progressMessages.length]);
        await new Promise(resolve => setTimeout(resolve, 10000));
        try {
            operation = await ai.operations.getVideosOperation({ operation: operation });
        } catch (error) {
            console.error("Polling failed:", error);
            throw new Error("Failed to get video generation status.");
        }
        pollCount++;
    }

    onProgress("Fetching your animation...");

    const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
    if (!videoUri) {
        throw new Error("Video generation succeeded, but no video URI was found.");
    }

    const videoResponse = await fetch(`${videoUri}&key=${process.env.API_KEY}`);
    if (!videoResponse.ok) {
        throw new Error(`Failed to download the generated video. Status: ${videoResponse.status}`);
    }
    const videoBlob = await videoResponse.blob();
    return URL.createObjectURL(videoBlob);
};
