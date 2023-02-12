export const Pod1page = () => {
  return (
    <div className="bg-[#EEF0F8]">
      <h1 className="w-[32.33vw] h-[6.22vh] pt-[4.37vh] pl-[4.89vw] font-Inter text-5xl font-semibold">
        {" "}
        AOB Dashboard{" "}
      </h1>

      <h2 className="pt-[9.75vh] pl-[4.89vw] flex flex-row items-center font-Inter text-4xl font-semibold">
        <svg
          className="h-9 w-9 justify-start"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
        >
          <path
            stroke="#476CFF"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="5"
            d="M25.625 8.75 14.375 20l11.25 11.25"
          />
        </svg>
        <div className="ml-4">Pod 1 - Pod ID</div>
      </h2>

      <h3 className="w-[15.38vw] h-[4.89vh] pt-[6.00vh] pl-[4.89vw] font-Inter text-4xl font-semibold">
        {" "}
        All Pods{" "}
      </h3>

      <div className="px-10 p-20 grid lg:grid-cols-2 gap-10 justify-around">
        <div className="card flex flex-row items-center">
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
            <span className="p-3 text-xl font-medium">Node 1</span>
            <span className="p-3 text-lg font-regular">ID - ABCDEFGHIJ</span>
            <span className="p-3 text-lg font-medium text-green-600">Idle</span>
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

        <div className="card flex flex-row items-center">
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
            <span className="p-3 text-xl font-medium">Node 2</span>
            <span className="p-3 text-lg font-regular">ID - QWERTYUIO</span>
            <span className="p-3 text-lg font-medium text-green-600">Idle</span>
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

        <div className="card flex flex-row items-center">
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
            <span className="p-3 text-xl font-medium">Node 3</span>
            <span className="p-3 text-lg font-regular">ID - POIUYTREW</span>
            <span className="p-3 text-lg font-medium text-green-600">Idle</span>
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
    </div>
  );
};
