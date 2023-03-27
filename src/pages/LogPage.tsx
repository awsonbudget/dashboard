import { useParams, useNavigate } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { fetchJobLog, fetchNodeLog } from "../api/manager";
import RefreshIcon from "../assets/refresh.svg";
import ArrowIcon from "../assets/arrow.svg";

const LogPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  if (
    type === undefined ||
    (type !== "node" && type !== "job") ||
    id === undefined
  ) {
    return <div>Invalid Query</div>;
  }
  const getLog = () => {
    if (type === "node") {
      fetchNodeLog(id).then((res) => {
        setLog(res.data);
      });
    } else if (type === "job") {
      fetchJobLog(id).then((res) => {
        setLog(res.data);
      });
    }
  };
  onMount(() => {
    getLog();
  });

  const [log, setLog] = createSignal<string>();
  window.onfocus = () => {
    getLog();
  };

  return (
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">Logs</div>

      <div class="flex items-center">
        <img
          src={ArrowIcon}
          class="type=button m-5 mx-9 h-10 w-10 rotate-180 cursor-pointer rounded-xl hover:animate-pulse hover:bg-blue-100 active:bg-blue-200"
          onClick={() => {
            navigate("/");
          }}
        />

        <img
          src={RefreshIcon}
          class="type=button h-10 w-10 cursor-pointer rounded-xl hover:animate-pulse hover:bg-blue-100 active:bg-blue-200"
          onClick={() => {
            getLog();
          }}
        ></img>
      </div>

      <div class="p-3 px-10 font-Inter text-xl font-medium">
        Log of {type} : {id}
      </div>

      <div class="card mx-10 my-5 flex">
        <div class="text-md whitespace-pre-wrap p-12 font-Inter">{log}</div>
      </div>
      <div class="py-4" />
    </div>
  );
};

export default LogPage;
