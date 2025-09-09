import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { ObjectId } from "mongodb";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });

  const awaitedParams = await params;
  const { id } = awaitedParams;
  if (!id)
    return new Response(JSON.stringify({ message: "Missing id" }), {
      status: 400,
    });

  const { collection: cartCollection } = await dbConnect(
    collectionNameObj.carts
  );

  await cartCollection.deleteOne({
    _id: new ObjectId(id),
    userId: session.user.id,
  });

  return new Response(JSON.stringify({ message: "Removed from cart" }), {
    status: 200,
  });
}
