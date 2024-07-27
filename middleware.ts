import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/"]);
// const isPublicRoute = createRouteMatcher(["/api/webhooks*"]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});
export const config = {
  matcher: ["/((?!api/).*)", "/", "/(api|trpc)(.*)"],
};
