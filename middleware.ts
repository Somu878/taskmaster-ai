import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
function addPadding(base64: string): string {
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  return base64;
}

// const isProtectedRoute = createRouteMatcher(["/"]);
// const isPublicRoute = createRouteMatcher(["/api/webhooks*"]);
// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) {
//     auth().protect();
//   }
// });
export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (req.method === "POST" && req.url.includes("/api/webhooks/clerk")) {
    try {
      const rawData = await req.text();
      const base64Data = addPadding(rawData);
      const decodedData = Buffer.from(base64Data, "base64").toString("utf8");
      return NextResponse.json({ message: "Webhook processed successfully" });
    } catch (error) {
      console.error("Failed to process webhook:", error);
      return new NextResponse("Bad Request", { status: 400 });
    }
  }

  return NextResponse.next();
});
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
