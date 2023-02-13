import React from "react";

export default function Node(props) {
  const { name, id, status } = props.node;

  return (
    <div className="px-10 p-10 grid auto-cols-max gap-10 justify-around">
      <div className="card flex justify-evenly gap-5 flex-row items-center">
        <svg
          className="h-9 w-9 ml-5"
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

        <span className="p-4 font-Inter">
          <span className="p-3 text-xl font-medium">{name}</span>
          <span className="p-3 text-sm font-regular">{id}</span>
          <span className="p-3 text-lg font-regular">{status}</span>
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
