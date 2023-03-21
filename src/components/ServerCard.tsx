import { useNavigate } from "@solidjs/router";
import { JobProps } from "../api/type";
import ServerIcon from "../assets/server.svg";
import ArrowIcon from "../assets/arrow.svg";

export default function ServerCard({ name, id, node, status }: JobProps) {
  const navigate = useNavigate();
  return (
    <div class="card flex items-center justify-around py-2 px-2">
      <div>
        <img src={ServerIcon} class="m-2 h-10 w-9 justify-self-start" />
      </div>
      <span class="m-2 flex h-10 grow items-center justify-self-stretch font-Inter">
        <span class="p-3 text-xl font-semibold">Server 1</span>
        <span class="text-md font-regular p-3">ID - b95a843v93</span>
      </span>

      <div>
        <img
          src={ArrowIcon}
          onClick={async () => {
            navigate("/");
          }}
          class="m-2 h-10 w-10 justify-self-end rounded-xl hover:bg-blue-100 active:bg-blue-200"
        />
      </div>
    </div>
  );
}
