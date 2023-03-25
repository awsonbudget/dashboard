import { useNavigate } from "@solidjs/router";
import { JobProps } from "../api/type";
import JobIcon from "../assets/job.svg";
import PrintLogIcon from "../assets/printlog.svg";

export default function JobCard({ name, id, node, status }: JobProps) {
  const navigate = useNavigate();
  return (
    <div class="card flex items-center justify-around py-2 px-2">
      <div>
        <img src={JobIcon} class="m-2 h-10 w-9 justify-self-start" />
      </div>

      <span class="m-2 flex h-10 grow items-center justify-self-stretch font-Inter">
        <span class="p-3 text-xl font-semibold">{name}</span>
        <span class="text-md font-regular p-3">{id}</span>
        {node === null ? (
          <span class="font-regular p-3 text-lg">No node assigned</span>
        ) : (
          <span class="font-regular p-3 text-lg">Under {node}</span>
        )}
        <span class="font-regular p-3 text-lg">
          {() => {
            if (status === "registered") {
              return <a class="font-medium text-blue-500">registered</a>;
            } else if (status === "running") {
              return <a class="font-medium text-orange-500">running</a>;
            } else if (status === "completed") {
              return <a class="font-medium text-green-500">completed</a>;
            } else {
              return <a class="font-medium text-red-500">aborted</a>;
            }
          }}
        </span>
      </span>

      <div>
        <img
          src={PrintLogIcon}
          onClick={() => {
            navigate("/job/" + id + "/log");
          }}
          class="type=button m-2 h-10 w-40 cursor-pointer justify-self-end"
        />
      </div>
    </div>
  );
}
