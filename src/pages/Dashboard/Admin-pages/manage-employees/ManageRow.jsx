import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { FaFire } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";

const ManageRow = ({ single }) => {
  const { _id, name, role, salary, isFired } = single;
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);

  // update role :
  const { mutate: updateRole } = useMutation({
    mutationFn: async (newRole) => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/role/${_id}`,
        { role: newRole } // ✅ structured as expected
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Role updated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to update role");
    },
  });

  //  updating salary
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

  // 🔴 Fire user
  const { mutate: fireUser } = useMutation({
    mutationFn: async () => {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/fire-user/${_id}`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("User has been fired");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to fire user");
    },
  });

  return (
    <tr className="bg-base-200 border-gray-200 border-b">
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{role}</td>
      <td className="px-6 py-4">
        {role === "hr" ? (
          <button
            className="btn btn-circle"
            onClick={() => updateRole("employee")}
          >
            <ImCross className="text-red-500" size={20} />
          </button>
        ) : (
          <button className="btn btn-circle" onClick={() => updateRole("hr")}>
            <TiTick className="text-accent" size={20} />
          </button>
        )}
      </td>
      {/* fire */}

      <td className="px-6 py-4">
        {isFired ? (
          <span className="text-red-500 font-bold">Fired</span>
        ) : (
          <button className="btn btn-circle" onClick={() => setShowModal(true)}>
            <FaFire size={20} className="text-warning" />
          </button>
        )}
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
      {showModal && (
        <div className="fixed z-10 inset-0  bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded p-6 shadow-lg space-y-4 max-w-sm w-full">
            <h3 className="text-xl font-bold text-center text-red-600">
              Confirm Termination
            </h3>
            <p className="text-center">Are you sure you want to fire {name}?</p>
            <div className="flex flex-col justify-center ">
              <button
                className="btn btn-sm btn-error "
                onClick={() => {
                  fireUser();
                  setShowModal(false);
                }}
              >
                Yes, Fire
              </button>
              <button
                className="btn btn-sm btn-ghost "
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </tr>
  );
};

export default ManageRow;
