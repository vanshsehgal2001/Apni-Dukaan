import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrder, updateOrder } from "../../../redux/actions/order";
import { clearErrors } from "../../../redux/actions/product";
import { UPDATE_ORDER_RESET } from "../../../redux/types";
import LeftSide from "../Dashboard/LeftSide/LeftSide";
import { BsCheckAll } from 'react-icons/bs'
import Loader from "../../Loader/Loader";
import './UpdateOrderStatus.css'
import { alert } from 'react-custom-alert'


const ProcessOrder = () => {
    const { order, errors, loading } = useSelector((state) => state.singleOrder);
    const { error: updateErrors, updated } = useSelector((state) => state.updateOrder);
    const { order_id } = useParams()

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("orderStatus", orderStatus);

        dispatch(updateOrder(order_id, myForm));
    };

    const dispatch = useDispatch();

    const [orderStatus, setOrderStatus] = useState("");

    useEffect(() => {
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors());
        }
        if (updateErrors) {
            alert({ message: updateErrors, type: "error" })

            dispatch(clearErrors());
        }
        if (updated) {
            alert({ message: "Status updated successfully", type: "success" })

            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrder(order_id));
    }, [dispatch, errors, order_id, updated, updateErrors]);

    return (
        <>
            <div className="dashboard">
                <LeftSide />
                <div className="create-product-container">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirm-order-container"
                            style={{
                                display: order?.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                <div className="confirm-shipping-details">
                                    <h1>Shipping Info</h1>
                                    <div className="order-details-info">
                                        <div style={{ justifyContent: "center" }} >
                                            <p>Name:</p>
                                            <span>{order?.user && order?.user.name}</span>
                                        </div>
                                        <div style={{ justifyContent: "center" }} >
                                            <p>Phone:</p>
                                            <span>
                                                {order?.shippingInformation && order?.shippingInformation.phone}
                                            </span>
                                        </div>
                                        <div style={{ justifyContent: "center" }} >
                                            <p>Address:</p>
                                            <span>
                                                {order?.shippingInformation &&
                                                    `${order?.shippingInformation.address}, ${order?.shippingInformation.city}, ${order?.shippingInformation.state}, ${order?.shippingInformation.pinCode}, ${order?.shippingInformation.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <h1>Payment</h1>
                                    <div className="order-details-info">
                                        <div style={{ justifyContent: "center" }} >
                                            <p
                                                className={
                                                    order?.paymentInformation &&
                                                        order?.paymentInformation.status === "success"
                                                        ? "green-color-order"
                                                        : "red-color-order"
                                                }
                                            >
                                                {order?.paymentInformation &&
                                                    order?.paymentInformation.status === "success"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div style={{ justifyContent: "center" }} >
                                            <h3 style={{ marginRight: "10px" }} >Amount :</h3>
                                            <h3 style={{ color: "gray" }} >{order?.totalPrice && order?.totalPrice}</h3>
                                        </div>
                                    </div>

                                    <h1>Order Status</h1>
                                    <div className="order-details-info">
                                        <div style={{ justifyContent: "center" }} >
                                            <p
                                                className={
                                                    order?.orderStatus && order?.orderStatus === "Delivered"
                                                        ? "green-color-order"
                                                        : order?.orderStatus === "Shipped" ? "blue-color-order" : "red-color-order"
                                                }
                                            >
                                                {order?.orderStatus && order?.orderStatus.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirm-cart-container">
                                    <h1>Your Cart Items:</h1>
                                    <div className="confirm-cart">
                                        {order && order?.orderItems &&
                                            order?.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.prod_id}`}>
                                                        {item.name}
                                                    </Link>{" "}
                                                    <span>
                                                        {item.quantity} X ₹{item.price} ={" "}
                                                        <b>₹{item.price * item.quantity}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display: order?.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="update-order-form"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Update Status</h1>

                                    <div>
                                        <BsCheckAll />
                                        <select style={{ fontWeight: "bold" }} onChange={(e) => setOrderStatus(e.target.value)}>
                                            <option value=""> {order?.orderStatus} </option>
                                            {order?.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order?.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <div  >
                                        <button
                                            className="create-product-button"
                                            type="submit"
                                            disabled={
                                                loading ? true : false || orderStatus === "" ? true : false
                                            }
                                            style={{ margin: "auto", width: "60%", padding: "0.7rem" }}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProcessOrder;