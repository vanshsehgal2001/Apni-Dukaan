import React, { useEffect, useState } from 'react'
import { alert } from 'react-custom-alert';
import { useDispatch, useSelector } from 'react-redux';
import { setShippingInfo } from '../../redux/actions/product';
import './Shipping.css'
import Steps from './Steps';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {

    const { shippingInfo } = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pinCode, setPinCode] = useState("");

    useEffect(() => {
        setAddress(shippingInfo.address)
        setCity(shippingInfo.city)
        setState(shippingInfo.state)
        setCountry(shippingInfo.country)
        setPinCode(shippingInfo.pinCode)
        setPhone(shippingInfo.phone)
    }, [shippingInfo.address, shippingInfo.city, shippingInfo.country, shippingInfo.state, shippingInfo.phone, shippingInfo.pinCode])


    const onsubmit = (e) => {
        e.preventDefault()
        if (phone.length !== 10) {
            alert({ message: "Phone number should be 10 digits long", type: "error" })
            return;
        }
        const data = {
            phone,
            address,
            city,
            state,
            country,
            pinCode
        }
        dispatch(setShippingInfo(data))
        navigate("/confirm/order")
    }

    return (
        <>
            <Steps currentStep={0} />
            <div className='shipping-container' >
                <h1>
                    Shipping Details
                </h1>

                <form className="shipping-form" encType='multipart/form-data' onSubmit={onsubmit} >
                    <div>
                        <input
                            type="text"
                            placeholder="Address"
                            required
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            name="address"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="City"
                            required
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            name="city"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="State"
                            required
                            value={state}
                            onChange={e => setState(e.target.value)}
                            name="state"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Country"
                            required
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            name="country"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Pin Code"
                            required
                            value={pinCode}
                            onChange={e => setPinCode(e.target.value)}
                            name="pinCode"
                        />
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Phone"
                            required
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            name="phone"
                        />
                    </div>
                    <div>
                        <input type="submit" value="Continue" />
                    </div>
                </form>

            </div>
        </>
    )
}

export default Shipping