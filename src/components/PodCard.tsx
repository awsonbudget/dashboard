import { useNavigate } from "@solidjs/router";
import { PodProps } from "../api/type";
import PodIcon from "../assets/pod.svg";
import ArrowIcon from "../assets/arrow.svg";
import { createEffect, onCleanup } from "solid-js";
import { refreshPod } from "../api/manager";

export default function PodCard({
  pod_name,
  pod_id,
  pod_type,
  is_elastic,
  usage,
  total_nodes,
}: PodProps) {
  const navigate = useNavigate();
  createEffect(async () => {
    const interval = setInterval(async () => {
      await refreshPod();
    }, 2000);
    onCleanup(() => clearInterval(interval));
  });

  return (
    <div class="card flex items-center rounded-lg border p-4 transition duration-250 ease-in-out hover:bg-blue-50">
      <div class="mr-4 p-1">
        <img src={PodIcon} class="h-12 w-12 justify-self-start" />
      </div>
      <div class="flex-grow font-Inter">
        <div class="text-xl font-bold text-gray-800">{pod_name}</div>
        <div class="py-0.5"></div>
        <div
          class="text-md inline-block cursor-pointer rounded text-gray-600 hover:bg-slate-200"
          onClick={async () => {
            navigator.clipboard.writeText(pod_id);
          }}
        >
          {pod_id}
        </div>
        <div class="py-0.5"></div>
        <div class="text-md text-gray-600">type: {pod_type}</div>
        <div class="py-0.5"></div>
        <div class="text-md text-gray-600">{total_nodes} online </div>
        <div class="py-0.5"></div>
        <div class="text-md text-gray-600">
          elastic: {is_elastic ? "on" : "off"} - {Number(usage.toFixed(2))}%
        </div>
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
