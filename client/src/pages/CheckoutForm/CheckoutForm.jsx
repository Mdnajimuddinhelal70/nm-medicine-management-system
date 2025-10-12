import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../Providers/AuthProvider";
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const axiosSecure = useAxiosSecure();
  const [cart, isLoading, refetch] = useCart();
  const navigate = useNavigate();

  // Calculate total price safely
  const totalPrice = cart.reduce((total, item) => {
    const rawPrice = item.price || "0";
    const price = parseFloat(rawPrice.toString().replace("$", ""));
    const quantity = item.quantity || 1;
    return total + (isNaN(price) ? 0 : price) * quantity;
  }, 0);

  console.log("Total Price:", totalPrice, typeof totalPrice);

  // Create payment intent
  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: Number(totalPrice) })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          toast.error("Payment Intent creation error:", err);
        });
    }
  }, [axiosSecure, totalPrice]);

  // Handle payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const card = elements.getElement(CardElement);
    if (!card) {
      setIsProcessing(false);
      return;
    }

    const { error: paymentError } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (paymentError) {
      setError(paymentError.message);
      setIsProcessing(false);
      return;
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      setError(confirmError.message);
      setIsProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      const firstItemName = cart.length > 0 ? cart[0].name : "Unknown Medicine";

      const payment = {
        buyerEmail: user.email,
        sellerEmail: cart[0]?.sellerEmail || "unknown",
        price: totalPrice,
        name: firstItemName,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        myMdcnIds: cart.map((item) => item.medicineId),
        status: "pending",
      };

      try {
        const res = await axiosSecure.post("/payments", payment);
        console.log("Payment saved:", res.data);
        refetch();

        if (res.data.paymentResult?.insertedId) {
          toast.success("Thanks, your payment was successful");
          navigate("/invoice");
        }
      } catch (error) {
        toast.error("Error saving payment:", error);
      }
    }

    setIsProcessing(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          <span className="loading loading-bars loading-lg"></span>
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Complete Your Payment
        </h2>

        <div className="mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                  fontFamily: "Roboto, sans-serif",
                },
                invalid: { color: "#9e2146" },
              },
            }}
            className="p-3 border rounded-md focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || !clientSecret || isProcessing}
          className="w-full py-2 px-4 bg-violet-700 text-white font-semibold rounded-lg hover:bg-violet-900 transition-colors duration-300"
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>

        <p className="text-red-700">{error}</p>
        {transactionId && (
          <p className="text-green-600">Your transaction ID: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
