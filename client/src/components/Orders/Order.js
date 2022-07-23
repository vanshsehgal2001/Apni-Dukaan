import React, { useEffect } from "react";
import "./Order.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, getOrder } from "../../redux/actions/order";
import { alert } from 'react-custom-alert'
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const Order = () => {
  const { order, errors, loading } = useSelector((state) => state.singleOrder);
  const { order_id } = useParams()
  const dispatch = useDispatch();

  useEffect(() => {
    if (errors) {
      alert({ message: errors, type: "error" })
      dispatch(clearErrors());
    }

    dispatch(getOrder(order_id));
  }, [dispatch, errors, order_id]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className="order-heading" >
            Order #{order && order._id}
          </h1>
          <div className="order-details-container">

            <div className="order-details">

              <div className="order-details-info">
                <h1>Shipping Info</h1>

                <div>
                  <p>Name:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Phone:</p>
                  <span>
                    {order.shippingInformation && order.shippingInformation.phone}
                  </span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInformation &&
                      `${order.shippingInformation.address}, ${order.shippingInformation.city}, ${order.shippingInformation.state}, ${order.shippingInformation.pinCode}, ${order.shippingInformation.country}`}
                  </span>
                </div>
              </div>
              <div className="order-details-info">
                <h1>Payment</h1>

                <div>
                  <p
                    className={
                      order.paymentInformation &&
                        order.paymentInformation.status === "success"
                        ? "green-color-order"
                        : "red-color-order"
                    }
                  >
                    {order.paymentInformation &&
                      order.paymentInformation.status === "success"
                      ? "PAID"
                      : "NOT PAID"}
                  </p>
                </div>

                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice && order.totalPrice}</span>
                </div>
              </div>

              <div className="order-details-info">
                <h1>Order Status</h1>

                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Delivered"
                        ? "green-color-order"
                        : order.orderStatus === "Shipped" ? "blue-color-order" : "red-color-order"
                    }
                  >
                    {order.orderStatus && order.orderStatus.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            <div className="order-details-cartinfo-container">
              <div className="order-details-cartinfo">
                <h1>Order</h1>

                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.prod_id}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>
                        {item.name}
                      </Link>{" "}
                      <span>
                        {item.quantity} X ₹{item.price} ={" "}
                        <b  >₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Order;