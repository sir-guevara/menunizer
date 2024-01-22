import { IoMdArrowBack } from "react-icons/io";
import { Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import MainLayout from "../layouts/MainLayout";
import Order from "../components/Order";
import AuthContext from "../context/AuthContext";
import { AuthContextType, OrderType } from "../types";
import { completeOrder, fetchOrders } from "../api";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState< [OrderType] >();
  const params = useParams();
  const navigate = useNavigate();
  const auth = useContext(AuthContext) as AuthContextType;

  const onBack = () => navigate(`/places/${params.id}`);

  const onFetchOrders = async () => {
    const allOrders = await fetchOrders({placeId: params.id, token:auth.token}) as [OrderType];
    // console.log(allOrders);
    if (allOrders) {
      setOrders(allOrders);
    }
  };

  const onCompleteOrder = async (orderId:number) => {
    const json = await completeOrder({ id:orderId, data:{ status: "completed" }, token:auth.token }, params.id);
    toast(`Order #${orderId}  completed`,{type: "success"});
    if (json) {
      onFetchOrders();
    }
  };

  useEffect(() => {
    onFetchOrders();
    const interval = setInterval(() => {
      onFetchOrders();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>
      <div className="d-flex align-items-center mb-4">
        <Button variant="link" onClick={onBack}>
          <IoMdArrowBack size={25} color="black" />
        </Button>
        <h3 className="mb-0 ml-2 mr-2">My Orders</h3>
      </div>

      <Row className="justify-content-center">
        {orders
          ?.filter((order) => order.status === "processing")
          ?.map((order) => (
            <Col key={order.id} lg={8}>
              <Order
                order={order}
                onComplete={() => onCompleteOrder(order.id)}
              />
            </Col>
          ))}
      </Row>
    </MainLayout>
  );
};

export default Orders;