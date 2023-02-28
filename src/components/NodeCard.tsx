import { useNavigate } from "@solidjs/router";
import { NodeProps } from "../api/type";
import ArrowIcon from "../assets/arrow.svg";
import NodeIcon from "../assets/node.svg";

export default function NodeCard({ name, id, status, pod }: NodeProps) {
  const navigate = useNavigate();
  return (
    <div class="flex card py-2 px-2 justify-around items-center">
      <div>
        <img src={NodeIcon} class="h-10 w-9 m-2 justify-self-start" />
      </div>

      <span class="grow h-10 m-2 justify-self-stretch font-Inter flex items-center">
        <span class="p-3 text-xl font-semibold">{name}</span>
        <span class="p-3 text-md font-regular">{id}</span>
        <span class="p-3 text-lg font-regular">Within {pod.name}</span>
        <span class="p-3 text-lg font-regular">
          {status === "idle" ? (
            <a class="text-green-500 font-medium">Idle</a>
          ) : (
            <a class="text-orange-500 font-medium">Running</a>
          )}
        </span>
      </span>

      <div>
        <img
          src={ArrowIcon}
          onClick={async () => {
            navigate("/node/" + id);
          }}
          class="h-10 w-10 m-2 justify-self-end hover:bg-blue-100 active:bg-blue-200 rounded-xl"
        />
      </div>
    </div>
  );
}
