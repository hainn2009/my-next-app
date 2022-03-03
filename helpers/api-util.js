export async function getAllEvents() {
  const response = await fetch(
    "https://my-events-project-19872-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const events = await response.json();
  return Object.keys(events).map((id) => ({ ...events[id], id: id }));
}

export async function getFeaturedEvents() {
  return (await getAllEvents()).filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  return (await getAllEvents()).find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  let filteredEvents = (await getAllEvents()).filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}
