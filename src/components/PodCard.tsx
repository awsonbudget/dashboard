import PodIcon from "../assets/pod.svg";
import ArrowIcon from "../assets/arrow.svg";
import { PodProps } from "../api/type";
import { useNavigate } from "react-router-dom";

export default function PodCard({ name, id, nodes }: PodProps) {
  const navigate = useNavigate();
  return (
    <div className="flex card py-2 px-2 justify-around items-center hover:bg-blue-50">
      <div>
        <img src={PodIcon} className="h-10 w-9 m-2 justify-self-start" />
      </div>

      <div className="grow h-10 m-2 justify-self-stretch font-Inter flex items-center">
        <span className="p-3 text-xl font-semibold">{name}</span>
        <span className="p-3 text-md font-regular">{id}</span>
        <span className="p-3 text-lg font-regular">
          {nodes} {nodes > 1 ? "nodes" : "node"} online
        </span>
      </div>

      <div>
        <img
          src={ArrowIcon}
          onClick={async () => {
            navigate("/pod/" + id);
          }}
          className="h-10 w-9 m-2 justify-self-end"
        />
      </div>
    </div>
  );
}
