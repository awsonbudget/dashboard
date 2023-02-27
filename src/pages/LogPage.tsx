import { fetchJobLog, fetchNodeLog } from "../api/manager";
import { useParams, useNavigate } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import RefreshIcon from "../assets/refresh.svg";
import ArrowIcon from "../assets/arrow.svg";

type Props = {};

const LogPage = (props: Props) => {
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
    <div class="bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen">
      <div class="pt-10 px-10 font-Inter text-4xl font-semibold">Job log</div>

      <div class="flex items-center">
        <img
          src={ArrowIcon}
          class="h-10 w-10 mx-9 m-3 rotate-180 hover:bg-blue-100 rounded-xl"
          onClick={() => {
            navigate("/");
          }}
        />

        <img
          src={RefreshIcon}
          class="h-10 w-10 hover:bg-blue-100 rounded-xl"
          onClick={() => {
            getLog();
          }}
        ></img>
      </div>

      <div class="px-10 p-3 font-Inter text-lg font-medium">
        {type} : {id}
      </div>

      <div class="flex card mx-10">
        <div class="p-12 font-Inter text-md whitespace-pre-wrap">{log}</div>
      </div>
      <div class="py-4" />
    </div>
  );
};

export default LogPage;
