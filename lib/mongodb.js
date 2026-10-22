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

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = globalThis;

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(uri, options);
}

export const clientPromise = client.connect();

// Helper to access any collection easily
export const collection = async (name) => {
  try {
    console.log(`MongoDB: Getting collection "${name}"`);
    const client = await clientPromise;
    const db = client.db("khalil_computer");
    const collection = db.collection(name);
    console.log(`MongoDB: Collection "${name}" obtained successfully`);
    return collection;
  } catch (error) {
    console.error(`MongoDB: Failed to get collection "${name}":`, error.message);
    throw error;
  }
};

export default client;