import { NextResponse } from "next/server";

export function GET(req) {
  const hasMongoUri = !!process.env.MONGODB_URI || !!process.env.DB_URI;
  const hasDbName = !!process.env.DB_NAME;
  const hasNextAuthSecret = !!process.env.NEXTAUTH_SECRET;
  
  return NextResponse.json({
    success: true,
    message: "server is running...",
    environment: {
      hasMongoUri,
      hasDbName,
      hasNextAuthSecret,
      nodeEnv: process.env.NODE_ENV
    }
  });
}
