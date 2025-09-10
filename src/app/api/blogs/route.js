import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";


// export async function GET() {
//   try {
//     const blogsCollection = await dbConnect("blogs");

//     const blogs = await blogsCollection
//       .find({})
//       .sort({ createdAt: -1 }) // newest first
//       .toArray();

//     return NextResponse.json(
//       { success: true, blogs },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error("GET /api/blogs error:", err);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }



// GET blogs (all or filter by email)
// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const email = searchParams.get("email");

//     const blogsCollection = await dbConnect("blogs");

//     let query = {};
//     if (email) {
//       query = {email: email }; 
//     }

//     const blogs = await blogsCollection
//       .find(query)
//       .sort({ createdAt: -1 })
//       .toArray();

//     return NextResponse.json({ success: true, blogs }, { status: 200 });
//   } catch (err) {
//     console.error("GET /api/blogs error:", err);
//     return NextResponse.json(
//       { success: false, message: "Server error" },
//       { status: 500 }
//     );
//   }
// }




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

    const blogsCollection = await dbConnect("blogs");

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
