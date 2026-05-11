import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkUserPlan } from "@/lib/checkUserPlan";
import { resumeReviewAction } from "@/lib/actions/ai";
import { PDFParse } from 'pdf-parse';
import { ratelimit } from "@/lib/redis/rate-limit";

export async function POST(req: Request) {

    try {

        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                { status: 401 }
            );
        }

        const { success } = await ratelimit.limit(userId);

        if (!success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Too many requests. Please try again later.",
                },
                { status: 429 }
            );
        }

        const formData = await req.formData();

        const resume = formData.get("resume") as File;

        if (!resume) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Resume file is required",
                },
                { status: 400 }
            );
        }

        const user = await checkUserPlan();
        const bytes = await resume.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const content =
            await resumeReviewAction({
                userId,
                resumeBuffer: buffer,
                plan: user.plan,
            });

        return NextResponse.json({
            success: true,
            content,
        });

    } catch (error) {

        console.log(error);

        if (error instanceof Error) {

            return NextResponse.json(
                {
                    success: false,
                    message: error.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}