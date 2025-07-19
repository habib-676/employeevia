import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { FaFire } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const ManageRow = ({ single }) => {
  const { _id, name, designation, role, salary } = single;
  const queryClient = useQueryClient();

  // Mutation for updating salary
  const { mutate } = useMutation({
    mutationFn: async (newSalary) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${_id}`,
        { salary: newSalary }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Salary updated");
      queryClient.invalidateQueries({ queryKey: ["users"] }); // refetch the users
    },
    onError: () => {
      toast.error("Failed to update salary");
    },
  });

  const handleSalary = (e) => {
    e.preventDefault();
    const newSalary = parseFloat(e.target.newSalary.value);

    if (isNaN(newSalary) || newSalary <= 0) {
      toast.error("Enter a valid salary");
      return;
    }

    if (newSalary <= salary) {
      toast.error("Salary can only be increased!");
      return;
    }

    mutate(newSalary);
  };

  return (
    <tr className="bg-base-200 border-gray-200 border-b">
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{designation}</td>
      <td className="px-6 py-4">
        {role === "hr" ? (
          <button className="btn btn-circle">
            <ImCross className="text-red-500" size={20} />
          </button>
        ) : (
          <button className="btn btn-circle">
            <TiTick className="text-accent" size={20} />
          </button>
        )}
      </td>

      <td className="px-6 py-4">
        <button className="btn btn-circle">
          <FaFire size={20} className="text-warning" />
        </button>
      </td>
      <td className="px-6 py-4 ">
        {/* <input type="number" defaultValue={salary} /> */}
        <form
          className="flex gap-5 items-center justify-center"
          onSubmit={handleSalary}
        >
          <input
            type="number"
            defaultValue={salary}
            className="input input-neutral "
            name="newSalary"
          />
          <input
            type="submit"
            value="Update salary"
            className="btn btn-xs btn-primary"
          />
        </form>
      </td>
    </tr>
  );
};

export default ManageRow;
