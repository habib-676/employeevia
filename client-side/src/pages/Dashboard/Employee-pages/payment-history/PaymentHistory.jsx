import useAuth from "../../../../hooks/useAuth";
import HistoryRow from "./HistoryRow";
import { getMyPayments } from "../../../../api/utils";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/Shared/Animation/LoadingSpinner";
import InfiniteScroll from "react-infinite-scroll-component";
import { useState, useEffect } from "react";

const ITEMS_PER_LOAD = 5;

const PaymentHistory = () => {
  const { user } = useAuth();
  const [displayedPayments, setDisplayedPayments] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: myPaymentData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["myPaymentData", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await getMyPayments(user?.email);
      return data;
    },
  });

  useEffect(() => {
    if (myPaymentData?.length) {
      const initial = myPaymentData.slice(0, ITEMS_PER_LOAD);
      setDisplayedPayments(initial);
      setHasMore(myPaymentData.length > ITEMS_PER_LOAD);
    }
  }, [myPaymentData]);

  const fetchMoreData = () => {
    const next = displayedPayments.length + ITEMS_PER_LOAD;
    const newSlice = myPaymentData.slice(0, next);
    setDisplayedPayments(newSlice);

    if (newSlice.length >= myPaymentData.length) {
      setHasMore(false); // ✅ important fix
    }
  };

  if (isPending || !myPaymentData) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Failed to load payment history.
      </div>
    );
  }

  return (
    <div className="px-2 md:px-6 lg:px-10">
      <h3 className="font-bold text-3xl text-center mb-10">
        Payment <span className="text-secondary">History</span>
      </h3>

      {myPaymentData.length < 1 ? (
        <div className="border-primary rounded-4xl shadow-2xl p-6 bg-base-200 mt-10 w-md flex mx-auto">
          <h3 className="text-xl text-secondary-content text-center font-semibold">
            No data found. Wait for the payment
          </h3>
        </div>
      ) : (
        <div
          id="scrollableDiv"
          className="h-[60vh] overflow-auto bg-base-100 rounded-xl"
        >
          <InfiniteScroll
            dataLength={displayedPayments.length}
            next={fetchMoreData}
            hasMore={hasMore}
            scrollableTarget="scrollableDiv"
            loader={
              <p className="text-center py-4 text-sm text-secondary-content">
                Loading more...
              </p>
            }
            endMessage={
              <p className="text-center py-4 text-secondary-content">
                <b>All payments loaded.</b>
              </p>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-white uppercase bg-primary">
                  <tr>
                    <th className="px-3 md:px-6 py-2 md:py-3">Month</th>
                    <th className="px-3 md:px-6 py-2 md:py-3">Year</th>
                    <th className="px-3 md:px-6 py-2 md:py-3">Amount</th>
                    <th className="px-3 md:px-6 py-2 md:py-3">Payment Date</th>
                    <th className="px-3 md:px-6 py-2 md:py-3">
                      Transaction ID
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {displayedPayments.map((payment) => (
                    <HistoryRow key={payment._id} payment={payment} />
                  ))}
                </tbody>
              </table>
            </div>
          </InfiniteScroll>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
