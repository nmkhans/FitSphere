import dbConnect from "@/lib/dbConnect";
import { NextResponse } from "next/server";


export async function GET(req) {
  const reviewsCollection = await dbConnect("review");
  
  const reviews = await reviewsCollection.find({}).toArray();

  return NextResponse.json({
    success: true,
    data: reviews,
  });
}
