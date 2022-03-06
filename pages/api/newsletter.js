import { MongoClient } from "mongodb";
import { saveNewletterRegistration } from "../../helpers/newsletter-api-util";

export default async function handler(req, res) {
  const email = req.body.email;
  // will get error if pass email as a number
  if (!email || email.trim() === "" || !email.includes("@"))
    return res.status(422).json({ message: "Invalid email address" });
  const client = await MongoClient.connect(
    "mongodb+srv://newuser:Dp7Q17bm2IGQkSbu@cluster0.5imn6.mongodb.net/newsletter?retryWrites=true&w=majority"
  );

  const db = client.db();
  const result = await db.collection("emails").insertOne({ email });
  client.close();
  // saveNewletterRegistration(email);

  res
    .status(201)
    .json({
      message: "Sign up",
      data: { id: result.insertedId.toString(), email },
    });
}
