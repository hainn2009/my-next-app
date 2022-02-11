import { useRouter } from "next/router";

export default function EventDetailPage() {
  const router = useRouter();
  return (
    <div>
      <h1>Event {router.query.id} Detail</h1>
    </div>
  );
}
