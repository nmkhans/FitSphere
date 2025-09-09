import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNameObj = {
  usersCollection: "users",
  reviewCollection: "reviews",
  products: "products",
  carts: "carts",
};

const uri = process.env.MONGODB_URI || process.env.DB_URI;
const dbName = process.env.DB_NAME;

let cachedClient = null;
let cachedDb = null;

export default async function dbConnect(collectionName) {
  if (!uri) {
    console.log(
      "MONGODB_URI or DB_URI is not defined in environment variables"
    );
  }

  if (!dbName) {
    console.log(
      "Please define the MONGODB_DB_NAME environment variable inside .env.local"
    );
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
  await client.connect();

  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return {
    client,
    db,
    collection: db.collection(collectionName),
  };
}
