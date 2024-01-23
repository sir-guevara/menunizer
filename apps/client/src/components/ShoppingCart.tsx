import { useMemo } from "react";
import { Card } from "react-bootstrap";
import OperationButton from "./OperationButton";
import StripeContext from "../containers/PaymentForm";
import { useParams } from "react-router-dom";
const ShoppingCart = ({ items, onAdd, onRemove, onPaymentDone, color }) => {
  const param = useParams();
  const placeId = param.id;
  
  const totalPrice = useMemo(
    () => items.map((i) => i.quantity * i.price ).reduce((a, b) => parseFloat(`${(a + b).toFixed(2)}`), 0),
    [items]
  );

  return (
    <>
      <h3 className="text-center mb-4">
        <b>Your Order</b>
      </h3>
      <Card>
        <Card.Body>
          {items.map((item) => (
            <div key={item.id} className="d-flex mb-4 align-items-center">
              <div className="flex-grow-1">
                <p className="mb-0">
                  <b>{item.name}</b>
                </p>
                <span>${item.price}</span>
              </div>

              <div className="d-flex align-items-center">
                <OperationButton className="opbnt"
                  variant="lightgray"
                  size="sm"
                  onClick={() => onRemove(item)}
                >
                  -
                </OperationButton>
                <span>{item.quantity}</span>
                <OperationButton className="opbnt"
                  variant="lightgray"
                  size="sm"
                  onClick={() => onAdd(item)}
                >
                  +
                </OperationButton>
              </div>
            </div>
          ))}

          <hr />
          <div className="d-flex justify-content-between">
            <h5>
              <b>Total</b>
            </h5>
            <h5>
              <b>${totalPrice}</b>
            </h5>
          </div>

          <hr className="mb-4" />
          <StripeContext
          amount={totalPrice}
          detail={items}
          placeId={placeId}
          onDone={onPaymentDone}
          color={color}
        />
        </Card.Body>
       
      </Card>
    </>
  );
};

export default ShoppingCart;