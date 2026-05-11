import OpenAI from "openai";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";
//import { PDFParse } from 'pdf-parse';
import pdf from "pdf-parse-fixed";
import connectCloudinary from "../cloudinary";

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

interface GenerateArticleProps {
    userId: string;
    prompt: string;
    plan: string;
    free_usage: number;
}

export async function generateArticleAction({ userId, prompt, plan, free_usage }: GenerateArticleProps) {

    if (plan !== "premium" && free_usage >= 10) {
        throw new Error(
            "Limit reached. Upgrade to continue."
        );
    }

    const response = await AI.chat.completions.create({
        model: "gemini-3-flash-preview",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.6,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
        throw new Error("Failed to generate article");
    }

    await prisma.creations.create({
        data: {
            user_id: userId,
            prompt,
            content,
            type: "article",
        },
    });

    return content;
}


interface GenerateBlogTitleProps {
    userId: string;
    prompt: string;
    plan: string;
    free_usage: number;
}

export async function generateBlogTitleAction({ userId, prompt, plan, free_usage, }: GenerateBlogTitleProps) {

    if (plan !== "premium" && free_usage >= 10) {
        throw new Error(
            "Limit reached. Upgrade to continue."
        );
    }

    const response = await AI.chat.completions.create({
        model: "gemini-3-flash-preview",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    const content =
        response.choices[0]?.message?.content;

    if (!content) {
        throw new Error("Failed to generate blog title");
    }

    await prisma.creations.create({
        data: {
            user_id: userId,
            prompt,
            content,
            type: "blog-title",
        },
    });

    return content;
}


interface GenerateImageProps {
    userId: string;
    prompt: string;
    publish?: boolean;
    plan: string;
}

export async function generateImageAction({ userId, prompt, publish, plan }: GenerateImageProps) {

    await connectCloudinary()

    if (plan !== "premium") {
        throw new Error(
            "This feature is only available for premium subscription"
        );
    }

    const formData = new FormData();

    formData.append("prompt", prompt);

    const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData,
        {
            headers: {
                "x-api-key":
                    process.env.CLIPDROP_API_KEY,
            },
            responseType: "arraybuffer",
        }
    );

    const base64Image =
        `data:image/png;base64,${Buffer.from(
            data,
            "binary"
        ).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    await prisma.creations.create({
        data: {
            user_id: userId,
            prompt,
            content: secure_url,
            type: "image",
            publish: publish ?? false,
        },
    });

    return secure_url;
}


interface RemoveImageBackgroundProps {
    userId: string;
    imageBuffer: Buffer;
    plan: string;
}

export async function removeImageBackgroundAction({ userId, imageBuffer, plan }: RemoveImageBackgroundProps) {

    await connectCloudinary()

    if (plan !== "premium") {
        throw new Error(
            "This feature is only available for premium subscription"
        );
    }

    const base64Image =
        `data:image/png;base64,${imageBuffer.toString(
            "base64"
        )}`;

    const { secure_url } =
        await cloudinary.uploader.upload(
            base64Image,
            {
                transformation: [
                    {
                        effect: "background_removal",
                        background_removal:
                            "remove_the_background",
                    },
                ],
            }
        );

    await prisma.creations.create({
        data: {
            user_id: userId,
            prompt: "Remove background from image",
            content: secure_url,
            type: "image",
        },
    });

    return secure_url;
}


interface RemoveImageObjectProps {
    userId: string;
    object: string;
    imageBuffer: Buffer;
    plan: string;
}

export async function removeImageObjectAction({ userId, object, imageBuffer, plan }: RemoveImageObjectProps) {

    await connectCloudinary()

    if (plan !== "premium") {
        throw new Error(
            "This feature is only available for premium subscription"
        );
    }

    const base64Image = `data:image/png;base64,${imageBuffer.toString("base64")}`;

    const { public_id } = await cloudinary.uploader.upload(base64Image);

    const imageUrl = cloudinary.url(
        public_id,
        {
            transformation: [
                {
                    effect: `gen_remove:${object}`,
                },
            ],
            resource_type: "image",
        }
    );

    await prisma.creations.create({
        data: {
            user_id: userId,
            prompt: `Removed ${object} from image`,
            content: imageUrl,
            type: "image",
        },
    });

    return imageUrl;
}





interface ResumeReviewProps {
    userId: string;
    resumeBuffer: Buffer;
    plan: string;
}

// export async function resumeReviewAction({ userId, resumeBuffer, plan }: ResumeReviewProps) {

//     if (plan !== "premium") {
//         throw new Error(
//             "This feature is only available for premium subscription"
//         );
//     }

//     // 5MB validation
//     if (resumeBuffer.length > 5 * 1024 * 1024) {
//         throw new Error(
//             "Resume file size exceeds allowed size (5MB)."
//         );
//     }

//     const parser = new PDFParse({ data: resumeBuffer });
//     const pdfData = await parser.getText();
//     await parser.destroy();

//     const prompt = `Review the following resume and provide constructive feedback on:
//                     - strengths
//                     - weaknesses
//                     - improvements

//                     Resume Content: ${pdfData.text}`;

//     const response =
//         await AI.chat.completions.create({
//             model: "gemini-3-flash-preview",
//             messages: [
//                 {
//                     role: "user",
//                     content: prompt,
//                 },
//             ],
//         });

//     const content =
//         response.choices[0]?.message?.content;

//     if (!content) {
//         throw new Error("AI response failed");
//     }

//     await prisma.creations.create({
//         data: {
//             user_id: userId,
//             prompt: "Review the uploaded resume",
//             content,
//             type: "resume-review",
//         },
//     });

//     return content;
// }



export async function resumeReviewAction({ userId, resumeBuffer, plan }: ResumeReviewProps) {

  if (plan !== "premium") {
    throw new Error(
      "This feature is only available for premium subscription"
    );
  }

  // 5MB validation
  if (resumeBuffer.length > 5 * 1024 * 1024) {
    throw new Error(
      "Resume file size exceeds allowed size (5MB)."
    );
  }

  // Parse PDF
  const pdfData = await pdf(resumeBuffer);

  const prompt = `Review the following resume and provide constructive feedback on:
                    - strengths
                    - weaknesses
                    - improvements

                    Resume Content:
                    ${pdfData.text}`;

  const response =
    await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

  const content = response.choices[0]?.message?.content;

  if (!content) {
    throw new Error("AI response failed");
  }

  await prisma.creations.create({
    data: {
      user_id: userId,
      prompt: "Review the uploaded resume",
      content,
      type: "resume-review",
    },
  });

  return content;
}

