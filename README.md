# QuickAI 🚀

An AI-powered SaaS platform built with Next.js that helps users generate articles, blog titles, images, resume reviews, and perform AI-based image editing like background removal and object removal.

---

# ✨ Features

- 🔐 Authentication with Clerk
- 🤖 AI article generation
- 📝 AI blog title generator
- 🎨 AI image generation
- 🪄 Background removal
- ✂️ Object removal from images
- 📄 AI resume review
- ❤️ Community image sharing & likes
- 💳 Premium subscription support
- ☁️ Cloud image storage with Cloudinary
- 🗄️ Database with Prisma + PostgreSQL
- ⚡ Modern UI with Tailwind CSS
- 🔥 Built using Next.js App Router

---

# 🛠️ Tech Stack

## Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide Icons
- React Markdown
- React Hot Toast

## Backend
- Next.js Route Handlers
- Server Actions
- Prisma ORM
- PostgreSQL / Neon DB

## AI & Media Services
- OpenAI
- ClipDrop
- Cloudinary

## Authentication
- Clerk

---

# 📂 Project Structure

```bash
app/
 ├── ai/
 ├── api/
 ├── dashboard/
 └── layout.tsx

components/
lib/
 ├── actions/
 ├── prisma.ts
 ├── cloudinary.ts
 └── checkUserPlan.ts

prisma/
public/
```

---

# ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
# Database
DATABASE_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# OpenAI
OPENAI_API_KEY=

# ClipDrop
CLIPDROP_API_KEY=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone <your-repository-url>
cd quickai
```

## 2. Install dependencies

```bash
npm install
```

## 3. Generate Prisma Client

```bash
npx prisma generate
```

## 4. Run database migrations

```bash
npx prisma migrate dev
```

## 5. Start development server

```bash
npm run dev
```

App will run on:

```bash
http://localhost:3000
```

---

# 📸 Features Overview

## AI Article Generator
Generate long-form AI articles based on topic and length.

## Blog Title Generator
Generate SEO-friendly blog title ideas instantly.

## AI Image Generator
Generate AI images using text prompts and styles.

## Background Removal
Upload images and remove backgrounds automatically.

## Object Removal
Remove unwanted objects from images.

## Resume Review
Upload PDF resumes and receive AI feedback.

## Community Feed
Users can:
- Publish generated images
- Like creations
- Explore community posts

---

# 🧠 Learning Highlights

This project demonstrates:

- Next.js App Router
- Server Components vs Client Components
- Server Actions
- Route Handlers
- File uploads in Next.js
- Prisma ORM integration
- Authentication with Clerk
- AI API integrations
- Image processing workflows
- SaaS architecture basics

---

# 📦 Deployment

Recommended platforms:

- Vercel for frontend/backend
- Neon for PostgreSQL database
- Cloudinary for media storage

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

Built by Sahnewaj using Next.js, AI APIs, and modern SaaS architecture.