import { useContext, useEffect, useState } from "react";
import Pod from "../components/PodCard";
import Node from "../components/NodeCard";
import Job from "../components/JobCard";
import LoadingPage from "../pages/LoadingPage";
import { socket } from "../api/manager";
import { JobProps, NodeProps, PodProps } from "../api/type";

type Props = {};

const HomePage = (props: Props) => {
  const [pods, setPods] = useState<PodProps[]>([]);
  const [nodes, setNodes] = useState<NodeProps[]>([]);
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  if (socket.readyState === 3) {
    // HAX
    window.location.reload();
  }

  useEffect(() => {
    socket.onopen = () => {
      console.log("socket onopen");
    };
    socket.onmessage = (event) => {
      console.log("socket onmessage");
      const incoming = JSON.parse(event.data);
      if (incoming.type === "job") {
        setInitialized(true);
        const jobs: JobProps[] = incoming.data;
        setJobs(jobs);
      } else if (incoming.type === "node") {
        setInitialized(true);
        const nodes: NodeProps[] = incoming.data;
        setNodes(nodes);
      } else if (incoming.type === "pod") {
        setInitialized(true);
        const pods: PodProps[] = incoming.data;
        setPods(pods);
      } else if (incoming.type === "error") {
        setInitialized(false);
      }
    };
    socket.onclose = () => {
      console.log("socket onclose");
    };

    return () => {
      if (socket.readyState === 1) {
        console.log("socket close");
        socket.close();
      }
    };
  }, []);

  if (!initialized) {
    return <LoadingPage delay={5} />;
  }

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div className="pt-10 px-10 font-Inter text-5xl font-semibold">
        Cloud Dashboard
      </div>

      <div className="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Pods
      </div>

      <div className="pt-4 px-10 grid lg:grid-cols-2 gap-8">
        {pods.map((pod: PodProps, i: number) => (
          <Pod name={pod.name} id={pod.id} nodes={pod.nodes} key={i} />
        ))}
      </div>

      <div className="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Nodes
      </div>

      <div className="pt-4 px-10 grid xl:grid-cols-2 gap-8">
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

export default HomePage;
