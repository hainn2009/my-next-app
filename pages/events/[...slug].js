import { useRouter } from "next/router";

export default function FilteredEventsPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>Filter Event</h1>
    </div>
  );
}
