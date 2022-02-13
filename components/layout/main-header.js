import Link from "next/link";
import classes from "./main-header.module.css";

export default function MainHeader() {
  return (
    <header>
      <div>
        <Link href='/'>NextEvents</Link>
      </div>
      <nav>
        <Link href='/events'>Browse All Events</Link>
      </nav>
    </header>
  );
}
