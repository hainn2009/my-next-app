import { useState } from "react";

export default () => {
  const [count, setCount] = useState(0);
  const onClick = () => setCount(count + 1);
  return (
    <>
      {count}
      <button onClick={onClick}>Click me</button>
    </>
  );
};
