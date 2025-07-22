import { getEmployees } from "../../../../api/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/Animation/LoadingSpinner";
import EmployeeRow from "./EmployeeRow";
import { toast } from "react-hot-toast";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";

const Employees = () => {
  const queryClient = useQueryClient();

  const { data: employeesData = [], isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
    select: (res) => res.data,
  });

  console.log(employeesData);

  // Toggle verification status mutation
  const { mutate: toggleVerify } = useMutation({
    mutationFn: async ({ id, isVerified }) => {
      return await axiosSecure.patch(
        `${import.meta.env.VITE_API_URL}/employees/${id}`,
        { isVerified }
      );
    },
    onSuccess: () => {
      // Instant update by refetching
      queryClient.invalidateQueries(["employees"]);
      toast.success("Updated");
    },
  });

  const handleToggleVerify = (id, currentStatus) => {
    toggleVerify({ id, isVerified: !currentStatus });
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h3 className="text-center font-bold text-3xl mb-10">
        <span className="text-secondary">Employees</span> list
      </h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs text-white uppercase bg-primary  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Verified
              </th>
              <th scope="col" className="px-6 py-3">
                Bank account
              </th>
              <th scope="col" className="px-6 py-3">
                Salary
              </th>
              <th scope="col" className="px-6 py-3">
                Pay
              </th>
              <th scope="col" className="px-6 py-3">
                Details
              </th>
            </tr>
          </thead>

          <tbody>
            {employeesData.map((employee, index) => (
              <EmployeeRow
                employee={employee}
                key={index}
                onToggleVerify={handleToggleVerify}
              ></EmployeeRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
