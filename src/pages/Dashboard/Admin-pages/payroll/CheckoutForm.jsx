import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutForm = ({ work, closeModal, fetchData, month, year }) => {
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  // secret
  const [clientSecret, setClientSecret] = useState("");

  // validate everything before clicking the pay now button

  useEffect(() => {
    if (work?.isPaid) {
      return setClientSecret("");
    }
    const getClientSecret = async () => {
      try {
        const { data } = await axiosSecure.post("/create-payment-intent", {
          workId: work?._id,
          salary: work?.salary,
        });
        setClientSecret(data?.clientSecret);
      } catch (err) {
        console.log(err);
        toast.error(
          err?.response?.data?.message || "Failed to initiate payment."
        );
        closeModal();
      }
    };
    getClientSecret();
  }, [work.isPaid, work._id]);

  //
  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError(null);
    }

    // payment receive :
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });

    if (result.error) {
      setCardError(result?.error?.message);
      return;
    }

    if (result?.paymentIntent?.status === "succeeded") {
      const updatedData = {
        workId: work._id,
        transactionId: result?.paymentIntent?.id,
      };
      try {
        const { data } = await axiosSecure.patch("/payments", updatedData);
        console.log(data);
        toast.success("Payment successful!");
        fetchData(); // refetch table
        closeModal(); // close modal
      } catch (err) {
        console.log(err);
        toast.error("Failed to update payment record.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        className="my-10"
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      {cardError && <p className="text-red-600 my-3">{cardError}</p>}

      <div className="flex justify-between items-center mt-10">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={!stripe || processing}
        >
          {processing ? <ClipLoader size={20} /> : `Pay $${work?.salary}`}
        </button>

        <button className="btn btn-warning" type="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
