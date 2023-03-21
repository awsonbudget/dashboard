import { useParams, useNavigate } from "@solidjs/router";
import { JobProps, NodeProps } from "../api/type";
import ArrowIcon from "../assets/arrow.svg";

type Props = {
  nodes: NodeProps[];
  jobs: JobProps[];
};

const PodPage = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  if (id === undefined) {
    return <div>Invalid Query</div>;
  }

  return (
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <div class="px-10 pt-10 font-Inter text-5xl font-semibold">Server 1</div>
      <div class="flex items-center">
        <img
          src={ArrowIcon}
          class="m-5 mx-9 h-10 w-10 rotate-180 rounded-xl hover:bg-blue-100 active:bg-blue-200"
          onClick={() => {
            navigate("/");
          }}
        />
      </div>

      <div class="card mx-10 my-5 flex">
        <div class="text-md whitespace-pre-wrap p-12 font-Inter">
        <span class="m-2 items-center font-Inter">
            <span class="block p-2 text-xl font-semibold">Server 1</span>
            <span class="block text-lg font-regular p-2">ID - b95a843v93</span>
            <span class="block font-regular p-2 text-lg">CPU % - 1.32%</span>
            <span class="block font-regular p-2 text-lg">Mem used / limit - 8.279MiB / 1.952GiB</span>
            <span class="block font-regular p-2 text-lg">Memory % - 0.32%</span>
            <span class="block font-regular p-2 text-lg">Net I/O - 916B / 0B</span>
            <span class="block font-regular p-2 text-lg">Block I/O - 147kB / 0B</span>
            <span class="block font-regular p-2 text-lg">PIDs - 9</span>
        </span>
        </div>
      </div>

 
        


      <div class="py-4" />
    </div>
  );
};

export default PodPage;
