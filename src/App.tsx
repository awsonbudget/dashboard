import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PodPage from "./pages/PodPage";
import NodePage from "./pages/NodePage";
import LogPage from "./pages/LogPage";
import { socket } from "./api/manager";
import { JobProps, NodeProps, PodProps } from "./api/type";
import { useEffect, useState } from "react";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const [pods, setPods] = useState<PodProps[]>([]);
  const [nodes, setNodes] = useState<NodeProps[]>([]);
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);

  if (socket.readyState === 3) {
    // HAX
    window.location.reload();
  }

  useEffect(() => {
    socket.onopen = () => {
      console.log("socket onopen");
    };
    socket.onmessage = (event) => {
      console.log("socket onmessage");
      const incoming = JSON.parse(event.data);
      if (incoming.type === "job") {
        setInitialized(true);
        const jobs: JobProps[] = incoming.data;
        setJobs(jobs);
      } else if (incoming.type === "node") {
        setInitialized(true);
        const nodes: NodeProps[] = incoming.data;
        setNodes(nodes);
      } else if (incoming.type === "pod") {
        setInitialized(true);
        const pods: PodProps[] = incoming.data;
        setPods(pods);
      } else if (incoming.type === "error") {
        setInitialized(false);
      }
    };
    socket.onclose = () => {
      console.log("socket onclose");
    };

    return () => {
      if (socket.readyState === 1) {
        console.log("socket close");
        socket.close();
      }
    };
  }, []);

  if (!initialized) {
    return <LoadingPage delay={5} />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage pods={pods} nodes={nodes} jobs={jobs} />}
      />
      <Route path="/pod/:id" element={<PodPage nodes={nodes} jobs={jobs} />} />
      <Route path="/node/:id" element={<NodePage jobs={jobs} />} />
      <Route path="/:type/:id/log" element={<LogPage />} />
    </Routes>
  );
}

export default App;
