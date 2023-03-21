import createWebsocket from "@solid-primitives/websocket";
import { createSignal } from "solid-js";
import { Route, Router, Routes } from "@solidjs/router";
import HomePage from "./pages/HomePage";
import PodPage from "./pages/PodPage";
import NodePage from "./pages/NodePage";
import LogPage from "./pages/LogPage";
import { JobProps, NodeProps, PodProps } from "./api/type";
import LoadingPage from "./pages/LoadingPage";
import { ws } from "./api/manager";

export const [pods, setPods] = createSignal<PodProps[]>([]);
export const [nodes, setNodes] = createSignal<NodeProps[]>([]);
export const [jobs, setJobs] = createSignal<JobProps[]>([]);

function App() {
  const [initialized, setInitialized] = createSignal<boolean>(false);
  const [connect, disconnect, send, state] = createWebsocket(
    ws,
    (msg) => {
      const incoming = JSON.parse(msg.data);
      if (incoming.type === "job") {
        setInitialized(true);
        const jobs: JobProps[] = incoming.data;
        // console.log(jobs);
        setJobs(jobs);
      } else if (incoming.type === "node") {
        setInitialized(true);
        const nodes: NodeProps[] = incoming.data;
        // console.log(nodes);
        setNodes(nodes);
      } else if (incoming.type === "pod") {
        setInitialized(true);
        const pods: PodProps[] = incoming.data;
        // console.log(pods);
        setPods(pods);
      } else if (incoming.type === "error") {
        setInitialized(false);
      }
    },
    (err) => console.log(err)
  );

  window.onload = () => {
    connect();
  };

  // console.log(initialized());
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            initialized() ? (
              <HomePage pods={pods()} nodes={nodes()} jobs={jobs()} />
            ) : (
              <LoadingPage delay={5000} />
            )
          }
        />
        <Route
          path="/pod/:pod_id"
          element={<PodPage nodes={nodes()} jobs={jobs()} />}
        />
        <Route
          path="/pod/:pod_id/node/:node_type/:node_id"
          element={<NodePage jobs={jobs()} />}
        />
        <Route path="/:type/:id/log" element={<LogPage />} />
      </Routes>
    </Router>
  );
}

export default App;
