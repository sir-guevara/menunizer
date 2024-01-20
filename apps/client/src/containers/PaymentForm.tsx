import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  useStripe,
  useElements,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../api";
import { Button, Form } from "react-bootstrap";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect( () => {
    if (!stripe) {
      return;
    }
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [ stripe])
  




  const onSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "/",
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <Form onSubmit={onSubmit} id="payment-form">
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <Button
        variant="standard"
        block
        type="submit"
        className="mt-4"
        disabled={isLoading}
      >
        {isLoading? "processing...":"Pay"}
      </Button>
      {message && <div id="payment-message">{message}</div>}
    </Form>
  );
};


const stripePromise = loadStripe(
  "pk_test_51OaBwUAFl1D0SNdewhMT2srtrv3HFOifiu2wuksRTudXTrDvbwSMfOYMQMvLHgCPsuiJQ1rbRpduUxNwQWyCA38O000UxOc5bB"
);



const StripeContext = (props)=>{
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createPaymentIntent({
      amount: props.amount,
      detail: props.detail,
      
    }, props.placeId)
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm {...props} />
        </Elements>
      )}
    </div>
  );
}


export default StripeContext;