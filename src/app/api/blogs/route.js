import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";


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
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const blogsCollection = await dbConnect("blogs");

    let query = {};
    if (email) {
      query = {email: email }; 
    }

    const blogs = await blogsCollection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, blogs }, { status: 200 });
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
