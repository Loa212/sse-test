// components/EventListener.tsx

import { useEffect, useState } from "react";

const EventListener: React.FC = () => {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:8080/events"); // Set the correct SSE endpoint URL

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setEvents((prevEvents) => [...prevEvents, data.message]);
      } catch (error) {
        console.error("Failed to parse incoming event data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>SSE Events:</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event}</li>
        ))}
      </ul>
    </div>
  );
};

export default EventListener;
