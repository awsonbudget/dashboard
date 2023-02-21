import { useNavigate } from "react-router-dom";
import NodeIcon from "../assets/node.svg";
import { NodeProps } from "../api/type";
import ArrowIcon from "../assets/arrow.svg";

export default function NodeCard({ name, id, status, pod }: NodeProps) {
  const navigate = useNavigate();
  return (
    <div className="flex card py-2 px-2 justify-around items-center hover:bg-blue-50">
      <div>
        <img src={NodeIcon} className="h-10 w-9 m-2 justify-self-start" />
      </div>

      <span className="grow h-10 m-2 justify-self-stretch font-Inter flex items-center">
        <span className="p-3 text-xl font-semibold">{name}</span>
        <span className="p-3 text-md font-regular">{id}</span>
        <span className="p-3 text-lg font-regular">Within {pod.name}</span>
        <span className="p-3 text-lg font-regular">{status.toUpperCase()}</span>
      </span>

      <div>
        <img
          src={ArrowIcon}
          onClick={async () => {
            navigate("/node/" + id);
          }}
          className="h-10 w-9 m-2 justify-self-end"
        />
      </div>
    </div>
  );
}
