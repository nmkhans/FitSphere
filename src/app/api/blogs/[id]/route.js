import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    
    console.log("Blog ID:", id);

    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, {
        status: 400,
      });
    }

    const { collection: blogsCollection } = await dbConnect(
      collectionNameObj.blogsCollection
    );

    const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, {
        status: 404,
      });
    }

    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error("GET /api/blogs/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, {
        status: 400,
      });
    }

    const data = await req.json();
    const { collection: blogsCollection } = await dbConnect(
      collectionNameObj.blogsCollection
    );

    const updateData = {
      ...data,
      updatedAt: new Date(),
    };

    const result = await blogsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, {
        status: 404,
      });
    }

    const updatedBlog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      data: updatedBlog,
    });
  } catch (error) {
    console.error("PUT /api/blogs/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid blog id" }, {
        status: 400,
      });
    }

    const { collection: blogsCollection } = await dbConnect(
      collectionNameObj.blogsCollection
    );

    const result = await blogsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Blog not found" }, {
        status: 404,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/blogs/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
