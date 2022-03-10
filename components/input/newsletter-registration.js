import { useRef, useState, useContext } from "react";

import classes from "./newsletter-registration.module.css";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  function registrationHandler(event) {
    event.preventDefault();

    const email = emailInputRef.current.value;
    if (!email || email.trim() === "" || !email.includes("@")) {
      setIsValid(false);
      return;
    } else {
      setIsValid(true);
    }
    notificationCtx.showNotification({
      title: "Signing up",
      message: "Registering for new letters",
      status: "pending",
    });
    fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) =>
        notificationCtx.showNotification({
          title: "Success",
          message: "Success for registering new letters",
          status: "success",
        })
      )
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      });
  }
  const [isValid, setIsValid] = useState(true);
  const emailInputRef = useRef();
  const notificationCtx = useContext(NotificationContext);
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
