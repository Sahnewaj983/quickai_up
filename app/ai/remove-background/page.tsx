import type { Metadata } from 'next'
import BackgroundRemover from './BackgroundRemover'

export const metadata: Metadata = {
  title: "AI Background Remover | QuickAI",

  description:
    "Remove image backgrounds instantly using AI. Upload JPG or PNG images and get transparent background images in seconds.",

  keywords: [
    "AI background remover",
    "remove image background",
    "background remover online",
    "transparent background maker",
    "AI photo editor",
    "remove background from image",
    "free background remover",
    "AI image editing tool",
    "PNG background remover",
    "photo background eraser"
  ],
};

const page = () => {
  return (
    <div>
        <BackgroundRemover />
    </div>
  )
}

export default page