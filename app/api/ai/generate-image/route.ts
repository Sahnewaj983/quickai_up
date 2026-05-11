import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkUserPlan } from "@/lib/checkUserPlan";
import { generateImageAction } from "@/lib/actions/ai";

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