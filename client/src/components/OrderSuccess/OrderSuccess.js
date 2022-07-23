import React from 'react'
import { IoMdDoneAll } from 'react-icons/io'
import { Link } from 'react-router-dom'
import './OrderSuccess.css'

const OrderSuccess = () => {
    return (
        <>
            <div className="order-container" >
                <div>
                    <h1>
                        Order Placed Successfully
                    </h1>
                    <IoMdDoneAll />
                </div>
                <Link to="/orders" >View Orders</Link>
            </div>
        </>
    )
}

export default OrderSuccess