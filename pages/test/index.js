import { useRef } from "react";

export default function TestPage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();
  function submitFormHandler(event) {
    event.preventDefault();
    fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailInputRef.current.value,
        text: feedbackInputRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  return (
    <div>
      <h1>Test Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your email address</label>
          <input type='email' id='email' ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor='feedback'>YOur feedback</label>
          <textarea id='feedback' rows='5' ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  );
}
