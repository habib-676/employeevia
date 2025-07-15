import { TiTick } from "react-icons/ti";
import { MdCancel, MdOutlinePayment } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";

const EmployeeRow = ({ employee, onToggleVerify }) => {
  const { _id, name, email, isVerified, bank_account_no, salary } = employee;
  return (
    <tr className="bg-base-200 border-gray-200 border-b">
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">
        <button
          className="btn btn-circle"
          onClick={() => onToggleVerify(_id, isVerified)}
        >
          {isVerified ? (
            <TiTick size={20} className="text-accent" />
          ) : (
            <MdCancel size={20} className="text-red-500" />
          )}
        </button>
      </td>
      <td className="px-6 py-4">{bank_account_no}</td>
      <td className="px-6 py-4">{salary}</td>
      <td className="px-6 py-4">
        <MdOutlinePayment className="text-secondary" size={20} />
      </td>
      <td className="px-6 py-4 text-secondary">
        <Link>
          <FaEye size={20} className="text-primary" />
        </Link>
      </td>
    </tr>
  );
};

export default EmployeeRow;
