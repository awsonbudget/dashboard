import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PodPage from "./pages/PodPage";
import NodePage from "./pages/NodePage";
import LogPage from "./pages/LogPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pod/:id" element={<PodPage />} />
      <Route path="/node/:id" element={<NodePage />} />
      <Route path="/:type/:id/log" element={<LogPage />} />
    </Routes>
  );
}

export default App;
