import { useParams } from "react-router-dom";
import { JobProps } from "../api/type";
import JobCard from "../components/JobCard";

type Props = {
  jobs: JobProps[];
};

const NodePage = (props: Props) => {
  const { id } = useParams();
  if (id === undefined) {
    return <div>Invalid Query</div>;
  }

  return (
    // TODO: add a print log button
    <div className="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div className="pt-10 px-10 font-Inter text-5xl font-semibold">
        Node {id}
      </div>
      <div className="pt-10 px-10 font-Inter text-4xl font-semibold">
        All Jobs
      </div>

      <div className="pt-4 px-10 grid grid-cols-1 gap-8">
        {props.jobs.map((job: JobProps, i: number) => (
          // TODO: filter jobs by node id
          <JobCard
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

export default NodePage;
