const HistoryRow = ({ payment }) => {
  const { month, year, paymentDate, transactionId, salary } = payment;
  return (
    <>
      <tr className="bg-base-200 border-gray-200 border-b">
        <td className="px-6 py-4">{month}</td>
        <td className="px-6 py-4">{year}</td>
        <td className="px-6 py-4">{salary}</td>
        <td className="px-6 py-4">{paymentDate}</td>
        <td className="px-6 py-4">{transactionId}</td>
      </tr>
    </>
  );
};

export default HistoryRow;
