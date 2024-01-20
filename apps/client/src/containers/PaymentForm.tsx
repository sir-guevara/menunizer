import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { createPaymentIntent } from "../api";
import { useParams } from "react-router-dom";

export const PaymentForm = ({amount, detail, onDone}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [customerName, setCustomerName] = useState("")
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { error, paymentMethod } = await stripe!.createPaymentMethod({ type: "card", card: elements!.getElement(CardElement)!, billing_details:{name: customerName}})
    console.log(paymentMethod)
    setLoading(false);
    if(error){
      toast(error.message,{type: "error"})
    }
    if(!error){
      const placeId = params.id;
      const table = params.tableNumber
     const data= {
        placeId,
        amount,
        detail,
        table,
        paymentMethod
      }
      const json = await createPaymentIntent(data);
      if(json){
        toast(`Your order ${json?.id} is processing`, {type: "success"});
        onDone();
        setLoading(false);
      }
      else{
        toast(json?.error, {type: "error"});
        setLoading(false);
      }
    }
  };
    

    return (
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control  name="full_name" type="text" required placeholder="Cardholder's name" onChange={(e)=>setCustomerName(e.target.value)}/>
        </Form.Group>
        <CardElement />
        <Button variant="standard" type="submit" disabled={loading} block className="mt-4">
          {loading ? "Processing..." : "Pay"}
        </Button>
      </Form>
    );
  };


const stripePromise = loadStripe(
  "pk_test_51OaBwUAFl1D0SNdewhMT2srtrv3HFOifiu2wuksRTudXTrDvbwSMfOYMQMvLHgCPsuiJQ1rbRpduUxNwQWyCA38O000UxOc5bB"
);

const StipeContext = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm  {...props}/>
    </Elements>
  );
};

export default StipeContext;