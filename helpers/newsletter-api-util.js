import path from "path";
import fs from "fs";
import { MongoClient } from "mongodb";

const getDb = async () => {
  const client = await MongoClient.connect(process.env.MONGODB_URL);
  return client.db();
};

export async function saveNewletterRegistration(email) {
  // const emails = JSON.parse(
  //   fs.readFileSync(path.join(process.cwd(), "data", "newsletter.json"))
  // );
  // emails.push({ email });
  // fs.writeFileSync(
  //   path.join(process.cwd(), "data", "newsletter.json"),
  //   JSON.stringify(emails)
  // );
  const db = await getDb();
  const result = await db.collection("emails").insertOne({ email });
  return result;
}
