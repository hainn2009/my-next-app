import path from "path";
import fs from "fs";

export function saveComment({ eventId, email, name, text }) {
  const comments = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "comments.json"))
  );
  comments.push({ eventId, email, name, text });
  fs.writeFileSync(
    path.join(process.cwd(), "data", "comments.json"),
    JSON.stringify(comments)
  );
}

export async function getComments() {
  return JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "comments.json"))
  );
}
