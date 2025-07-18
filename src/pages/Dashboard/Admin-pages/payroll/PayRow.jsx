import { useState } from "react";
import PayModal from "./PayModal";

const PayRow = ({ work, fetchData }) => {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };
  const { personalInfo, salary, month, year, isPaid, paymentDate } = work;
  return (
    <tr className="bg-base-200 border-gray-200 border-b">
      <td className="px-6 py-4">{personalInfo.name}</td>
      <td className="px-6 py-4">{salary}</td>
      <td className="px-6 py-4">
        {month}, {year}
      </td>
      <td className="px-6 py-4">
        <button
          disabled={isPaid}
          onClick={() => setIsOpen(true)}
          className={`btn btn-secondary btn-sm  ${isPaid ? "" : "text-white"}`}
        >
          Pay
        </button>
      </td>
      <td>{paymentDate}</td>

      <PayModal
        closeModal={closeModal}
        isOpen={isOpen}
        work={work}
        fetchData={fetchData}
      ></PayModal>
    </tr>
  );
};

export default PayRow;
