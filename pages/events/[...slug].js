import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import Head from "next/head";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventsPage(props) {
  const [events, setEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;
  const { data, error } = useSWR(
    "https://my-events-project-19872-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    (...args) => fetch(...args).then((res) => res.json())
  );
  useEffect(() => {
    if (data)
      setEvents(Object.keys(data).map((id) => ({ ...data[id], id: id })));
  }, [data]);

  if (!events || !filterData) return <p className='center'>Loading...</p>;
  const year = +filterData[0];
  const month = +filterData[1];
  const pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`All events for ${month}/${year}`} />
    </Head>
  );
  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Browse All Events</Button>
        </div>
      </Fragment>
    );
  }

  let filterEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  if (!filterEvents || filterEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No event found with your chosen filter!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Browse All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(year, month - 1);
  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filterEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const filterData = context.params.slug;
//   const year = +filterData[0];
//   const month = +filterData[1];
//   if (
//     isNaN(year) ||
//     isNaN(month) ||
//     year > 2030 ||
//     year < 2021 ||
//     month < 1 ||
//     month > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notfound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filterEvents = await getFilteredEvents({ year, month });
//   return {
//     props: {
//       events: filterEvents,
//       date: {
//         year: year,
//         month: month,
//       },
//     },
//   };
// }
