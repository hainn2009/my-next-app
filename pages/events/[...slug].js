import { useRouter } from "next/router";
import { Fragment } from "react";

import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) return <p className='center'>Loading...</p>;
  const year = +filterData[0];
  const month = +filterData[1];
  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Browse All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filterEvents = getFilteredEvents({ year, month });
  if (!filterEvents || filterEvents.length === 0) {
    return (
      <Fragment>
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
      <ResultsTitle date={date} />
      <EventList items={filterEvents} />
    </Fragment>
  );
}
