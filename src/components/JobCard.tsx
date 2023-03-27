import { useNavigate } from "@solidjs/router";
import { JobProps } from "../api/type";
import JobIcon from "../assets/job.svg";
import PrintLogIcon from "../assets/printlog.svg";

export default function JobCard({ name, id, node, status }: JobProps) {
  const navigate = useNavigate();

  let color: string;
  if (status === "registered") {
    color = "blue";
  } else if (status === "running") {
    color = "orange";
  } else if (status === "completed") {
    color = "green";
  } else if (status === "aborted") {
    color = "red";
  } else {
    // this should never happen!
    console.log("something went wrong with node status");
    color = "gray";
  }

  return (
    <div
      class="card flex items-center justify-around py-2 px-2
        transition duration-275 ease-in-out hover:bg-blue-50"
    >
      <div>
        <img src={JobIcon} class="m-2 h-12 w-12 justify-self-start" />
      </div>
      <span class="m-2 flex h-10 grow items-center justify-self-stretch font-Inter">
        <span class="p-3 text-xl font-semibold">{name}</span>
        <span class="text-md font-regular p-3">{id}</span>
        {node === null ? (
          <span class="font-regular text-md p-3">No node assigned</span>
        ) : (
          <span class="font-regular text-md p-3">Under {node}</span>
        )}
        <span class="font-regular text-md p-3">
          <a class={`font-medium text-${color}-500`}>registered</a>
        </span>
      </span>
      <div>
        <img
          src={PrintLogIcon}
          onClick={() => {
            navigate("/job/" + id + "/log");
          }}
          class="type=button delay-50 m-2 h-10 w-40 cursor-pointer
            justify-self-end transition ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
}
