import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkUserPlan } from "@/lib/checkUserPlan";
import { generateImageAction } from "@/lib/actions/ai";
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

        const { prompt, publish } = body;

        const user = await checkUserPlan();

        const imageUrl =
            await generateImageAction({
                userId,
                prompt,
                publish,
                plan: user.plan,
            });

        return NextResponse.json({
            success: true,
            content: imageUrl,
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