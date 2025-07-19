import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const PayModal = ({ closeModal, isOpen, work, fetchData }) => {
  const { personalInfo, salary, month, year } = work;

  //   stripe
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-base-100 p-6 backdrop-blur-2xl duration-300 border border-primary shadow-md shadow-primary ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-lg font-medium text-center leading-6 text-gray-900"
            >
              Review Info Before the payment
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm ">Name: {personalInfo.name}</p>
              <p>Salary :{salary}</p>
              <p>
                mm/yy : {month}, {year}
              </p>
            </div>

            {/* stipe checkout form */}
            <Elements stripe={stripePromise}>
              <CheckoutForm
                work={work}
                closeModal={closeModal}
                fetchData={fetchData}
                month={month}
                year={year}
              ></CheckoutForm>
            </Elements>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PayModal;
