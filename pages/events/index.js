import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";

export default function AllEventsPage() {
  return (
    <div>
      <EventList items={getAllEvents()} />
    </div>
  );
}
