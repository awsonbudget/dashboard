export type LogProps = {
  status: boolean;
  msg: string;
  data: string;
};

export type JobProps = {
  id: string;
  name: string;
  node: string;
  status: string;
};

export type NodeProps = {
  name: string;
  id: string;
  status: string;
  pod: Partial<PodProps>;
};

export type PodProps = {
  name: string;
  id: number;
  nodes: number;
};
