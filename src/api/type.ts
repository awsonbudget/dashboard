export type LogProps = {
  status: boolean;
  msg: string;
  data: string;
};

export type JobProps = {
  id: string;
  name: string;
  node: string;
  status: "registered" | "running" | "completed" | "aborted";
};

export type NodeProps = {
  name: string;
  id: string;
  status: "idle" | "running";
  pod: Omit<PodProps, "nodes">;
};

export type PodProps = {
  name: string;
  id: number;
  nodes: number;
};
