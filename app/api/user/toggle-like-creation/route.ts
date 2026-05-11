import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { toggleLikeCreationAction } from "@/lib/actions/user";

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
        const { id } = body;

        const result = await toggleLikeCreationAction(id, userId);

        return NextResponse.json(result);

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