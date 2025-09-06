const { MongoClient, ServerApiVersion } = require("mongodb");

export const collectionNameObj = {
  usersCollection: "users",
};

export default async function dbConnect(collectionName) {
  const uri = process.env.DB_URI;
  if (!uri) {
    console.log("DB_URI is not defined in environment variables");
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.DB_NAME).collection(collectionName);
}
