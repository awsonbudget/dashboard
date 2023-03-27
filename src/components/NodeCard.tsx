import { useNavigate } from "@solidjs/router";
import { NodeProps } from "../api/type";
import ArrowIcon from "../assets/arrow.svg";
import ServerIcon from "../assets/server.svg";
import NodeIcon from "../assets/node.svg";

export default function NodeCard({
  node_name,
  node_id,
  node_type,
  node_status,
  pod_data,
}: NodeProps) {
  const navigate = useNavigate();

  let color: string;
  if (node_status === "idle" || node_status === "online") {
    color = "text-green-500";
  } else if (node_status === "running" || node_status === "paused") {
    color = "text-orange-500";
  } else if (node_status === "new") {
    color = "text-blue-500";
  } else {
    // this should never happen!
    console.log("something went wrong with node status");
    color = "text-gray-500";
  }

  return (
    <div class="card flex items-center rounded-lg border p-4 transition duration-275 ease-in-out hover:bg-blue-50">
      <div class="mr-4">
        {node_type === "job" ? (
          <img src={NodeIcon} class="h-12 w-12 justify-self-start" />
        ) : (
          <img src={ServerIcon} class="h-12 w-12 justify-self-start" />
        )}
      </div>
      <div class="flex-grow">
        <div class="text-xl font-bold text-gray-800">{node_name}</div>
        <div class="py-0.5"></div>
        <div
          class="text-md inline-block cursor-pointer rounded text-gray-600 hover:bg-slate-200"
          onClick={async () => {
            navigator.clipboard.writeText(node_id);
          }}
        >
          {node_id}
        </div>
        <div class="py-0.5"></div>
        <div class="text-md text-gray-600">Within: {pod_data.pod_name}</div>
        <div class="py-0.5"></div>
        <div class={`text-md ${color}`}>{node_status}</div>
      </div>
      <div>
        <div class="inline-flex items-center rounded-lg text-white focus:outline-none">
          <img
            src={ArrowIcon}
            onClick={async () => {
              navigate(
                "/pod/" + pod_data.pod_id + "/node/" + node_type + "/" + node_id
              );
            }}
            class="type=button delay-50 m-2 h-10 w-10 cursor-pointer
           justify-self-end rounded-xl transition
           ease-in-out hover:scale-110 hover:bg-blue-100 active:bg-blue-200"
          />
        </div>
      </div>
    </div>
  );
}
