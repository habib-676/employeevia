import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addPaymentReq } from "../../../../../api/utils";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const PayModal = ({ isOpen, closeModal, employee }) => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { name, email, salary, designation, image } = employee;

  const handlePay = async () => {
    if (!month || !year) {
      toast.error("Please input a month and year before proceeding.");
      return;
    }

    const paymentReq = {
      personalInfo: { name, email, designation, image },
      salary,
      month,
      year,
      isPaid: false,
      paymentDate: "",
    };

    console.log(paymentReq);

    const { data } = await addPaymentReq(paymentReq);
    if (data.insertedId) {
      closeModal();
      toast.success("Payment request added");
    }
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none "
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 ">
            <DialogPanel
              transition
              className="border border-primary shadow-2xl w-full max-w-md rounded-xl bg-base-200 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-lg font-medium text-center leading-6 "
              >
                Approve for payment !
              </DialogTitle>

              {/* form to pay */}
              <div className="space-y-4">
                {/* Salary */}
                <div>
                  <label className="label">
                    <span className="label-text">Salary</span>
                  </label>
                  <input
                    type="number"
                    value={employee.salary}
                    className="input input-bordered w-full bg-base-100"
                    readOnly
                  />
                </div>

                {/* Month Dropdown */}
                <div>
                  <label className="label">
                    <span className="label-text">Month</span>
                  </label>
                  <select
                    value={month}
                    required
                    onChange={(e) => setMonth(e.target.value)}
                    className="select select-bordered w-full bg-base-100"
                  >
                    <option disabled value="">
                      Select Month
                    </option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fixed Year */}
                <div>
                  <label className="label">
                    <span className="label-text">Year</span>
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 2025"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="input input-bordered w-full bg-base-100"
                  />
                </div>
              </div>

              <hr className="my-8 border border-base-100" />

              {/* buttons */}
              <div className="flex mt-2 justify-around">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handlePay}
                >
                  Pay
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-warning"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PayModal;
