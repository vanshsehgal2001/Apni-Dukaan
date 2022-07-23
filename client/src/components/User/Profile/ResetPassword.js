import React, { useEffect, useState } from 'react'
import { alert } from 'react-custom-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, resetPassword } from '../../../redux/actions/profile'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../../redux/types'
import { TbLockOpen } from 'react-icons/tb'
import { HiLockClosed } from 'react-icons/hi'
import './ProfileUpdate.css'
import Loader from '../../Loader/Loader'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {

    const dispatch = useDispatch()
    const { errors, status, loading } = useSelector(state => state.resetPassword)
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { token } = useParams()


    const updateProfileSubmit = e => {
        e.preventDefault();

        const form = new FormData();
        form.set("password", password);
        form.set("confirmPassword", confirmPassword)
        dispatch(resetPassword(form, token))
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors())
        }
    }

    useEffect(() => {
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors())
        }
        if (status) {
            navigate("/login")
        }
    }, [errors, dispatch, status, navigate])

    return (
        <>
            {
                loading ? <Loader /> : <>
                    <div className="profile-update-container" >

                        <div className="profile-update-box" >
                            <h1 style={{ margin: "auto", textAlign: "center", borderBottom: "2px solid grey", padding: "1rem", width: "fit-content", marginTop: "10px" }} >Reset Password</h1>

                            <form className="profile-update-form"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="login-password" >
                                    <TbLockOpen />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="login-password" >
                                    <HiLockClosed />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <input type="submit" value="Change Password" className="profile-update-button" />
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ResetPassword