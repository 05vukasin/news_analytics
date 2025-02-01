"use client";

import { useState } from "react";

export default function ClientUpdateButton() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setLog(["Starting BBC news update..."]);

    try {
      const response = await fetch("/api/update-bbc-news", {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        setLog((prevLog) => [...prevLog, "Update successful:", JSON.stringify(data)]);
      } else {
        const error = await response.json();
        setLog((prevLog) => [...prevLog, `Error: ${error.message}`]);
      }
    } catch (error: any) {
      setLog((prevLog) => [...prevLog, `Error: ${error.message || error}`]);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <button
        className="update-button"
        onClick={handleUpdate}
        disabled={isUpdating}
      >
        {isUpdating ? "Updating..." : "Update BBC News"}
      </button>
      <div className="log">
        {log.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  );
}
