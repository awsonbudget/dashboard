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
    color = "green";
  } else if (node_status === "running" || node_status === "paused") {
    color = "orange";
  } else if (node_status === "new") {
    color = "blue";
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
        {node_type === "job" ? (
          <img src={NodeIcon} class="m-2 h-9 w-9 justify-self-start" />
        ) : (
          <img src={ServerIcon} class="m-2 h-9 w-9 justify-self-start" />
        )}
      </div>

      <span class="m-2 flex h-10 grow items-center justify-self-stretch font-Inter">
        <span class="p-3 text-xl font-semibold">{node_name}</span>
        <span class="text-md font-regular p-3">{node_id}</span>
        <span class="font-regular p-3 text-lg">Within {pod_data.pod_name}</span>
        <span class={`p-3 text-lg font-medium text-${color}-500`}>
          {node_status}
        </span>
      </span>

      <div>
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
  );
}
