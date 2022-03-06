import { saveNewletterRegistration } from "../../helpers/newsletter-api-util";

export default function handler(req, res) {
  const email = req.body.email;
  // will get error if pass email as a number
  if (!email || email.trim() === "" || !email.includes("@"))
    return res.status(422).json({ message: "Invalid email address" });
  saveNewletterRegistration(email);

  res.status(201).json({ email });
}
