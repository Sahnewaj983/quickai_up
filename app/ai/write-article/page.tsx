import type { Metadata } from 'next'
import WriteArticleGenerator from './WriteArticleGenerator'

export const metadata: Metadata = {
  title: "AI Article Generator | QuickAI",

  description:
    "Generate high-quality AI-powered articles instantly. Create SEO-friendly blog posts, long-form content, and engaging articles in seconds.",

  keywords: [
    "AI article generator",
    "AI blog writer",
    "AI content writer",
    "SEO article generator",
    "AI copywriting tool",
    "AI blog post generator",
    "long-form AI writer",
    "AI content creation",
    "automatic article writer",
    "AI writing assistant"
  ],
};

const page = () => {
  return (
    <div>
        <WriteArticleGenerator />
    </div>
  )
}

export default page