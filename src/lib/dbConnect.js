import { MongoClient, ServerApiVersion } from "mongodb";


export default async function dbConnect(collectionName) {
  const uri = process.env.MONGODB_URI || process.env.DB_URI;
  
  if (!uri) {
    console.log(
      "MONGODB_URI or DB_URI is not defined in environment variables"
    );
  }
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  await client.connect();
  return client.db(process.env.DB_NAME).collection(collectionName);
}
