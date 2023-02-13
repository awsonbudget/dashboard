import React from "react";

export type PodProps = {
  name: string;
  id: number;
  nodes: number;
};

export default function Pod({ name, id, nodes }: PodProps) {
  return (
    <div className="px-10 p-10 grid auto-cols-max gap-10 justify-around">
      <div className="card flex justify-evenly flex-row items-center">
        <svg
          className="flex justify-start h-9 w-9 ml-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            stroke="#000"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M17.5 14.219c7.249 0 13.125-2.449 13.125-5.469 0-3.02-5.876-5.469-13.125-5.469S4.375 5.73 4.375 8.75c0 3.02 5.876 5.469 13.125 5.469ZM30.625 14.629c0 3.02-5.879 5.469-13.125 5.469s-13.125-2.449-13.125-5.47m26.25 5.88c0 3.02-5.879 5.469-13.125 5.469s-13.125-2.45-13.125-5.47"
          />
          <path
            stroke="#000"
            stroke-linecap="round"
            stroke-miterlimit="10"
            stroke-width="2"
            d="M4.375 8.698v17.604c0 2.991 5.879 5.417 13.125 5.417s13.125-2.426 13.125-5.417V8.698"
          />
        </svg>

        <span className="p-4 font-Inter">
          <span className="p-3 text-xl font-medium">{name}</span>
          <span className="p-3 text-lg font-regular">ID - {id}</span>
          <span className="p-3 text-lg font-regular">
            #Node attached - {nodes}
          </span>
        </span>

        <svg
          className="flex justify-end h-9 w-9 mr-5"
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
    </div>
  );
}
