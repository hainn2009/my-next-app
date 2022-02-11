import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";

export default function HomePage() {
  return (
    <div>
      <h1>Featured Events</h1>
      <EventList items={getFeaturedEvents()} />
    </div>
  );
}
