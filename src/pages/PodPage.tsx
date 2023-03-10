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
  const { id } = useParams();
  const navigate = useNavigate();
  if (id === undefined) {
    return <div>Invalid Query</div>;
  }

  return (
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">Pod {id}</div>
      <div class="flex items-center">
        <img
          src={ArrowIcon}
          class="m-5 mx-9 h-10 w-10 rotate-180 rounded-xl hover:bg-blue-100 active:bg-blue-200"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div class="px-10 pt-3 font-Inter text-4xl font-semibold">All Nodes</div>
      <div class="grid gap-8 px-10 pt-4 xl:grid-cols-2">
        {props.nodes
          .filter((node: NodeProps) => node.pod.id.toString() === id)
          .map((node: NodeProps) => (
            <NodeCard
              name={node.name}
              id={node.id}
              status={node.status}
              pod={node.pod}
            />
          ))}
      </div>
      <div class="px-10 pt-10 font-Inter text-4xl font-semibold">All Jobs</div>

      <div class="grid grid-cols-1 gap-8 px-10 pt-4">
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
    </div>
  );
};

export default PodPage;
