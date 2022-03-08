import { Db } from "mongodb";
import { createComment, getComments } from "../../../helpers/comments-api-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email || !name || !text)
      return res.status(422).json({ message: "Invalid input" });
    createComment({ eventId: req.query.eventId, ...req.body });
    res.status(200).json({ message: "Added comment" });
  } else {
    // db.collection('comments').find().sort(_id: -1).toArray()
    console.log("comments", await getComments());
    const comments = [
      {
        id: 1,
        email: "test@test.com",
        name: "Hai",
        text: "Very good",
      },
      {
        id: 2,
        email: "test@test.com",
        name: "Bank",
        text: "Very good second times",
      },
    ];
    return res.status(200).json({ comments });
  }
}
