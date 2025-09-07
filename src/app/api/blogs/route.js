import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  try {
    const data = await req.json(); 
  

    const blogsCollection = await dbConnect("blogs");

    // insert new blog
    const result = await blogsCollection.insertOne({
      ...data,
      createdAt: new Date(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Blog created successfully",
        insertedId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/blogs error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
