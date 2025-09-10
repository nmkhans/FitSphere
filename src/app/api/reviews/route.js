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
  const { collection: reviewCollection } = await dbConnect(
    collectionNameObj.reviewCollection
  );

  const data = await req.json();

  const result = await reviewCollection.insertOne(data);

  if (result.acknowledged) {
    return NextResponse.json({
      success: true,
      message: "Review successfully posted.",
      data: result,
    });
  } else {
    return NextResponse.json({
      success: false,
      message: "Review couldn't posted!",
    });
  }
};
