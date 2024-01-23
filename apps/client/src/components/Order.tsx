import { Card, Button } from "react-bootstrap";

const Order = ({ order, onComplete }) => {
  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between">
        <span>{`Order #${order.id} - Table #${order.table}`}</span>
        <span>
          <b>${order.amount}</b>
        </span>
      </Card.Header>
      <Card.Body className="flex d-flex justify-content-between">
        <div>
          {JSON.parse(order.detail).map((item) => (
            <div className="mb-2 d-flex">
              <span>x{item.quantity}</span>
              <img
                src={item.image}
                alt="gg"
                style={{ borderRadius: 3, margin: "0 10px", width:"50px", height:"50px" }}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>

        <div>
          {onComplete ? (
            <Button variant="standard" size="sm" onClick={onComplete}>
              Done
            </Button>
          ) : null}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Order;