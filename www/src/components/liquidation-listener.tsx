import { useEffect, useState } from "react";

export const LiquidationListener: React.FC = () => {
  const [events, setEvents] = useState<unknown[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setEvents((prevEvents) => [...prevEvents, data]);
      } catch (error) {
        console.error("Failed to parse incoming event data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
    };
  }, []);

  return (
    <div>
      <h2>SSE Events:</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.message}</li>
        ))}
      </ul>
    </div>
  );
};
