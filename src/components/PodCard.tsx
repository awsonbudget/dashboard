import { useNavigate } from "@solidjs/router";
import { PodProps } from "../api/type";
import PodIcon from "../assets/pod.svg";
import ArrowIcon from "../assets/arrow.svg";

export default function PodCard({ name, id, nodes }: PodProps) {
  const navigate = useNavigate();
  return (
    <div class="card flex items-center justify-around py-2 px-2">
      <div>
        <img src={PodIcon} class="m-2 h-10 w-9 justify-self-start" />
      </div>

      <div class="m-2 flex h-10 grow items-center justify-self-stretch font-Inter">
        <span class="p-3 text-xl font-semibold">{name}</span>
        <span class="text-md font-regular p-3">{id}</span>
        <span class="font-regular p-3 text-lg">
          {nodes} {nodes > 1 ? "nodes" : "node"} online
        </span>
      </div>

      <div>
        <img
          src={ArrowIcon}
          onClick={async () => {
            navigate("/pod/" + id);
          }}
          class="m-2 h-10 w-10 justify-self-end rounded-xl hover:bg-blue-100 active:bg-blue-200"
        />
      </div>
    </div>
  );
}
