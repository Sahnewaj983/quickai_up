import { NextResponse } from "next/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { generateArticleAction } from "@/lib/actions/ai";
import { checkUserPlan } from "@/lib/checkUserPlan";
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

        const body = await req.json();

        const { prompt } = body;

        const user = await checkUserPlan();

        const content =
            await generateArticleAction({
                userId,
                prompt,
                plan: user.plan,
                free_usage: user.free_usage,
            });

        if (user.plan !== "premium") {

            const client = await clerkClient();

            await client.users.updateUserMetadata(
                userId,
                {
                    privateMetadata: {
                        free_usage:
                            user.free_usage + 1,
                    },
                }
            );
        }

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