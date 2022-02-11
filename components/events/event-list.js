import EventItem from "./event-item";

export default function EventList(props) {
  return (
    <ul>
      {props.items.map((event) => (
        <EventItem key={event.id} item={event} />
      ))}
    </ul>
  );
}
