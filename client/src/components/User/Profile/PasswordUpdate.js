import React, { useEffect, useState } from 'react'
import { alert } from 'react-custom-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updatePassword } from '../../../redux/actions/profile'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../../redux/types'
import { TbLockOpen } from 'react-icons/tb'
import { HiLockClosed } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import './ProfileUpdate.css'
import Loader from '../../Loader/Loader'

const PasswordUpdate = () => {

    const dispatch = useDispatch()
    const { errors, update, loading } = useSelector(state => state.profile)
    const navigate = useNavigate()
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const updateProfileSubmit = e => {
        e.preventDefault();

        const form = new FormData();
        form.set("oldPassword", oldPassword);
        form.set("newPassword", newPassword);
        form.set("confirmPassword", confirmPassword)
        dispatch(updatePassword(form))
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
        if (update) {
            navigate("/profile")
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
    }, [errors, dispatch, update, navigate])

    return (
        <>
            {
                loading ? <Loader /> : <>
                    <div className="profile-update-container" >

                        <div className="profile-update-box" >
                            <h1 style={{ margin: "auto", textAlign: "center", borderBottom: "2px solid grey", padding: "1rem", width: "fit-content", marginTop: "10px" }} >Update Password</h1>

                            <form className="profile-update-form"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div className="login-password" >
                                    <RiLockPasswordLine />
                                    <input
                                        type="password"
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={e => setOldPassword(e.target.value)}
                                    />
                                </div>
                                <div className="login-password" >
                                    <TbLockOpen />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
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

                                <input type="submit" value="Update Password" className="profile-update-button" />
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default PasswordUpdate