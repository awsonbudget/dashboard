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
    <div class="min-h-screen min-w-max bg-gradient-to-b from-gray-100 to-gray-300">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">
        Cloud Dashboard
      </div>

      <div class="px-10 pt-10 font-Inter text-4xl font-semibold">All Pods</div>

      <div class="grid gap-8 px-10 pt-4 xl:grid-cols-2 4xl:grid-cols-3">
        {props.pods.map((pod: PodProps) => (
          <PodCard name={pod.name} id={pod.id} nodes={pod.nodes} />
        ))}
      </div>

      <div class="px-10 pt-10 font-Inter text-4xl font-semibold">All Nodes</div>

      <div class="grid gap-8 px-10 pt-4 xl:grid-cols-2 4xl:grid-cols-3">
        {props.nodes.map((node: NodeProps) => (
          <NodeCard
            name={node.name}
            id={node.id}
            status={node.status}
            pod={node.pod}
          />
        ))}
      </div>

      <div class="px-10 pt-10 font-Inter text-4xl font-semibold">All Jobs</div>
      <div class="grid gap-8 px-10 pt-4 4xl:grid-cols-2">
        {props.jobs.map((job: JobProps) => (
          <JobCard
            id={job.id}
            name={job.name}
            node={job.node}
            status={job.status}
          />
        ))}
      </div>
      <div class="py-4" />
    </div>
  );
};

export default HomePage;
