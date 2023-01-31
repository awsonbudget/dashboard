import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [containers, setContainers] = useState<string[]>();

  useEffect(() => {
    axios.get("http://localhost:5556").then((response) => {
      setContainers(response.data);
      console.log(response.data);
    });
  }, []);
  if (!containers) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Containers:
      {containers.map((v, i) => {
        return <div key={i}>{v}</div>;
      })}
    </div>
  );
}

export default App;
