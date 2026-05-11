import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { checkUserPlan } from "@/lib/checkUserPlan";
import { removeImageBackgroundAction } from "@/lib/actions/ai";

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

        const formData = await req.formData();

        const image = formData.get("image") as File;

        if (!image) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Image file is required",
                },
                { status: 400 }
            );
        }

        const user = await checkUserPlan();
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const imageUrl = await removeImageBackgroundAction({
            userId,
            imageBuffer: buffer,
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