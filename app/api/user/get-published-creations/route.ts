import { NextResponse } from "next/server";
import { getPublishedCreationsAction } from "@/lib/actions/user";
import { auth } from "@clerk/nextjs/server";

export async function GET() {

  try {

    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const creations = await getPublishedCreationsAction();

    return NextResponse.json({
      success: true,
      creations,
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