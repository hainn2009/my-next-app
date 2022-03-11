import { MongoClient } from "mongodb";
import { saveNewletterRegistration } from "../../helpers/newsletter-api-util";

export default async function handler(req, res) {
  const email = req.body.email;
  // will get error if pass email as a number
  if (!email || email.trim() === "" || !email.includes("@"))
    return res.status(422).json({ message: "Invalid email address" });
  try {
    const result = await saveNewletterRegistration(email);

    res.status(201).json({
      message: "Sign up",
      data: { id: result.insertedId.toString(), email },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
}
