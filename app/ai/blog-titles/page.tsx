import BlogTitleGenerator from './BlogTitleGenerator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "AI Blog Title Generator | QuickAI",
  description:
    "Generate catchy AI-powered blog titles instantly for technology, business, health, travel and more.",
  keywords: [
    "AI blog title generator",
    "blog title ideas",
    "AI content tool",
    "SEO blog titles",
    "title generator"
  ],
};

const page = () => {
  return (
    <div>
      <BlogTitleGenerator />
    </div>
  )
}

export default page