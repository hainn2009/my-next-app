import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
export default function AllEventsPage(props) {
  const [events, setEvents] = useState(props.events);
  const { data, error } = useSWR(
    "https://my-events-project-19872-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    fetcher
  );
  useEffect(() => {
    if (data) {
      console.log("data", data);
      const transformEvents = Object.keys(data).map((id) => ({
        id: id,
        ...data[id],
      }));
      setEvents(transformEvents);
    }
  }, [data]);

  const router = useRouter();
  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }
  if (error) return <p>No data yet</p>;
  if (!events) return <p>Loading...</p>;
  if (events) {
    console.log(events);

    return (
      <Fragment>
        <EventsSearch onSearch={findEventHandler} />
        {/* <EventList items={getAllEvents()} /> */}
        <EventList items={events} />
      </Fragment>
    );
  }
}

export async function getStaticProps() {
  const response = await fetch(
    "https://my-events-project-19872-default-rtdb.asia-southeast1.firebasedatabase.app/events/e1.json"
  );
  const events = await response.json();
  return {
    props: {
      events: [{ id: "e1", ...events }],
    },
  };
}
