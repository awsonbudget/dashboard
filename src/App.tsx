import { useEffect, useState } from "react";
import Pod, { PodProps } from "./components/PodCard";
import Node, { NodeProps } from "./components/NodeCard";
import Job, { JobProps } from "./components/JobCard";
import { fetchJob, fetchNode, fetchPod, fetchJobLog, fetchNodeLog } from "./api/manager";
import Log, { LogProps } from "./components/LogCard";

const App = () => {
  const [pods, setPods] = useState<PodProps[] | null>(null);
  const [nodes, setNodes] = useState<NodeProps[] | null>(null);
  const [jobs, setJobs] = useState<JobProps[] | null>(null);
  const [log, setLog] = useState<LogProps | null>(null);

  useEffect(() => {
    const update = async () => {
      const podsData = await fetchPod();
      console.log(podsData);
      if (podsData === undefined) {
        setPods(null);
      } else {
        setPods(podsData);
      }
      const nodesData = await fetchNode();
      console.log(nodesData);
      if (nodesData === undefined) {
        setNodes(null);
      } else {
        setNodes(nodesData);
      }
      const jobsData = await fetchJob();
      console.log(jobsData);
      if (jobsData === undefined) {
        setJobs(null);
      } else {
        setJobs(jobsData);
      }
    };
    const intervalId = setInterval(update, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (pods === null || nodes === null || jobs === null) {
    return <div>Loading...</div>;
  }

  const getJobLog = async (jobID) => {
    let getLog = await fetchJobLog(jobID)
      if (getLog === null) {
        getLog = ''
      }

    setLog(getLog)
    console.log("get log")
    console.log(getLog)
  }

  const getNodeLog = async (nodeID) => {
    let getLog = await fetchNodeLog(nodeID)
      if (Object.keys(getLog).length === 0) {
        getLog = ''
      }

    setLog(getLog)
    console.log("get log")
    console.log(getLog)
  }

  return (
    <div className="bg-[#eef0f8] w-screen h-screen">
      <div className="pt-10 px-10 font-Inter text-5xl font-semibold">
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

      <div className="pt-4 px-10 grid grid-cols-2 gap-8">
        {nodes.map((node: NodeProps, i: number) => (
          <Node
            name={node.name}
            id={node.id}
            status={node.status}
            pod={node.pod}
            key={i}
            getLog={getNodeLog}
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
            getLog={getJobLog}
          />
        ))}
      </div>

      <div className="pt-10 px-10 font-Inter text-4xl font-semibold">
        Log
      </div>
      <div className="pt-4 px-10 grid grid-cols-1 gap-8">
        <Log log = {log}/> 
      </div>
    </div>
  );
};

export default App;
