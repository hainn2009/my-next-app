import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) return <p className='center'>Loading...</p>;
  const year = +filterData[0];
  const month = +filterData[1];
  console.log(year);
  console.log(month);
  if (
    isNaN(year) ||
    isNaN(month) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return <p>Invalid Filter. Please adjust your values!</p>;
  }

  const filterEvents = getFilteredEvents({ year, month });
  if (!filterEvents || filterEvents.length === 0) {
    return <p>No event found with your chosen filter!</p>;
  }

  console.log(router.query);
  return (
    <div>
      <h1>Filter Event</h1>
    </div>
  );
}
