import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../../../components/Shared/Spinners/LoadingSpinner";
import toast from "react-hot-toast";
import ManageRow from "./ManageRow";

const ManageEmployees = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/users`);
      return data;
    },
  });

  if (isPending) return <LoadingSpinner />;
  if (error) {
    return toast.error(`${error.message}`);
  }

  console.log(data);
  return (
    <div>
      <h2 className="text-3xl text-center mb-10 font-bold">
        Workforce <span className="text-secondary">Control Panel</span>
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs text-white uppercase bg-primary  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                designation
              </th>
              <th scope="col" className="px-6 py-3">
                Make hr
              </th>
              <th scope="col" className="px-6 py-3">
                fire
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((single, index) => (
              <ManageRow key={index} single={single}></ManageRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEmployees;
