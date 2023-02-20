import { useEffect, useState } from "react";
import Pod, { PodProps } from "./components/PodCard";
import Node, { NodeProps } from "./components/NodeCard";
import Job, { JobProps } from "./components/JobCard";
import { Socket } from "./api/manager";
import LoadingPage from "./pages/LoadingPage";

const App = () => {
  const [pods, setPods] = useState<PodProps[]>([]);
  const [nodes, setNodes] = useState<NodeProps[]>([]);
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    Socket.onmessage = (event) => {
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

    return () => {
      if (Socket.readyState === 1) {
        Socket.close();
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

export default App;
