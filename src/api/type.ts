export type LogProps = {
  status: boolean;
  msg: string;
  data: string;
};

export type JobProps = {
  job_id: string;
  job_name: string;
  node_id: string;
  pod_id: string;
  job_status: "registered" | "running" | "completed" | "aborted";
};

export type NodeProps = {
  node_name: string;
  node_id: string;
  node_status: "idle" | "running" | "new" | "online" | "paused";
  node_type: "server" | "job";
  pod_data: Omit<PodProps, "nodes">;
};

export type PodProps = {
  pod_name: string;
  pod_id: string;
  pod_type: string;
  total_nodes: number;
};

export type StatsProps = {
  cpu_usage: number;
  mem_usage: number;
  network_in: number;
  network_out: number;
};
