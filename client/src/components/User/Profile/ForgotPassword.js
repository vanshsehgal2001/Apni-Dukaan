import React, { useEffect, useState } from 'react'
import { alert } from 'react-custom-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, forgotPassword } from '../../../redux/actions/profile'
import { AiOutlineMail } from 'react-icons/ai'
import './ProfileUpdate.css'
import Loader from '../../Loader/Loader'

const ForgotPassword = () => {

    const dispatch = useDispatch()
    const { errors, message, loading } = useSelector(state => state.forgotPassword)
    const [email, setEmail] = useState("");


    const onsubmit = e => {
        e.preventDefault();

        const form = new FormData();
        form.set("email", email);
        dispatch(forgotPassword(form))
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors())
        }
        else {
            alert({ message: message, type: "success" })
        }
    }

    // useEffect(() => {
    //     if (errors) {
    //         alert({ message: errors, type: "error" })
    //         return dispatch(clearErrors())
    //     }
    //     if (message) {
    //         alert({ message, type: "success" })
    //     }
    // }, [errors, dispatch, message])

    return (
        <>
            {
                loading ? <Loader /> : <>
                    <div className="profile-update-container" >

                        <div className="profile-update-box" >
                            <h1 style={{ margin: "auto", textAlign: "center", borderBottom: "2px solid grey", padding: "1rem", width: "fit-content", marginTop: "10px" }} >Forgot Password</h1>

                            <form className="profile-update-form"
                                encType="multipart/form-data"
                                onSubmit={onsubmit}
                            >
                                <div>
                                    <AiOutlineMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        name="email"
                                    />
                                </div>

                                <input type="submit" value="Send" className="profile-update-button" />
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ForgotPassword