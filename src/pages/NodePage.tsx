import { useParams, useNavigate } from "@solidjs/router";
import { JobProps } from "../api/type";
import JobCard from "../components/JobCard";
import ArrowIcon from "../assets/arrow.svg";
import PrintLogIcon from "../assets/printlog.svg";

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
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">Node {id}</div>
      <div class="flex items-center">
        <img
          src={ArrowIcon}
          class="m-5 mx-9 h-10 w-10 rotate-180 rounded-xl hover:bg-blue-100 active:bg-blue-200"
          onClick={() => {
            navigate("/");
          }}
        />

        <div>
          <img
            src={PrintLogIcon}
            onClick={() => {
              navigate("/node/" + id + "/log");
            }}
            class="m-2 h-10 w-40"
          />
        </div>
      </div>

      <div class="px-10 pt-3 font-Inter text-4xl font-semibold">All Jobs</div>

      <div class="grid grid-cols-1 gap-8 px-10 pt-4">
        {props.jobs.map((job: JobProps) => (
          // TODO: filter jobs by node id
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

export default NodePage;
