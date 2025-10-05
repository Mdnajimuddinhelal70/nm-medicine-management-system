import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../Providers/AuthProvider";
=======
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c

const CheckoutForm = () => {
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
<<<<<<< HEAD
  const [transactionId, setTransactionId] = useState("");
=======
  const [transactionId, setTransactionId] = useState('');
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
  const [clientSecret, setClientSecret] = useState("");
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const [cart, isLoading, refetch] = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
<<<<<<< HEAD
        console.log("Client Secret:", res.data.clientSecret);
=======
        // console.log("Client Secret:", res.data.clientSecret);
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.error("Payment Intent creation error:", err);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const card = elements.getElement(CardElement);
    if (card === null) {
      setIsProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      // console.log("payment error", error);
      setError(error.message);
      setIsProcessing(false);
      return;
    } else {
      setError("");
    }

<<<<<<< HEAD
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
=======
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
    
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
      setIsProcessing(false);
      return;
    }

<<<<<<< HEAD
    if (paymentIntent.status === "succeeded") {
      // console.log('Transaction id', paymentIntent.id);
      setTransactionId(paymentIntent.id);

=======
    if (paymentIntent.status === 'succeeded') {
      // console.log('Transaction id', paymentIntent.id);
      setTransactionId(paymentIntent.id);

      
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
      const firstItemName = cart.length > 0 ? cart[0].name : "Unknown Medicine";

      const payment = {
        buyerEmail: user.email,
        price: totalPrice,
<<<<<<< HEAD
        name: firstItemName,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map((item) => item._id),
        myMdcnIds: cart.map((item) => item.medicineId),
        status: "pending",
      };

      try {
        const res = await axiosSecure.post("/payments", payment);
        console.log("Payment saved", res.data);
=======
        name: firstItemName, 
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cart.map(item => item._id),
        myMdcnIds: cart.map(item => item.medicineId),
        status: 'pending'
      };      

      try {
        const res = await axiosSecure.post('/payments', payment);
        console.log('Payment saved', res.data);
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
        refetch();
        if (res.data.paymentResult.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thanks, your payment was successful",
            showConfirmButton: false,
<<<<<<< HEAD
            timer: 1500,
          });
          navigate("/invoice");
        }
      } catch (error) {
        console.error("Error saving payment:", error);
=======
            timer: 1500
          });
          navigate('/invoice');
        }
      } catch (error) {
        console.error('Error saving payment:', error);
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
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
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                  fontFamily: "Roboto, sans-serif",
                },
                invalid: {
                  color: "#9e2146",
                },
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
<<<<<<< HEAD
        {transactionId && (
          <p className="text-green-600">Your transaction ID: {transactionId}</p>
        )}
=======
        {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
      </form>
    </div>
  );
};

export default CheckoutForm;
