import { useParams, useNavigate } from "@solidjs/router";
import { JobProps, StatsProps } from "../api/type";
import JobCard from "../components/JobCard";
import ArrowIcon from "../assets/arrow.svg";
import PrintLogIcon from "../assets/printlog.svg";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { fetchStats } from "../api/manager";
import CPUIcon from "../assets/cpu.svg";
import MemoryIcon from "../assets/memory.svg";
import IOIcon from "../assets/io.svg";

type Props = {
  jobs: JobProps[];
};

const NodePage = (props: Props) => {
  const navigate = useNavigate();
  const { pod_id, node_id, node_type } = useParams();
  if (node_id === undefined || pod_id === undefined) {
    return <div>Invalid Query</div>;
  }

  return (
    // TODO: add a print log button
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">
        Node {node_id}
      </div>
      <div class="flex items-center">
        <img
          src={ArrowIcon}
          class="type=button type=button delay-50 m-5 mx-9 h-10 w-10 rotate-180 cursor-pointer 
          rounded-xl transition
            ease-in-out hover:scale-110 hover:bg-blue-100 active:bg-blue-200"
          onClick={() => {
            navigate("/");
          }}
        />
        {node_type === "job" ? (
          <div>
            <img
              src={PrintLogIcon}
              onClick={() => {
                navigate("/node/" + node_id + "/log");
              }}
              class="type=button delay-50 m-2 h-10 w-40 
                cursor-pointer transition ease-in-out hover:scale-105"
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {node_type === "job" ? (
        <div>
          <div class="px-10 pt-3 font-Inter text-4xl font-semibold">
            All Jobs
          </div>
          <div class="grid gap-8 px-10 pt-4 4xl:grid-cols-2">
            {props.jobs.map((job: JobProps) => (
              // TODO: filter jobs by node id
              <JobCard
                id={job.id}
                name={job.name}
                node={job.node}
                status={job.status}
              />
            ))}
          </div>
        </div>
      ) : (
        () => {
          const [stat, setStat] = createSignal<StatsProps | null>(null);
          const [loaded, setLoaded] = createSignal(false);
          createEffect(async () => {
            const interval = setInterval(async () => {
              const resp = await fetchStats(pod_id, node_id);
              setStat(resp);
              setLoaded(true);
            }, 2000);
            onCleanup(() => clearInterval(interval));
          });

          if (stat === null) {
            return <div></div>;
          }
          return (
            <div class="flex gap-8 px-10 pt-4">
              <div
                class="card p-10 font-Inter
                transition duration-250 ease-in-out hover:bg-blue-50"
              >
                <h2 class="mb-4 text-3xl font-semibold text-gray-800">
                  Status
                </h2>

                <h2 class="mb-4 text-2xl font-semibold text-gray-800">
                  {!loaded() ? "Loading" : "Server " + node_id}
                </h2>
                <div class="mb-6 flex justify-between">
                  <div class="flex items-center">
                    <img
                      src={CPUIcon}
                      class="mr-3 h-7 w-7 hover:animate-pulse"
                    />
                    <span class="pr-20 text-xl font-medium text-black">
                      CPU Usage
                    </span>
                  </div>
                  <span class="text-xl font-medium text-black">
                    {Number(stat()?.cpu_usage.toFixed(4))}%
                  </span>
                </div>
                <div class="mb-6 flex justify-between">
                  <div class="flex items-center">
                    <img
                      src={MemoryIcon}
                      class="mr-3 h-7 w-7 hover:animate-pulse"
                    />
                    <span class="pr-20 text-xl font-medium text-black">
                      Memory Usage
                    </span>
                  </div>
                  <span class="text-xl font-medium text-black">
                    {stat()?.mem_usage} B
                  </span>
                </div>
                <div class="mb-6 flex justify-between">
                  <div class="flex items-center">
                    <img
                      src={IOIcon}
                      class="mr-3 h-7 w-7 rotate-180 hover:animate-pulse"
                    />
                    <span class="pr-20 text-xl font-medium text-black">
                      Network In
                    </span>
                  </div>
                  <span class="text-xl font-medium text-black">
                    {stat()?.network_in} B
                  </span>
                </div>
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <img
                      src={IOIcon}
                      class="mr-3 h-7 w-7 hover:animate-pulse"
                    />
                    <span class="pr-20 text-xl font-medium text-black">
                      Network Out
                    </span>
                  </div>
                  <span class="text-xl font-medium text-black">
                    {stat()?.network_out} B
                  </span>
                </div>
              </div>
            </div>
          );
        }
      )}

      <div class="py-4" />
    </div>
  );
};

export default NodePage;
