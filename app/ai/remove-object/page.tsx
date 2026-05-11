import type { Metadata } from 'next'
import ObjectRemover from './ObjectRemover'

export const metadata: Metadata = {
  title: "AI Object Remover | QuickAI",

  description:
    "Remove unwanted objects from images instantly using AI. Upload your image, select an object, and clean your photos in seconds.",

  keywords: [
    "AI object remover",
    "remove object from image",
    "AI photo editor",
    "erase objects from photos",
    "AI image cleanup",
    "remove unwanted objects",
    "photo retouch AI",
    "AI image editing tool",
    "remove items from picture",
    "AI inpainting tool"
  ],
};

const page = () => {
  return (
    <div>
        <ObjectRemover />
    </div>
  )
}

export default page