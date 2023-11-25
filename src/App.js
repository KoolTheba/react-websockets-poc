import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    const apiCall = {
      event: "content_generator:request",
      data: { description: "Hello", urls: ["www.hello.com/123456"] },
    };

    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = function (ev) {
      const { data } = JSON.parse(ev.data);
      setData(data);
    };

    return () => ws.close();
  }, []);

  if (!data) {
    return <p>Loading....content coming soon</p>;
  }

  return (
    <div>
      <img
        src={data?.pictures[0].url}
        alt={data?.pictures[0].description}
        width="200px"
      />
      <p> {data?.postDescription}</p>
    </div>
  );
}

export default App;
