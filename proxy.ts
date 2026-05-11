import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/api/:path*",
  "/dashboard/:path*",
]);

export default clerkMiddleware(async (auth, req) => {

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/api/:path*",
  ],
};