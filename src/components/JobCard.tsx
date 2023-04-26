import { useNavigate } from "@solidjs/router";
import { JobProps } from "../api/type";
import JobIcon from "../assets/job.svg";
import PrintLogIcon from "../assets/printlog.svg";

export default function JobCard({
  job_name,
  job_id,
  node_id,
  pod_id,
  job_status,
}: JobProps) {
  const navigate = useNavigate();

  let color: string;
  if (job_status === "registered") {
    color = "text-blue-500";
  } else if (job_status === "running") {
    color = "text-orange-500";
  } else if (job_status === "completed") {
    color = "text-green-500";
  } else if (job_status === "aborted") {
    color = "text-red-500";
  } else {
    // this should never happen!
    console.log("something went wrong with node status");
    color = "text-gray-500";
  }

  return (
    <div
      class="card flex items-center justify-around px-2 py-2
        transition duration-250 ease-in-out hover:bg-blue-50"
    >
      <div>
        <img src={JobIcon} class="m-2 h-10 w-10 justify-self-start" />
      </div>
      <span class="m-2 flex h-10 grow items-center justify-self-stretch font-Inter">
        <span class="p-3 text-xl font-semibold text-gray-800">{job_name}</span>
        <span
          class="text-md font-regular cursor-pointer rounded px-3 text-gray-600 hover:bg-slate-200"
          onClick={async () => {
            await navigator.clipboard.writeText(job_id);
          }}
        >
          {job_id}
        </span>
        {node_id === null ? (
          <span class="font-regular text-md p-3 text-gray-600">
            No node assigned
          </span>
        ) : (
          <span class="font-regular text-md p-3 text-gray-600">
            Under {node_id}
          </span>
        )}
        <span class="font-regular text-md p-3 text-gray-600">
          <a class={`font-regular ${color}`}>{job_status}</a>
        </span>
      </span>
      <div>
        <img
          src={PrintLogIcon}
          onClick={() => {
            navigate("/job/" + job_id + "/log");
          }}
          class="type=button delay-50 m-2 h-10 w-40 cursor-pointer
            justify-self-end transition ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
}
