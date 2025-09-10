import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import status from "daisyui/components/status";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const status = searchParams.get("status");

  const { collection: cartCollection } = await dbConnect(
    collectionNameObj.carts
  );

  const query = {};
  if (userId) query.userId = userId;
  if (status) query.status = status;

  const cartItems = await cartCollection.find(query).toArray();

  return new Response(JSON.stringify(cartItems), { status: 200 });
}


export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session)
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });

  const data = await req.json();
  const { productId, name, price, photo, quantity = 1 } = data;

  if (!productId || !name || !price) {
    return new Response(JSON.stringify({ message: "Missing fields" }), {
      status: 400,
    });
  }

  const { collection: cartCollection } = await dbConnect(
    collectionNameObj.carts
  );

  // Check if item already exists
  const existingItem = await cartCollection.findOne({
    userId: session.user.id,
    productId,
  });

  if (existingItem) {
    // Increase quantity
    await cartCollection.updateOne(
      { userId: session.user.id, productId },
      { $inc: { quantity: quantity } }
    );
  } else {
    // Insert new
    await cartCollection.insertOne({
      userId: session.user.id,
      productId,
      name,
      price,
      status: "pending",
      photo: photo || null,
      quantity,
      createdAt: new Date(),
    });
  }

  return new Response(JSON.stringify({ message: "Added to cart" }), {
    status: 200,
  });
}
