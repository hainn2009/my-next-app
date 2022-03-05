// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const data = JSON.parse(
      fs.readFileSync(path.join(process.cwd(), "data", "feedback.json"))
    );
    const newFeedback = {
      id: new Date().toISOString(),
      email: req.body.email,
      text: req.body.text,
    };
    data.push(newFeedback);
    fs.writeFileSync(
      path.join(process.cwd(), "data", "feedback.json"),
      JSON.stringify(data)
    );
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "It works!" });
  }
}
