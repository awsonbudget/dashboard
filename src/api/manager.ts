import axios from "axios";
import { JobProps } from "../components/JobCard";
import { NodeProps } from "../components/NodeCard";
import { PodProps } from "../components/PodCard";

export const fetchPod = async (): Promise<PodProps[]> => {
  return await axios
    .get("http://localhost:5550/cloud/pod/")
    .then((response) => {
      return response.data.data;
    });
};

export const fetchNode = async (): Promise<NodeProps[]> => {
  return await axios
    .get("http://localhost:5550/cloud/node/")
    .then((response) => {
      return response.data.data;
    });
};

export const fetchJob = async (): Promise<JobProps[]> => {
  return await axios.get("http://localhost:5550/cloud/job").then((response) => {
    return response.data.data;
  });
};
