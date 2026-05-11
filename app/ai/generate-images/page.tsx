import type { Metadata } from 'next'
import ImageGeneration from './ImageGeneration'

export const metadata: Metadata = {
  title: "AI Image Generator | QuickAI",

  description:
    "Generate stunning AI-powered images instantly in anime, realistic, fantasy, cartoon, Ghibli, portrait, and 3D styles.",

  keywords: [
    "AI image generator",
    "AI art generator",
    "anime image generator",
    "Ghibli AI art",
    "AI photo creator",
    "fantasy AI images",
    "text to image AI",
    "AI artwork generator",
    "AI cartoon generator",
    "AI realistic image generator"
  ],
};

const page = () => {
  return (
    <div>
        <ImageGeneration />
    </div>
  )
}

export default page