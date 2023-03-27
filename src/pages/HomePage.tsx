import PodCard from "../components/PodCard";
import NodeCard from "../components/NodeCard";
import JobCard from "../components/JobCard";
import { JobProps, NodeProps, PodProps } from "../api/type";
import { createSignal } from "solid-js";

type Props = {
  pods: PodProps[];
  nodes: NodeProps[];
  jobs: JobProps[];
};

const HomePage = (props: Props) => {
  const [searchTerm, setSearchTerm] = createSignal<string>("");

  const handleInput = (event: any) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div class="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">
        Cloud Dashboard
      </div>

      <div class="py-4"></div>

      <div class="mx-10 flex items-center rounded-md border border-gray-300">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm()}
          onInput={handleInput}
          class="w-full border-none bg-white px-4 py-2 text-gray-700 outline-none focus:ring-0"
        />
      </div>

      <div class="px-10 pt-12 font-Inter text-4xl font-semibold">All Pods</div>

      <div class="grid gap-8 px-10 pt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {props.pods
          .filter((pod) => pod.pod_name.includes(searchTerm()))
          .map((pod: PodProps) => (
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
      <div class="grid gap-8 px-10 pt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {props.nodes
          .filter((node) => node.node_name.includes(searchTerm()))
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
      <div class="grid gap-8 px-10 pt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {props.nodes
          .filter((node) => node.node_name.includes(searchTerm()))
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
        {props.jobs
          .filter((job) => job.name.includes(searchTerm()))
          .map((job: JobProps) => (
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
