import { prisma } from "@/lib/prisma";
 import { auth } from "@clerk/nextjs/server";
import { checkUserPlan } from "@/lib/checkUserPlan";

//export async function getUserCreationsAction(userId: string) {
  export async function getUserCreationsAction() {

    const { userId } = await auth();
    if (!userId) {
    throw new Error("Unauthorized");
  }

    const creations = await prisma.creations.findMany({
        where: {
            user_id: userId,
        },
        orderBy: {
            created_at: "desc",
        },
    });

   const user = await checkUserPlan();

    return {creations, plan: user.plan};
}

export async function getPublishedCreationsAction() {

    const creations = await prisma.creations.findMany({
        where: {
            publish: true,
        },
        orderBy: {
            created_at: "desc",
        },
    });
    return creations;
}

export async function toggleLikeCreationAction(creationId: string, userId: string) {

    const creation = await prisma.creations.findUnique({
        where: {
            id: creationId,
        },
    });

    if (!creation) {
        throw new Error("Creation not found");
    }

    const currentLikes = creation.likes;
    //const userIdStr = userId.toString();
    let updatedLikes: string[] = [];
    let message = "";

    if (currentLikes.includes(userId)) {

        updatedLikes = currentLikes.filter((user) => user !== userId);
        message = "Creation unliked";

    } else {

        updatedLikes = [...currentLikes, userId];

        message = "Creation liked";
    }

    await prisma.creations.update({
        where: {
            id: creationId,
        },
        data: {
            likes: updatedLikes,
        },
    });

    return {
        success: true,
        message,
    };
}