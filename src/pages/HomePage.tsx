import Pod from "../components/PodCard";
import Node from "../components/NodeCard";
import Job from "../components/JobCard";
import LoadingPage from "../pages/LoadingPage";
import { JobProps, NodeProps, PodProps } from "../api/type";

type Props = {
  pods: PodProps[];
  nodes: NodeProps[];
  jobs: JobProps[];
};

const HomePage = (props: Props) => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div className="pt-10 px-10 font-Inter text-5xl font-semibold">
        Cloud Dashboard
      </div>

      <div className="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Pods
      </div>

      <div className="pt-4 px-10 grid lg:grid-cols-2 gap-8">
        {props.pods.map((pod: PodProps, i: number) => (
          <Pod name={pod.name} id={pod.id} nodes={pod.nodes} key={i} />
        ))}
      </div>

      <div className="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Nodes
      </div>

      <div className="pt-4 px-10 grid xl:grid-cols-2 gap-8">
        {props.nodes.map((node: NodeProps, i: number) => (
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
        {props.jobs.map((job: JobProps, i: number) => (
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
