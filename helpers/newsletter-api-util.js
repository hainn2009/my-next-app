import path from "path";
import fs from "fs";

export function saveNewletterRegistration(email) {
  const emails = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "data", "newsletter.json"))
  );
  emails.push({ email });
  fs.writeFileSync(
    path.join(process.cwd(), "data", "newsletter.json"),
    JSON.stringify(emails)
  );
}
