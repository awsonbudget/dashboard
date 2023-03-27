import { useNavigate } from "@solidjs/router";
import { PodProps } from "../api/type";
import PodIcon from "../assets/pod.svg";
import ArrowIcon from "../assets/arrow.svg";

export default function PodCard({
  pod_name,
  pod_id,
  pod_type,
  total_nodes,
}: PodProps) {
  const navigate = useNavigate();
  return (
    <div class="card flex items-center rounded-lg border p-4 transition duration-275 ease-in-out hover:bg-blue-50">
      <div class="mr-4">
        <img src={PodIcon} class="h-12 w-12 justify-self-start" />
      </div>
      <div class="flex-grow">
        <div class="text-xl font-bold text-gray-800">{pod_name}</div>
        <div class="py-0.5"></div>
        <div class="text-md text-gray-600">{pod_id}</div>
        <div class="py-0.5"></div>
        <div class="text-md text-gray-600">type: {pod_type}</div>
        <div class="py-0.5"></div>
        <div class="text-md text-gray-600">{total_nodes} online</div>
      </div>
      <div>
        <div class="inline-flex items-center rounded-lg text-white focus:outline-none">
          <img
            src={ArrowIcon}
            onClick={async () => {
              navigate("/pod/" + pod_id);
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
