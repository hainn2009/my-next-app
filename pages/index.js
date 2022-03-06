import Head from "next/head";
// import { getFeaturedEvents } from "../dummy-data";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";

export default function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='This is great place to find events' />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      events: await getFeaturedEvents(),
    },
    revalidate: 1800,
  };
}
