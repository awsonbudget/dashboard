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
  node_name: string;
  node_id: string;
  node_status: "idle" | "running";
  pod_data: Omit<PodProps, "nodes">;
};

export type PodProps = {
  pod_name: string;
  pod_id: number;
  pod_type: string;
  total_nodes: number;
};
