import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";

const getDb = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  return client.db();
};

export async function createComment({ eventId, email, name, text }) {
  // const comments = JSON.parse(
  //   fs.readFileSync(path.join(process.cwd(), "data", "comments.json"))
  // );
  // comments.push({ eventId, email, name, text });
  // fs.writeFileSync(
  //   path.join(process.cwd(), "data", "comments.json"),
  //   JSON.stringify(comments)
  // );
  return (await getDb())
    .collection("comments")
    .insertOne({ eventId, email, name, text });
}

export async function getComments() {
  return (await getDb()).collection("comments").find().toArray();
  // return JSON.parse(
  //   fs.readFileSync(path.join(process.cwd(), "data", "comments.json"))
  // );
}
