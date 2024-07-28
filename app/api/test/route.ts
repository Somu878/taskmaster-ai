import { NextResponse } from "next/server";

// Define the GET handler for the API route
export async function GET(req: Request) {
  return NextResponse.json({
    message: "Okkk",
  });
}
