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
          onMount(async () => {
            const resp = await fetchStats(pod_id, node_id);
            setStat(resp);
            console.log(stat());
          });

          createEffect(async () => {
            const interval = setInterval(async () => {
              const resp = await fetchStats(pod_id, node_id);
              setStat(resp);
            }, 1000);
            onCleanup(() => clearInterval(interval));
          });

          if (stat === null) {
            return <div></div>;
          }
          return (
            <div>
              <div class="card mx-10 my-5 flex">
                <div class="text-md whitespace-pre-wrap p-12 font-Inter">
                  <span class="m-2 items-center font-Inter">
                    <span class="block p-2 text-xl font-semibold">
                      Server {node_id}
                    </span>
                    <span class="font-regular block p-2 text-lg">
                      CPU Usage - {stat()?.cpu_usage}%
                    </span>
                    <span class="font-regular block p-2 text-lg">
                      Memory Usage - {stat()?.mem_usage} Bytes
                    </span>
                    <span class="font-regular block p-2 text-lg">
                      Network In - {stat()?.network_in} Bytes
                    </span>
                    <span class="font-regular block p-2 text-lg">
                      Network Out - {stat()?.network_out} Bytes
                    </span>
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
