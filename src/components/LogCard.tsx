import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { fetchJobLog, fetchNodeLog } from "../api/manager";

interface loaderParams {
  type: string;
  id: string;
}

type LogProps = {
  status: boolean;
  msg: string;
  data: string;
};

export async function loader({ params }: LoaderFunctionArgs) {
  const typedParams = params as unknown as loaderParams;
  if (typedParams.type === "node") {
    return await fetchNodeLog(typedParams.id);
  }
  if (typedParams.type === "job") {
    return await fetchJobLog(typedParams.id);
  }
}

export default function Log() {
  const log = useLoaderData() as unknown as LogProps;
  if (log.status === false) {
    return <div className="p-3 text-md font-regular">no log found</div>;
  }

  return (
    <div className="p-3 text-md font-regular whitespace-pre-wrap">
      {log.data}
    </div>
  );
}
