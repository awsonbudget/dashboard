import axios from "axios";
import { JobProps, LogProps, NodeProps, PodProps } from "./type";

const addr = import.meta.env.VITE_MANAGER;
const manager = (import.meta.env.PROD ? "https://" : "http://") + addr;
const ws =
  (import.meta.env.PROD ? "wss://" : "ws://") + addr + "/internal/update/";
export const socket = new WebSocket(ws);

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
