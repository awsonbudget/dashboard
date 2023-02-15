import PodIcon from "../assets/pod.svg";
import ArrowIcon from "../assets/arrow.svg";

export type PodProps = {
  name: string;
  id: number;
  nodes: number;
};

export default function Pod({ name, id, nodes }: PodProps) {
  return (
    <div className="flex card py-2 px-2 justify-around items-center hover:bg-blue-50">
      <div>
        <img src={PodIcon} className="h-10 w-9 m-2 justify-self-start" />
      </div>

      <div className="grow h-10 m-2 justify-self-stretch font-Inter flex items-center">
        <span className="p-3 text-xl font-semibold">{name}</span>
        <span className="p-3 text-lg font-regular">ID - {id}</span>
        <span className="p-3 text-lg font-regular">
          {nodes} {nodes > 1 ? "nodes" : "node"} online
        </span>
      </div>

      <div>
        <img src={ArrowIcon} className="h-10 w-9 m-2 justify-self-end" />
      </div>
    </div>
  );
}
