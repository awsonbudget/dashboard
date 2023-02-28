import { useNavigate } from "@solidjs/router";
import { JobProps } from "../api/type";
import JobIcon from "../assets/job.svg";
import PrintLogIcon from "../assets/printlog.svg";

export default function JobCard({ name, id, node, status }: JobProps) {
  const navigate = useNavigate();
  return (
    <div class="flex card py-2 px-2 justify-around items-center">
      <div>
        <img src={JobIcon} class="h-10 w-9 ml-2" />
      </div>

      <span class="grow h-10 m-2 justify-self-stretch font-Inter flex items-center">
        <span class="p-3 text-xl font-semibold">{name}</span>
        <span class="p-3 text-md font-regular">{id}</span>
        {node === null ? (
          <span class="p-3 text-lg font-regular">No node assigned</span>
        ) : (
          <span class="p-3 text-lg font-regular">Under {node}</span>
        )}
        <span class="p-3 text-lg font-regular">
          {() => {
            if (status === "registered") {
              return <a class="text-blue-500 font-medium">Registered</a>;
            } else if (status === "running") {
              return <a class="text-orange-500 font-medium">Running</a>;
            } else if (status === "completed") {
              return <a class="text-green-500 font-medium">Completed</a>;
            } else {
              return <a class="text-red-500 font-medium">Aborted</a>;
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
          class="h-10 w-40 m-2 justify-self-end"
        />
      </div>
    </div>
  );
}
