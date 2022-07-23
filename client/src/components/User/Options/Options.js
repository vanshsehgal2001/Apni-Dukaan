import React, { useState } from 'react'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { MdDashboard } from 'react-icons/md'
import { BsPersonFill } from 'react-icons/bs'
import { AiTwotoneShopping } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { alert } from 'react-custom-alert'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../../redux/actions/user'
import './Options.css'

const Options = ({ user }) => {

    const { image, isAuthenticated, role } = user;
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)

    return (
        <>
            <SpeedDial ariaLabel='SpeedDial tooltip example'
                className='speed-dial'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction="down"
                style={{ zIndex: "11" }}
                icon={
                    <img
                        height="60"
                        width="60"
                        src={image.url}
                        alt="profile" className="speed-dial-icon" />
                }
            >

                {
                    role === "admin" &&
                    <SpeedDialAction onClick={() => navigate("/dashboard")} name="dashboard" icon={<MdDashboard />} tooltipTitle="Dashboard" />
                }
                <SpeedDialAction onClick={() => navigate("/orders")} name="orders" icon={<AiTwotoneShopping />} tooltipTitle="Orders" />
                <SpeedDialAction onClick={() => navigate("/profile")} name="profile" icon={<BsPersonFill />} tooltipTitle="Profile" />
                <SpeedDialAction onClick={() => navigate("/cart")} name="cart" icon={<FiShoppingCart style={{ backgroundColor: cart.length > 0 ? "orange" : "white", padding: "13px", borderRadius: "100%" }} />} tooltipTitle={`Cart (${cart.length})`} />
                <SpeedDialAction onClick={() => {
                    dispatch(logout())
                    alert.success("Logout Successfull")
                }} name="logout" icon={<FiLogOut />} tooltipTitle="Logout" />

            </SpeedDial>
        </>
    )
}

export default Options