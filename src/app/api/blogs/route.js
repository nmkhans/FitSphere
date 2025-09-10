import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const { collection: blogsCollection } = await dbConnect(
      collectionNameObj.blogsCollection
    );

    let query = {};
    if (email) {
      query.email = email;
    }

    const blogs = await blogsCollection.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(
      { success: true, data: blogs },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/blogs error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    
    const { collection: blogsCollection } = await dbConnect(
      collectionNameObj.blogsCollection
    );

    const blogData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await blogsCollection.insertOne(blogData);

    const newBlog = await blogsCollection.findOne({ _id: result.insertedId });

    return NextResponse.json(
      { success: true, data: newBlog },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/blogs error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to create blog" },
      { status: 500 }
    );
  }
}