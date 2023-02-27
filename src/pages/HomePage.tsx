import PodCard from "../components/PodCard";
import NodeCard from "../components/NodeCard";
import JobCard from "../components/JobCard";
import { JobProps, NodeProps, PodProps } from "../api/type";

type Props = {
  pods: PodProps[];
  nodes: NodeProps[];
  jobs: JobProps[];
};

const HomePage = (props: Props) => {
  return (
    <div class="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div class="pt-10 px-10 font-Inter text-5xl font-semibold">
        Cloud Dashboard
      </div>

      <div class="pt-10 px-10 font-Inter text-4xl font-semibold">All Pods</div>

      <div class="pt-4 px-10 grid lg:grid-cols-2 gap-8">
        {props.pods.map((pod: PodProps, i: number) => (
          <PodCard name={pod.name} id={pod.id} nodes={pod.nodes} />
        ))}
      </div>

      <div class="pt-10 px-10 font-Inter text-4xl font-semibold">All Nodes</div>

      <div class="pt-4 px-10 grid xl:grid-cols-2 gap-8">
        {props.nodes.map((node: NodeProps, i: number) => (
          <NodeCard
            name={node.name}
            id={node.id}
            status={node.status}
            pod={node.pod}
          />
        ))}
      </div>

      <div class="pt-10 px-10 font-Inter text-4xl font-semibold">All Jobs</div>
      <div class="pt-4 px-10 grid grid-cols-1 gap-8">
        {props.jobs.map((job: JobProps, i: number) => (
          <JobCard
            id={job.id}
            name={job.name}
            node={job.node}
            status={job.status}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
