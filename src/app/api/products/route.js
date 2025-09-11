import dbConnect from "@/lib/dbConnect";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "All";
    const sort = searchParams.get("sort") || "asc"; // asc or desc
    const page = parseInt(searchParams.get("page")) || 1;
    const ITEMS_PER_PAGE = parseInt(searchParams.get("limit")) || 12;

    const { collection: productsCollection } = await dbConnect("products");

    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (category !== "All") query.category = category;

    const totalCount = await productsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const products = await productsCollection
      .find(query)
      .sort({ price: sort === "asc" ? 1 : -1 })
      .skip((page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE)
      .toArray();

    return new Response(JSON.stringify({ products, totalPages }), {
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
    const { collection: productsCollection } = await dbConnect("products");
    const result = await productsCollection.insertOne(data);
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
