import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchJobLog, fetchNodeLog } from "../api/manager";

type Props = {};

const LogPage = (props: Props) => {
  const { type, id } = useParams();
  if (
    type === undefined ||
    (type !== "node" && type !== "job") ||
    id === undefined
  ) {
    return <div>Invalid Query</div>;
  }

  const [log, setLog] = useState<string>("no log found");
  useEffect(() => {
    const getLog = async (type: "node" | "job", id: string) => {
      if (type === "node") {
        fetchNodeLog(id).then((res) => {
          setLog(res.data);
        });
      }
      if (type === "job") {
        fetchJobLog(id).then((res) => {
          setLog(res.data);
        });
      }
    };
    getLog(type, id);
  });

  return (
    <div>
      <div className="p-3">LogPage</div>
      <div className="p-3">{type}</div>
      <div className="p-3">{id}</div>
      <div className="p-3 whitespace-pre-wrap">{log}</div>
      <Link to="/" className="p-3">
        Back
      </Link>
    </div>
  );
};

export default LogPage;
