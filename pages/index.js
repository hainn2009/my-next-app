import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";

export default function HomePage({ events }) {
  return (
    <div>
      <h1>Featured Events</h1>
      {/* <EventList items={getFeaturedEvents()} /> */}
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://my-events-project-19872-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const events = await response.json();

  return {
    props: {
      events: Object.keys(events)
        .map((id) => ({ ...events[id], id: id }))
        .filter((e) => e.isFeatured),
    },
  };
}
