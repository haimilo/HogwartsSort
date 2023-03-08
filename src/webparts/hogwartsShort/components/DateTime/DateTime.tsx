import * as React from "react";
import { useEffect } from "react";

const DateTime = () => {
  const [dateTime, setDateTime] = React.useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Current Date and Time:</h1>
      <p>
        <strong>Date:</strong> {dateTime.toLocaleDateString()}
      </p>
      <p>
        <strong>Time:</strong> {dateTime.toLocaleTimeString()}
      </p>
      <hr />
    </div>
  );
};

export default DateTime;
