import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/"]);
// const isPublicRoute = createRouteMatcher(["/api/webhooks(.*)"]);
export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  // if (isPublicRoute(req)) {
  //   return NextResponse.next();
  // }
});
export const config = {
  matcher: ["/((?!api/).*)", "/", "/(api|trpc)(.*)"],
};
