import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";

import { getFeaturedEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import Comments from "../../components/input/comments";

export default function EventDetailPage({ event }) {
  // const router = useRouter();
  // const event = getEventById(router.query.eventId);
  if (!event) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
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
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  return {
    props: { event: await getEventById(context.params.eventId) },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  return {
    paths: (await getFeaturedEvents()).map((event) => ({
      params: { eventId: event.id },
    })),
    fallback: true,
  };
}
