import { useNavigate } from "@solidjs/router";
import { NodeProps } from "../api/type";
import ArrowIcon from "../assets/arrow.svg";
import NodeIcon from "../assets/node.svg";

export default function NodeCard({ name, id, status, pod }: NodeProps) {
  const navigate = useNavigate();
  return (
    <div class="card flex items-center justify-around py-2 px-2">
      <div>
        <img src={NodeIcon} class="m-2 h-10 w-9 justify-self-start" />
      </div>

      <span class="m-2 flex h-10 grow items-center justify-self-stretch font-Inter">
        <span class="p-3 text-xl font-semibold">{name}</span>
        <span class="text-md font-regular p-3">{id}</span>
        <span class="font-regular p-3 text-lg">Within {pod.name}</span>
        <span class="font-regular p-3 text-lg">
          {status === "idle" ? (
            <a class="font-medium text-green-500">Idle</a>
          ) : (
            <a class="font-medium text-orange-500">Running</a>
          )}
        </span>
      </span>

      <div>
        <img
          src={ArrowIcon}
          onClick={async () => {
            navigate("/node/" + id);
          }}
          class="m-2 h-10 w-10 justify-self-end rounded-xl hover:bg-blue-100 active:bg-blue-200"
        />
      </div>
    </div>
  );
}
