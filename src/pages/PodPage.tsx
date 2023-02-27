import { useParams } from "@solidjs/router";
import { JobProps, NodeProps } from "../api/type";
import JobCard from "../components/JobCard";
import NodeCard from "../components/NodeCard";

type Props = {
  nodes: NodeProps[];
  jobs: JobProps[];
};

const PodPage = (props: Props) => {
  const { id } = useParams();
  if (id === undefined) {
    return <div>Invalid Query</div>;
  }

  return (
    <div class="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div class="pt-10 px-10 font-Inter text-5xl font-semibold">
        Pod {id}
      </div>
      <div class="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Nodes
      </div>
      <div class="pt-4 px-10 grid xl:grid-cols-2 gap-8">
        {props.nodes
          .filter((node: NodeProps) => node.pod.id.toString() === id)
          .map((node: NodeProps, i: number) => (
            <NodeCard
              name={node.name}
              id={node.id}
              status={node.status}
              pod={node.pod}
            />
          ))}
      </div>
      <div class="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Jobs
      </div>

      <div class="pt-4 px-10 grid grid-cols-1 gap-8">
        {props.jobs.map((job: JobProps, i: number) => (
          // TODO: Filter jobs by pod id
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

export default PodPage;
