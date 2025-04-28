import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let client;

// Handle development vs production
if (process.env.NODE_ENV === "development") {
  let globalWithMongo = globalThis;

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri, options);
}

// Create a clientPromise (needed for NextAuth adapter)
export const clientPromise = client.connect();

// Helper to access any collection easily
export const collection = async (name) => {
  const db = (await clientPromise).db("khalil_computer"); // your database name
  return db.collection(name);
};

// Default export the client (optional, for direct usage if ever needed)
export default client;
