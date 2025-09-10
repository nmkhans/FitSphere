
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, context) {
  try {
    const { params } = await context; // 👈 await here
    const id = String(params?.id);

    console.log("params by id:", id);

    // if (!ObjectId.isValid(id)) {
    //   return new Response(JSON.stringify({ error: "Invalid blog id" }), {
    //     status: 400,
    //   });
    // }

    // const { collection: blogsCollection } = await dbConnect(
    //   collectionNameObj.blogCollection
    // );

    // const blog = await blogsCollection.findOne({ _id: new ObjectId(id) });

    // if (!blog) {
    //   return new Response(JSON.stringify({ error: "Blog not found" }), {
    //     status: 404,
    //   });
    // }

    // return Response.json(blog);
  } catch (err) {
    console.error("GET /api/blogs/[id] error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch blog" }),
      { status: 500 }
    );
  }
}
