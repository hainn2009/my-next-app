import { createComment, getComments } from "../../../helpers/comments-api-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (!email || !name || !text)
      return res.status(422).json({ message: "Invalid input" });
    const result = await createComment({
      eventId: req.query.eventId,
      ...req.body,
    });
    res.status(200).json({
      message: "Added new comment",
      data: { id: result.insertedId, eventId, ...req.body },
    });
  } else {
    // const comments = [
    //   {
    //     id: 1,
    //     email: "test@test.com",
    //     name: "Hai",
    //     text: "Very good",
    //   },
    //   {
    //     id: 2,
    //     email: "test@test.com",
    //     name: "Bank",
    //     text: "Very good second times",
    //   },
    // ];
    return res.status(200).json({ comments: await getComments() });
  }
}
