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

// import dbConnect from "@/lib/dbConnect";

// export async function GET(req) {
//   try {
//     const {
//       search = "",
//       category = "All",
//       muscle = "All",
//       page = "1",
//     } = Object.fromEntries(new URL(req.url).searchParams);

//     const ITEMS_PER_PAGE = 12;
//     const pageNumber = parseInt(page) || 1;

//     const collection = await dbConnect("equipments");

//     const query = {};
//     if (search) {
//       query.$or = [
//         { name: { $regex: search, $options: "i" } },
//         { description: { $regex: search, $options: "i" } },
//       ];
//     }
//     if (category !== "All") query.category = category;
//     if (muscle !== "All") query.muscleTargeted = muscle;

//     const totalCount = await collection.countDocuments(query);
//     const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
// console.log(query);
//     const equipments = await collection
//       .find(query)
//       .skip((pageNumber - 1) * ITEMS_PER_PAGE)
//       .limit(ITEMS_PER_PAGE)
//       .toArray();
//     console.log(equipments);
//     return new Response(JSON.stringify({ equipments, totalPages }), {
//       status: 200,
//     });
//   } catch (err) {
//     console.error(err);
//     return new Response(
//       JSON.stringify({ success: false, message: "Server error" }),
//       { status: 500 }
//     );
//   }
// }
