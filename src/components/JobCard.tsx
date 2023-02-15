import { useNavigate } from "react-router-dom";
import JobIcon from "../assets/job.svg";
import PrintLogIcon from "../assets/printlog.svg";

export type JobProps = {
  id: string;
  name: string;
  node: string;
  status: string;
};

export default function Job({ name, id, node, status }: JobProps) {
  const navigate = useNavigate();
  return (
    <div className="flex card py-2 px-2 justify-around items-center hover:bg-blue-50">
      <div>
        <img src={JobIcon} className="h-10 w-9 ml-2" />
      </div>

      <span className="grow h-10 m-2 justify-self-stretch font-Inter flex items-center">
        <span className="p-3 text-xl font-medium">{name}</span>
        <span className="p-3 text-md font-regular">{id}</span>
        <span className="p-3 text-lg font-regular">Under {node}</span>
        <span className="p-3 text-lg font-regular">{status}</span>
      </span>

      <div>
        <img
          src={PrintLogIcon}
          onClick={async () => {
            navigate("/job/log/" + id);
          }}
          className="h-10 w-40 m-2 justify-self-end"
        />
      </div>
    </div>
  );
}
