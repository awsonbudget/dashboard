import axios from "axios";
import { JobProps, LogProps, NodeProps, PodProps, StatsProps } from "./type";

const addr = import.meta.env.VITE_MANAGER;
const manager = (import.meta.env.PROD ? "https://" : "http://") + addr;
export const ws =
  (import.meta.env.PROD ? "wss://" : "ws://") + addr + "/internal/update/";

if (manager === undefined) {
  throw new Error("Missing VITE_MANAGER env variable");
}

export const fetchPod = async (): Promise<PodProps[]> => {
  return await axios.get(manager + "/cloud/pod/").then((response) => {
    return response.data.data;
  });
};

export const fetchNode = async (): Promise<NodeProps[]> => {
  return await axios.get(manager + "/cloud/node/").then((response) => {
    return response.data.data;
  });
};

export const fetchStats = async (
  pod_id: string,
  node_id: string
): Promise<StatsProps> => {
  return await axios
    .get(manager + "/cloud/server/", {
      params: {
        pod_id: pod_id,
        node_id: node_id,
      },
    })
    .then((response) => {
      console.log(response.data.data[node_id][0]);
      return response.data.data[node_id][0];
    });
};

export const refreshPod = async (): Promise<void> => {
  await axios.post(
    manager + "/internal/refresh/",
    {},
    {
      params: {
        type: "pod",
      },
    }
  );
};

export const fetchJob = async (): Promise<JobProps[]> => {
  return await axios.get(manager + "/cloud/job/").then((response) => {
    return response.data.data;
  });
};

export const fetchJobLog = async (job_id: string): Promise<LogProps> => {
  return await axios
    .get(manager + "/cloud/job/log/", {
      params: {
        job_id: job_id,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};

export const fetchNodeLog = async (node_id: string): Promise<LogProps> => {
  return await axios
    .get(manager + "/cloud/node/log/", {
      params: {
        node_id: node_id,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    });
};
