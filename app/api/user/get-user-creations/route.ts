import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getUserCreationsAction } from "@/lib/actions/user";
import { checkUserPlan } from "@/lib/checkUserPlan";
import { redis } from "@/lib/redis/redis";

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

        const cacheKey = `dashboard:${userId}`;
        const cachedData = await redis.get(cacheKey);

        if (cachedData) {
            return NextResponse.json({
                success: true,
                ...cachedData,
                cached: true,
            });
        }

        const user = await checkUserPlan();

        const { creations, plan } = await getUserCreationsAction();

        const responseData = { creations, plan: user.plan };
        await redis.set( cacheKey, responseData, { ex: 60 * 5 });

        return NextResponse.json({
            success: true,
            ...responseData,
            cached: false,
            // creations,
            // plan: user.plan,
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