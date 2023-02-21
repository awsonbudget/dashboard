import { useNavigate } from "react-router-dom";
import { JobProps } from "../api/type";
import JobIcon from "../assets/job.svg";
import PrintLogIcon from "../assets/printlog.svg";

export default function JobCard({ name, id, node, status }: JobProps) {
  const navigate = useNavigate();
  return (
    <div className="flex card py-2 px-2 justify-around items-center hover:bg-blue-50">
      <div>
        <img src={JobIcon} className="h-10 w-9 ml-2" />
      </div>

      <span className="grow h-10 m-2 justify-self-stretch font-Inter flex items-center">
        <span className="p-3 text-xl font-semibold">{name}</span>
        <span className="p-3 text-md font-regular">{id}</span>
        {node === null ? (
          <span className="p-3 text-lg font-regular">No node assigned</span>
        ) : (
          <span className="p-3 text-lg font-regular">Under {node}</span>
        )}
        <span className="p-3 text-lg font-regular">{status.toUpperCase()}</span>
      </span>

      <div>
        <img
          src={PrintLogIcon}
          onClick={async () => {
            navigate("/job/" + id + "/log");
          }}
          className="h-10 w-40 m-2 justify-self-end"
        />
      </div>
    </div>
  );
}
