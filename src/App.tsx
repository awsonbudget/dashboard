import { useEffect, useState } from "react";
import axios from "axios";
import { Podspage } from "./page/pods";
import { Pod1page } from "./page/pod1";
import { Node1page } from "./page/node1";

interface IPods {
  pods: Pod[];
}

interface INodes {
  nodes: Node[];
}

interface IJobs {
  jobs: Job[];
}

const App: React.FC<IPods> = (props: IPods) => {
  const [containers, setContainers] = useState<string[]>();

  const [pods, setPods] = useState<Pod[]>([]);
  const [nodes, setNodes] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      try {
        const podsResponse = await axios
          .get("http://localhost:5550/cloud/pod/")
          .then((response) => {
            console.log(date.getTime(), "getting pods");
            console.log(response.data.data);
            let data: Pod[] = response.data.data;
            setPods(response.data.data);
            console.log("pods");
            console.log(pods);
          });
      } catch {
        console.log(date.getTime(), "failed getting pod info");
      }

      try {
        const nodesResponse = await axios
          .get("http://localhost:5550/cloud/node/")
          .then((response) => {
            console.log(date.getTime(), "getting nodes");
            console.log(response.data.data);
            let data: Node[] = response.data.data;
            setNodes(response.data.data);
            console.log("nodes");
            console.log(nodes);
          });
      } catch {
        console.log(date.getTime(), "failed getting node info");
      }

      try {
        const jobsResponse = await axios
          .get("http://localhost:5550/cloud/job")
          .then((response) => {
            console.log(date.getTime(), "getting jobs");
            console.log(response.data.data);
            let data: Job[] = response.data.data;
            setJobs(response.data.data);
            console.log("jobs");
          });
      } catch {
        console.log(date.getTime(), "failed getting job info");
      }
    };

    // fetchData();
    const intervalID = setInterval(fetchData, 5000);
    return () => clearInterval(intervalID);
  }, []);

  //     axios.get("http://localhost:5556").then((response) => {
  //       setContainers(response.data);
  //       console.log(response.data);
  //     });
  //  }, []);

  // if (!containers) {
  //    return <div>Loading...</div>;}

  return (
    <div className="w-screen h-screen">
      <Podspage pods={pods} />
    </div>
  );
};

export default App;
