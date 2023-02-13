import { useEffect, useState } from "react";
import axios from "axios";
import Pod, { PodProps } from "./components/PodCard";
import Node, { NodeProps } from "./components/NodeCard";
import Job, { JobProps } from "./components/JobCard";

const App = () => {
  const [pods, setPods] = useState<PodProps[]>([]);
  const [nodes, setNodes] = useState<NodeProps[]>([]);
  const [jobs, setJobs] = useState<JobProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      try {
        await axios.get("http://localhost:5550/cloud/pod/").then((response) => {
          console.log(date.getTime(), "getting pods");
          console.log(response.data.data);
          let data: PodProps[] = response.data.data;
          setPods(data);
          console.log("pods");
          console.log(pods);
        });
      } catch {
        console.log(date.getTime(), "failed getting pod info");
      }

      try {
        await axios
          .get("http://localhost:5550/cloud/node/")
          .then((response) => {
            console.log(date.getTime(), "getting nodes");
            console.log(response.data.data);
            let data: NodeProps[] = response.data.data;
            setNodes(data);
            console.log("nodes");
            console.log(nodes);
          });
      } catch {
        console.log(date.getTime(), "failed getting node info");
      }

      try {
        await axios.get("http://localhost:5550/cloud/job").then((response) => {
          console.log(date.getTime(), "getting jobs");
          console.log(response.data.data);
          let data: JobProps[] = response.data.data;
          setJobs(data);
          console.log("jobs");
        });
      } catch {
        console.log(date.getTime(), "failed getting job info");
      }
    };

    const intervalID = setInterval(fetchData, 5000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="bg-[#eef0f8] w-screen h-screen">
      <div className="pt-10 px-10 font-Inter text-6xl font-semibold">
        AOB Dashboard
      </div>

      <div className="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Pods
      </div>

      <div className="pt-4 px-10 grid grid-cols-3 gap-8">
        {pods.map((pod: PodProps, i: number) => (
          <Pod name={pod.name} id={pod.id} nodes={pod.nodes} key={i} />
        ))}
      </div>

      <div className="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Nodes
      </div>

      <div className="pt-4 px-10 grid grid-cols-3 gap-8">
        {nodes.map((node: NodeProps, i: number) => (
          <Node
            name={node.name}
            id={node.id}
            status={node.status}
            pod={node.pod}
            key={i}
          />
        ))}
      </div>

      <div className="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Jobs
      </div>
      <div className="pt-4 px-10 grid grid-cols-1 gap-8">
        {jobs.map((job: JobProps, i: number) => (
          <Job
            id={job.id}
            name={job.name}
            node={job.node}
            status={job.status}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
