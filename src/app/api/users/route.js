import clientPromise from "@/lib/mongodb";

export async function PATCH(req) {
  try {
    const data = await req.json(); // { email, height, weight, ... }

    const client = await clientPromise;
    const db = client.db("FitSphere");

    const result = await db.collection("users").updateOne(
      { email: data.email },
      { $set: { membership: data } } // store under "membership" field
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Membership updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
