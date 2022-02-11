import { useRouter } from "next/router";

export default function Event() {
  const router = useRouter();
  return (
    <div>
      <h1>Event {router.query.id}</h1>
    </div>
  );
}
