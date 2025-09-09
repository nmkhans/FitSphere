import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const awaitedParams = await params;
    const { id } =  awaitedParams;

    const collection = await dbConnect("products");
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
      });
    }

    return Response.json(product);
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch product" }),
      { status: 500 }
    );
  }
}
