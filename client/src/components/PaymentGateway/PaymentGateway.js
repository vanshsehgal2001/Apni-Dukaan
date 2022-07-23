import React from 'react'
import Steps from '../Shipping/Steps'
import { MdCreditCard } from 'react-icons/md'
import { BsCalendar2Date } from 'react-icons/bs'
import { BiKey } from 'react-icons/bi'
import { useRef } from 'react'
import './PaymentGateway.css'
import { useDispatch, useSelector } from 'react-redux'

const PaymentGateway = () => {

    const orderInformation = JSON.parse(sessionStorage.getItem('orderInformation'))

    const dispatch = useDispatch()

    const { shippingInfo, cart } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)





    const payment = useRef(null)

    return (
        <>
            <Steps currentStep={2} />
            <div className='payment-gateway-container' >
                <h1>
                    CARD DETAILS
                </h1>
                <form className='payment-gateway-form' onSubmit={onsubmit} >

                    <div>
                        <MdCreditCard />
                    </div>
                    <div>
                        <BsCalendar2Date />
                    </div>
                    <div>
                        <BiKey />
                    </div>
                    <div>
                        <input type="submit" value="Pay" ref={payment} className="payment-gateway-button" />
                    </div>
                </form>
            </div>
        </>
    )
}

export default PaymentGateway