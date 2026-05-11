import { auth, clerkClient } from "@clerk/nextjs/server";

export async function checkUserPlan() {

  const { userId, has } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const hasPremiumPlan = has({ plan: "premium" });

  const client = await clerkClient();

  const user = await client.users.getUser(userId);

  const freeUsage =
    (user.privateMetadata?.free_usage as number) || 0;

  if (!hasPremiumPlan && freeUsage > 0) {

    return {
      userId,
      plan: "free",
      free_usage: freeUsage,
    };

  } else {

    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
        free_usage: 0,
      },
    });

    return {
      userId,
      plan: hasPremiumPlan ? "premium" : "free",
      free_usage: 0,
    };
  }
}