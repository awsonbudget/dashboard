import PodCard from "../components/PodCard";
import NodeCard from "../components/NodeCard";
import JobCard from "../components/JobCard";
import { JobProps, NodeProps, PodProps } from "../api/type";
import { createEffect, createSignal, onCleanup } from "solid-js";
import SearchIcon from "../assets/search.svg";
import { refreshPod } from "../api/manager";

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

  createEffect(async () => {
    const interval = setInterval(async () => {
      await refreshPod();
    }, 2000);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black dark:text-white">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">
        Cloud Dashboard
      </div>

      <div class="py-4"></div>

      <div class="mx-auto px-10">
        <div
          class="relative flex h-12 w-full items-center overflow-hidden rounded-lg bg-white 
          transition duration-250 ease-in-out focus-within:shadow-lg hover:shadow-lg"
        >
          <div class="grid h-full w-12 place-items-center text-gray-300">
            <img src={SearchIcon} class="h-6 w-6" />
          </div>

          <input
            class="peer h-full w-full pr-2 font-Inter text-sm text-gray-700 outline-none"
            type="text"
            id="search"
            value={searchTerm()}
            onInput={handleInput}
            placeholder="Search something..."
          />
        </div>
      </div>

      <div class="py-4"></div>

      <div class="title">All Pods</div>
      <div class="grid gap-8 px-10 pt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {() => {
          const filtered = props.pods.filter((pod) =>
            pod.pod_name.includes(searchTerm())
          );
          if (filtered.length === 0) {
            return <div>No pods found</div>;
          }
          return filtered.map((pod: PodProps) => (
            <PodCard
              pod_name={pod.pod_name}
              pod_id={pod.pod_id}
              pod_type={pod.pod_type}
              is_elastic={pod.is_elastic}
              usage={pod.usage}
              total_nodes={pod.total_nodes}
            />
          ));
        }}
      </div>

      <div class="py-4"></div>

      <div class="title">All Job Nodes</div>
      <div class="grid gap-8 px-10 pt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {() => {
          const filtered = props.nodes
            .filter((node) => node.node_name.includes(searchTerm()))
            .filter((node: NodeProps) => node.node_type === "job");
          if (filtered.length === 0) {
            return <div>No job nodes found</div>;
          }
          return filtered.map((node: NodeProps) => (
            <NodeCard
              node_name={node.node_name}
              node_id={node.node_id}
              node_status={node.node_status}
              node_type={node.node_type}
              pod_data={node.pod_data}
            />
          ));
        }}
      </div>

      <div class="py-4"></div>

      <div class="title">All Server Nodes</div>
      <div class="grid gap-8 px-10 pt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {() => {
          const filtered = props.nodes
            .filter((node) => node.node_name.includes(searchTerm()))
            .filter((node: NodeProps) => node.node_type === "server");
          if (filtered.length === 0) {
            return <div>No server nodes found</div>;
          }
          return filtered.map((node: NodeProps) => (
            <NodeCard
              node_name={node.node_name}
              node_id={node.node_id}
              node_status={node.node_status}
              node_type={node.node_type}
              pod_data={node.pod_data}
            />
          ));
        }}
      </div>

      <div class="py-4"></div>

      <div class="title">All Jobs</div>
      <div class="grid gap-8 px-10 pt-4 4xl:grid-cols-2">
        {() => {
          const filtered = props.jobs.filter((job) =>
            job.job_name.includes(searchTerm())
          );
          if (filtered.length === 0) {
            return <div>No jobs found</div>;
          }
          return filtered.map((job: JobProps) => (
            <JobCard
              job_id={job.job_id}
              job_name={job.job_name}
              node_id={job.node_id}
              pod_id={job.pod_id}
              job_status={job.job_status}
            />
          ));
        }}
      </div>
      <div class="py-4"></div>
    </div>
  );
};

export default HomePage;
