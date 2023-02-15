import { useNavigate } from "react-router-dom";
import { PodProps } from "./PodCard";
import NodeIcon from "../assets/node.svg";
import PrintLogIcon from "../assets/printlog.svg";

export type NodeProps = {
  name: string;
  id: string;
  status: string;
  pod: Partial<PodProps>;
};

export default function Node({ name, id, status, pod }: NodeProps) {
  const navigate = useNavigate();
  return (
    <div className="flex card py-2 px-2 justify-around items-center hover:bg-blue-50">
      <div>
        <img src={NodeIcon} className="h-10 w-9 m-2 justify-self-start" />
      </div>

      <span className="grow h-10 m-2 justify-self-stretch font-Inter flex items-center">
        <span className="p-3 text-xl font-semibold">{name}</span>
        <span className="p-3 text-sm font-regular">{id.slice(0, 12)}</span>
        <span className="p-3 text-lg font-regular">{status}</span>
        <span className="p-3 text-lg font-regular">{pod.name}</span>
      </span>

      <div>
        <img
          src={PrintLogIcon}
          onClick={async () => {
            navigate("/node/log/" + id);
          }}
          className="h-10 w-40 m-2 justify-self-end"
        />
      </div>
    </div>
  );
}
