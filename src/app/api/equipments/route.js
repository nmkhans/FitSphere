import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    const muscle = searchParams.get("muscle") || "All";
    const page = parseInt(searchParams.get("page")) || 1;
    const ITEMS_PER_PAGE = 12;

    const {collection: equipmentsCollection} = await dbConnect("equipments");

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (category !== "All") query.category = category;
    if (muscle !== "All") query.muscleTargeted = muscle;

    const totalCount = await equipmentsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const equipments = await equipmentsCollection
      .find(query)
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .toArray();

    return new Response(JSON.stringify({ equipments, totalPages }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const { collection: equipmentsCollection } = await dbConnect(
      "equipments"
    );
    const result = await equipmentsCollection.insertOne(data);
    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}