import { NextResponse } from "next/server";

export function GET(req) {
  return NextResponse.json({
    success: true,
    message: "server is running...",
  });
}
