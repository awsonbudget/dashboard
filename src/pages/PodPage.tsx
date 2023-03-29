import { useParams, useNavigate } from "@solidjs/router";
import { JobProps, NodeProps } from "../api/type";
import JobCard from "../components/JobCard";
import NodeCard from "../components/NodeCard";
import ArrowIcon from "../assets/arrow.svg";
import CPUIcon from "../assets/cpu.svg";
import MemoryIcon from "../assets/memory.svg";
import IOIcon from "../assets/io.svg";

type Props = {
  nodes: NodeProps[];
  jobs: JobProps[];
};

const PodPage = (props: Props) => {
  const { pod_id } = useParams();
  const navigate = useNavigate();
  if (pod_id === undefined) {
    return <div>Invalid Query</div>;
  }

  return (
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">
        Pod {pod_id}
      </div>
      <div class="flex items-center">
        <img
          src={ArrowIcon}
          class="type=button type=button delay-50 m-5 mx-9 h-10 w-10 rotate-180 cursor-pointer 
          rounded-xl transition
            ease-in-out hover:scale-110 hover:bg-blue-100 active:bg-blue-200"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div class="px-10 pt-3 font-Inter text-4xl font-semibold">All Nodes</div>
      <div class="grid gap-8 px-10 pt-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6">
        {props.nodes
          .filter(
            (node: NodeProps) => node.pod_data.pod_id.toString() === pod_id
          )
          .map((node: NodeProps) => (
            <NodeCard
              node_name={node.node_name}
              node_id={node.node_id}
              node_type={node.node_type}
              node_status={node.node_status}
              pod_data={node.pod_data}
            />
          ))}
      </div>
      <div class="px-10 pt-10 font-Inter text-4xl font-semibold">All Jobs</div>
      <div class="grid gap-8 px-10 pt-4 4xl:grid-cols-2">
        {props.jobs.map((job: JobProps) => (
          // TODO: Filter jobs by pod id
          <JobCard
            id={job.id}
            name={job.name}
            node={job.node}
            status={job.status}
          />
        ))}
      </div>
      <div class="py-4" />

      <div class="flex gap-8 px-10 pt-12">
        <div
          class="card p-10 font-Inter
                transition duration-250 ease-in-out hover:bg-blue-50"
        >
          <h2 class="mb-4 text-3xl font-semibold text-gray-800">Pod Status</h2>

          <h2 class="mb-4 text-2xl font-semibold text-gray-800">
            {"Pod " + pod_id}
          </h2>

          <div class="mb-6 flex justify-between">
            <div class="flex items-center">
              <img src={CPUIcon} class="mr-3 h-7 w-7 hover:animate-pulse" />
              <span class="pr-20 text-xl font-medium text-black">
                CPU Usage
              </span>
            </div>
            <span class="text-xl font-medium text-black">%</span>
          </div>
          <div class="mb-6 flex justify-between">
            <div class="flex items-center">
              <img src={MemoryIcon} class="mr-3 h-7 w-7 hover:animate-pulse" />
              <span class="pr-20 text-xl font-medium text-black">
                Memory Usage
              </span>
            </div>
            <span class="text-xl font-medium text-black">B</span>
          </div>
          <div class="mb-6 flex justify-between">
            <div class="flex items-center">
              <img
                src={IOIcon}
                class="mr-3 h-7 w-7 rotate-180 hover:animate-pulse"
              />
              <span class="pr-20 text-xl font-medium text-black">
                Network In
              </span>
            </div>
            <span class="text-xl font-medium text-black">B</span>
          </div>
          <div class="flex justify-between">
            <div class="flex items-center">
              <img src={IOIcon} class="mr-3 h-7 w-7 hover:animate-pulse" />
              <span class="pr-20 text-xl font-medium text-black">
                Network Out
              </span>
            </div>
            <span class="text-xl font-medium text-black">B</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PodPage;
