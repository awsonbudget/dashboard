import { PodProps } from "./PodCard";

export type NodeProps = {
  name: string;
  id: string;
  status: string;
  pod: Partial<PodProps>;
};

export default function Node({ name, id, status, pod }: NodeProps) {
  return (
    <div className="flex card py-2 px-2 justify-around items-center">
      <svg
        className="h-10 w-9 m-2 justify-self-start"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <rect
          width="28"
          height="28"
          x="1"
          y="1"
          stroke="#000"
          stroke-width="2"
          rx="5"
        />
        <circle cx="7" cy="7" r="2" fill="#000" />
        <circle cx="13" cy="7" r="2" fill="#000" />
      </svg>

      <span className="grow h-10 m-2 justify-self-stretch">
        <span className="p-3 text-xl font-medium">{name}</span>
        <span className="p-3 text-sm font-regular">{id.slice(0, 12)}</span>
        <span className="p-3 text-lg font-regular">{status}</span>
      </span>

      <svg
        className="h-10 w-9 m-2 justify-self-end"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        <path
          stroke="#476CFF"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="6"
          d="M14.375 31.25 25.625 20 14.375 8.75"
        />
      </svg>
    </div>
  );
}
