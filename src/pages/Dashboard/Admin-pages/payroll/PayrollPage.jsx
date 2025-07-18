import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../../../../api/utils";
import LoadingSpinner from "../../../../components/Shared/Animation/LoadingSpinner";
import toast from "react-hot-toast";
import PayRow from "./PayRow";

const PayrollPage = () => {
  const {
    data: paymentData,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["paymentData"],
    queryFn: async () => {
      const { data } = await getPayments();
      return data;
    },
  });

  if (isPending || !paymentData) {
    return <LoadingSpinner />;
  }
  if (error) {
    return toast.error(`${error.message}`);
  }
  return (
    <div>
      <h3 className="text-3xl font-bold mb-10 text-center">
        Pending <span className="text-secondary">Payments</span>
      </h3>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs text-white uppercase bg-primary  ">
            <tr>
              <th scope="col" className="px-6 py-3">
                name
              </th>
              <th scope="col" className="px-6 py-3">
                salary
              </th>
              <th scope="col" className="px-6 py-3">
                month/year
              </th>
              <th scope="col" className="px-6 py-3">
                pay
              </th>
              <th scope="col" className="px-6 py-3">
                payment date
              </th>
              <th scope="col" className="px-6 py-3">
                Transaction id
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((work, index) => (
              <PayRow key={index} work={work} fetchData={refetch}></PayRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollPage;
