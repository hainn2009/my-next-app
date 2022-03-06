import classes from "./newsletter-registration.module.css";
import { useRef, useState } from "react";

function NewsletterRegistration() {
  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API

    const email = emailInputRef.current.value;
    if (!email || email.trim() === "" || !email.includes("@")) {
      setIsValid(false);
      return;
    } else {
      setIsValid(true);
    }
    fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  const [isValid, setIsValid] = useState(true);
  const emailInputRef = useRef();
  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
      {!isValid && <p>Please input valid email</p>}
    </section>
  );
}

export default NewsletterRegistration;
