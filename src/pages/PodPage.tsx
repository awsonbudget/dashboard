import { useParams, useNavigate } from "@solidjs/router";
import { JobProps, NodeProps } from "../api/type";
import JobCard from "../components/JobCard";
import NodeCard from "../components/NodeCard";
import ArrowIcon from "../assets/arrow.svg";

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
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 dark:bg-gradient-to-r dark:from-gray-700 dark:via-gray-900 dark:to-black dark:text-white">
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
        {props.jobs
          .filter((job: JobProps) => {
            return job.pod_id === pod_id;
          })
          .map((job: JobProps) => (
            <JobCard
              job_id={job.job_id}
              job_name={job.job_name}
              node_id={job.node_id}
              pod_id={job.pod_id}
              job_status={job.job_status}
            />
          ))}
      </div>
      <div class="py-4" />
    </div>
  );
};

export default PodPage;
