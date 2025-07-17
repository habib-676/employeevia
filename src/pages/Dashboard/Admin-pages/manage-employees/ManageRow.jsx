import React from "react";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { FaFire } from "react-icons/fa6";

const ManageRow = ({ single }) => {
  const { name, designation, role } = single;
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
    </tr>
  );
};

export default ManageRow;
