import { saveComment } from "../../../helpers/comments-api-util";

export default function handler(req, res) {
  if (req.method === "POST") {
    saveComment({ eventId: req.query.eventId, ...req.body });
    res.status(200).json({ message: "Success" });
  } else {
    // get comments
  }
}
