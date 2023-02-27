import { useParams, useNavigate } from "@solidjs/router";
import { JobProps } from "../api/type";
import JobCard from "../components/JobCard";
import ArrowIcon from "../assets/arrow.svg";

type Props = {
  jobs: JobProps[];
};

const NodePage = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (id === undefined) {
    return <div>Invalid Query</div>;
  }

  return (
    // TODO: add a print log button
    <div class="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div class="pt-10 px-10 font-Inter text-5xl font-semibold">Node {id}</div>
      <div class="flex items-center">
        <img
          src={ArrowIcon}
          class="h-10 w-10 mx-9 m-3 rotate-180 hover:bg-blue-100 rounded-xl"
          onClick={async () => {
            navigate("/");
          }}
        />
      </div>

      <div class="pt-3 px-10 font-Inter text-4xl font-semibold">All Jobs</div>

      <div class="pt-4 px-10 grid grid-cols-1 gap-8">
        {props.jobs.map((job: JobProps, i: number) => (
          // TODO: filter jobs by node id
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

export default NodePage;
