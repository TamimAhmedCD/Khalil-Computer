import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const clientPromise = client.connect();

export const collection = async (name) => {
  const db = (await clientPromise).db("khalil_computer");
  return db.collection(name);
};
