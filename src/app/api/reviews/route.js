import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { collection: reviewsCollection } = await dbConnect(
    collectionNameObj.reviewCollection
  );

  const reviews = await reviewsCollection.find({}).toArray();

  return NextResponse.json({
    success: true,
    data: reviews,
  });
}

export const POST = async (req) => {
  const data = await req.json();

  
};
