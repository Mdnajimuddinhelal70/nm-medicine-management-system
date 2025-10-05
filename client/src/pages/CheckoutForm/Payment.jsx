<<<<<<< HEAD
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
console.log(stripePromise);
const Payment = () => {
  return (
    <div>
      <h2 className="text-2xl text-center font-bold">Payment</h2>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
=======
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
// console.log(stripePromise)
const Payment = () => {
    return (
        <div>
            <h2 className="text-2xl text-center font-bold">Payment</h2>
            <div>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
};

export default Payment;
