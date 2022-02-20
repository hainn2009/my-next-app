import Button from "../ui/button";
import classes from "./event-search.module.css";

export default function EventsSearch(props) {
  return (
    <form className={classes.form}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor='year'>Year</label>
          <select id='year'>
            <option key='2021'>2021</option>
            <option key='2022'>2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor='month'>Month</label>
          <select id='month'>
            <option key='1'>January</option>
            <option key='2'>February</option>
            <option key='3'>March</option>
            <option key='4'>April</option>
            <option key='5'>May</option>
            <option key='6'>June</option>
            <option key='7'>July</option>
            <option key='8'>August</option>
            <option key='9'>September</option>
            <option key='10'>October</option>
            <option key='11'>November</option>
            <option key='12'>December</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
}
