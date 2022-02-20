import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";

export default function AllEventsPage() {
  return (
    <Fragment>
      <EventsSearch />
      <EventList items={getAllEvents()} />
    </Fragment>
  );
}
