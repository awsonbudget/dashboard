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
    <div class="min-h-screen min-w-max bg-gradient-to-r from-gray-100 to-gray-300">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">
        Cloud Dashboard
      </div>

      <div class="px-10 pt-12 font-Inter text-4xl font-semibold">All Pods</div>

      <div class="grid gap-8 px-10 pt-4 xl:grid-cols-2 4xl:grid-cols-3">
        {props.pods.map((pod: PodProps) => (
          <PodCard
            pod_name={pod.pod_name}
            pod_id={pod.pod_id}
            pod_type={pod.pod_type}
            total_nodes={pod.total_nodes}
          />
        ))}
      </div>

      <div class="px-10 pt-12 font-Inter text-4xl font-semibold">
        All Job Nodes
      </div>
      <div class="grid gap-8 px-10 pt-4 xl:grid-cols-2 4xl:grid-cols-3">
        {props.nodes
          .filter((node: NodeProps) => node.node_type === "job")
          .map((node: NodeProps) => (
            <NodeCard
              node_name={node.node_name}
              node_id={node.node_id}
              node_status={node.node_status}
              node_type={node.node_type}
              pod_data={node.pod_data}
            />
          ))}
      </div>

      <div class="px-10 pt-12 font-Inter text-4xl font-semibold">
        All Server Nodes
      </div>
      <div class="grid gap-8 px-10 pt-4 xl:grid-cols-2 4xl:grid-cols-3">
        {props.nodes
          .filter((node: NodeProps) => node.node_type === "server")
          .map((node: NodeProps) => (
            <NodeCard
              node_name={node.node_name}
              node_id={node.node_id}
              node_status={node.node_status}
              node_type={node.node_type}
              pod_data={node.pod_data}
            />
          ))}
      </div>

      <div class="px-10 pt-12 font-Inter text-4xl font-semibold">All Jobs</div>
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
      <div class="py-4"></div>
    </div>
  );
};

export default HomePage;
