import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserCreationsAction } from "@/lib/actions/user";
import { checkUserPlan } from "@/lib/checkUserPlan";

export async function GET() {

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

        const user = await checkUserPlan();

        const {creations, plan} = await getUserCreationsAction();

        return NextResponse.json({
            success: true,
            creations,
            plan: user.plan,
        });

    } catch (error) {

        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}