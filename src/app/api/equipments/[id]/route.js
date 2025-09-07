import dbConnect from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const collection = await dbConnect("equipments");
    const equipment = await collection.findOne({ _id: new ObjectId(id) });

    if (!equipment) {
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
      });
    }

    return Response.json(equipment);
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch equipment" }),
      { status: 500 }
    );
  }
}
