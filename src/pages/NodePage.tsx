import { useParams, useNavigate } from "@solidjs/router";
import { JobProps, StatsProps } from "../api/type";
import JobCard from "../components/JobCard";
import ArrowIcon from "../assets/arrow.svg";
import PrintLogIcon from "../assets/printlog.svg";
import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { fetchStats } from "../api/manager";

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
          class="m-5 mx-9 h-10 w-10 rotate-180 rounded-xl hover:bg-blue-100 active:bg-blue-200"
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
              class="m-2 h-10 w-40"
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

          <div class="grid grid-cols-1 gap-8 px-10 pt-4">
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
            <div class="grid grid-cols-1 gap-8 px-10 pt-4">
              <div class="w-1/2 rounded-md bg-white p-8 px-10 shadow-md lg:w-1/3">
                <h2 class="mb-4 text-xl font-medium text-gray-800">
                  {!loaded() ? "Loading" : "Server " + node_id}
                </h2>
                <div class="mb-6 flex justify-between">
                  <div class="flex items-center">
                    <div class="mr-3 h-4 w-4 rounded-full bg-green-500"></div>
                    <span class="text-lg font-medium text-gray-800">
                      CPU Usage
                    </span>
                  </div>
                  <span class="text-lg font-medium text-gray-800">
                    {Number(stat()?.cpu_usage.toFixed(4))}%
                  </span>
                </div>
                <div class="mb-6 flex justify-between">
                  <div class="flex items-center">
                    <div class="mr-3 h-4 w-4 rounded-full bg-blue-500"></div>
                    <span class="text-lg font-medium text-gray-800">
                      Memory Usage
                    </span>
                  </div>
                  <span class="text-lg font-medium text-gray-800">
                    {stat()?.mem_usage} B
                  </span>
                </div>
                <div class="mb-6 flex justify-between">
                  <div class="flex items-center">
                    <div class="mr-3 h-4 w-4 rounded-full bg-yellow-500"></div>
                    <span class="text-lg font-medium text-gray-800">
                      Network In
                    </span>
                  </div>
                  <span class="text-lg font-medium text-gray-800">
                    {stat()?.network_in} B
                  </span>
                </div>
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <div class="mr-3 h-4 w-4 rounded-full bg-purple-500"></div>
                    <span class="text-lg font-medium text-gray-800">
                      Network Out
                    </span>
                  </div>
                  <span class="text-lg font-medium text-gray-800">
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
