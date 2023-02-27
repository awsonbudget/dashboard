import { fetchJobLog, fetchNodeLog } from "../api/manager";
import { useParams, useNavigate } from "@solidjs/router";
import { createSignal } from "solid-js";

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

  const [log, setLog] = createSignal<string>("no log found");

  return (
    <div>
      <div class="p-3">LogPage</div>
      <button onClick={() => navigate("/")}>Back</button>
      <div
        class="p-3"
        onClick={() => {
          if (type === "node") {
            fetchNodeLog(id).then((log) => {
              setLog(log.data);
            });
          } else {
            fetchJobLog(id).then((log) => {
              setLog(log.data);
            });
          }
        }}
      >
        Refresh
      </div>
      <div class="p-3">
        {type} : {id}
      </div>
      <div class="p-3 whitespace-pre-wrap">{log}</div>
    </div>
  );
};

export default LogPage;
