import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
    try {
        const usersCollection = await dbConnect("users");
        const users = await usersCollection.find({}).toArray();
        return new Response(JSON.stringify(users), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(
            JSON.stringify({ success: false, message: "Server error" }),
            { status: 500 }
        );
    }
}
export async function PATCH(req) {
  try {
    const data = await req.json(); // { email, height, weight, ... }

    const usersCollection = await dbConnect("users");

    const result = await usersCollection.updateOne(
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
