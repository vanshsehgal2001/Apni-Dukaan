import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ConfirmOrder.css";
import { Link } from "react-router-dom";
import Steps from './Steps'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { alert } from 'react-custom-alert'
import { clearErrors, createOrder } from "../../redux/actions/order";


const ConfirmOrder = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInformation'))
    const { shippingInfo, cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { errors } = useSelector(state => state.order)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [done, setDone] = useState(false)
    const [status, setStatus] = useState("fail")
    const [orderid, setOrderid] = useState("")

    const total = cart.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = total > 1000 ? 0 : 200;

    const tax = total * 0.18;

    const grandTotal = total + tax + shippingCharges;

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;


    const getKey = async () => {
        const { data: { key } } = await axios.get("/api/getkey")
        return key
    }
    var info;
    const proceedToPayment = async () => {
        const data = {
            total,
            shippingCharges,
            tax,
            grandTotal,
        };

        sessionStorage.setItem("orderInformation", JSON.stringify(data));
        const key = getKey()

        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }

        const response = await axios.post("/api/payment", { amount: grandTotal }, config)
        // info = response.data.order.id
        setOrderid(response.data.order.id)



        const options = {
            key: key,
            amount: response.data.order.amount,
            currency: "INR",
            name: "Apni Dukaan",
            description: "Test Transaction",
            order_id: response.data.order.id,
            handler: async respons => {
                try {
                    const url = "/api/paymentverification"
                    const resp = await axios.post(url, respons)
                    // info = resp.data
                    setStatus("success")
                    setDone(true)
                } catch (error) {
                }
            },
            theme: {
                "color": "#3399cc"
            }
        };
        var razor = new window.Razorpay(options);
        razor.open()



    };


    useEffect(() => {
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors())
        }
        if (done) {
            const userData = {
                shippingInformation: shippingInfo,
                paymentInformation: {
                    status: status,
                    id: orderid
                },
                orderItems: cart,
                itemsPrice: orderInfo.total,
                taxPrice: orderInfo.tax,
                shippingPrice: orderInfo.shippingCharges,
                totalPrice: orderInfo.grandTotal,
            }

            dispatch(createOrder(userData))
            navigate("/success")
            setDone(false)
            localStorage.removeItem("cart")
        }
    }, [errors, dispatch, cart, done, info, navigate, orderInfo.grandTotal, orderInfo.shippingCharges, orderInfo.tax, orderInfo.total, orderid, shippingInfo, status])


    return (
        <Fragment>
            <Steps currentStep={1} />
            <div className="confirm-order-container">
                <div>
                    <div className="confirm-details">
                        <h1  >SHIPPING INFO</h1>
                        <div className="confirm-user-details">
                            <div>
                                <p>Name:</p>
                                <span>{user?.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo?.phone}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirm-cart-container">
                        <h1>CART ITEMS</h1>
                        <div className="confirm-cart">
                            {cart &&
                                cart.map((item) => (
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
                <div>
                    <div className="order-summary">
                        <h1>SUMMARY</h1>
                        <div>
                            <div>
                                <p>Total:</p>
                                <span>₹{total}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>

                        <div className="grand-total">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{grandTotal}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default ConfirmOrder;