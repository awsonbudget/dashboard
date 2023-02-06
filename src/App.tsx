import { useEffect, useState } from "react";
import axios from "axios";
import { Podspage } from "./page/pods";
import { Pod1page } from "./page/pod1";
import { Node1page } from "./page/node1";

function App() {
  // const [containers, setContainers] = useState<string[]>();

  // useEffect(() => {
  //   axios.get("http://localhost:5556").then((response) => {
  //     setContainers(response.data);
  //     console.log(response.data);
  //   });
  // }, []);
  // if (!containers) {
  //   return <div>Loading...</div>;
  // }



  return (
    <div className = "w-screen h-screen">
      <Podspage/>
    </div>
  );
}

export default App;
