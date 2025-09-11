import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  reviewCollection: "reviews",
  products: "products",
  carts: "carts",
    usersCollection: "users",
    specializedMembersCollection: "specializedMembers",
    equipmentsCollection: "equipments",
    trainerApplicationsCollection: "trainerapplications",
    trainerAssignmentsCollection: "trainerassignments",
    blogsCollection: "blogs",
};

const uri = process.env.MONGODB_URI || process.env.DB_URI;
const dbName = process.env.DB_NAME;

let cachedClient = null;
let cachedDb = null;

export default async function dbConnect(collectionName) {
    if (!uri) {
        throw new Error("MONGODB_URI or DB_URI is not defined in environment variables");
    }

    if (!dbName) {
        throw new Error("Please define the DB_NAME environment variable inside .env.local");
    }

    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
            collection: cachedDb.collection(collectionName),
        };
    }

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
    });

    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }

    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    return {
        client,
        db,
        collection: db.collection(collectionName),
    };
}
