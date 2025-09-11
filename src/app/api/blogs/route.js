import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

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


// DELETE a blog by id
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, message: "Blog ID is required" }),
        { status: 400 }
      );
    }

    const { collection: blogsCollection } = await dbConnect(
      collectionNameObj.blogsCollection
    );

    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "Blog not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Blog deleted successfully" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("DELETE error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
