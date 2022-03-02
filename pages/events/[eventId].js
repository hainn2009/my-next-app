import { useRouter } from "next/router";
import { Fragment } from "react";

import { getAllEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

export default function EventDetailPage({ event }) {
  // const router = useRouter();
  // const event = getEventById(router.query.eventId);
  if (!event)
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAll={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  return { props: { event: await getEventById(context.params.eventId) } };
}

export async function getStaticPaths() {
  return {
    paths: (await getAllEvents()).map((event) => ({
      params: { eventId: event.id },
    })),
    fallback: false,
  };
}
