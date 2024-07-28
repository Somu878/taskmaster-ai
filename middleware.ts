import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Helper function to add padding to a Base64 string
function addPadding(base64: string): string {
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  return base64;
}

const isProtectedRoute = createRouteMatcher(["/board"]);
const isPublicRoute = createRouteMatcher(["/api/webhooks*"]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  if (isProtectedRoute(req) && !isPublicRoute(req)) {
    auth().protect();
  }

  if (req.method === "POST" && req.url.includes("/api/webhooks/clerk")) {
    try {
      const rawData = await req.text();
      const base64Data = addPadding(rawData);
      const decodedData = Buffer.from(base64Data, "base64").toString("utf8");
      console.log("Decoded Data:", decodedData);
      // Process the decoded data here...
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

// const isProtectedRoute = createRouteMatcher(["/"]);
// const isPublicRoute = createRouteMatcher(["/api/webhooks*"]);
// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) {
//     auth().protect();
//   }
// });
// export default clerkMiddleware();
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
