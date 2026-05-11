import type { Metadata } from 'next'
import ResumeReviewer from './ResumeReviewer'

export const metadata: Metadata = {
  title: "AI Resume Reviewer | QuickAI",

  description:
    "Upload your resume and get instant AI-powered feedback, ATS optimization tips, skill analysis, and resume improvement suggestions.",

  keywords: [
    "AI resume reviewer",
    "resume analyzer",
    "ATS resume checker",
    "AI CV review",
    "resume feedback tool",
    "resume optimization",
    "AI career tool",
    "resume score checker",
    "professional resume review",
    "AI job application assistant"
  ],
};

const page = () => {
  return (
    <div>
        <ResumeReviewer />
    </div>
  )
}

export default page