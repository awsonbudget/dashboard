import { fetchJobLog } from "../api/manager";

export type LogProps = {
  log: string;
};

export default function Log({ log }: LogProps) {
  return (
    <div className="flex card py-2 px-2 justify-around items-center">
      <span className="grow h-10 m-2 justify-self-stretch">
        <span className="p-3 text-md font-regular">{log}</span>
      </span>
    </div>
  );
}
