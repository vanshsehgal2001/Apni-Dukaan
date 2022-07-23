import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { RiLockPasswordLine } from 'react-icons/ri'
import { AiOutlineMail } from 'react-icons/ai'
import './LoginRegister.css'
import { BsPersonFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, login, register } from '../../../redux/actions/user'
import { alert } from 'react-custom-alert'
import Loader from '../../Loader/Loader'
import { useNavigate } from 'react-router-dom'

const LoginRegister = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { errors, loading, isAuthenticated } = useSelector(state => state.user)

    const toggleTab = useRef(null)
    const loginTab = useRef(null)
    const registerTab = useRef(null)

    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [user, setUser] = useState({
        registerName: "",
        registerEmail: "",
        registerPassword: ""
    })

    const [image, setImage] = useState("./profile.png");
    const [imagePreview, setImagePreview] = useState("./profile.png")

    const { registerName, registerEmail, registerPassword } = user

    const registerSubmit = e => {
        e.preventDefault();

        const form = new FormData();
        form.set("name", registerName);
        form.set("email", registerEmail);
        form.set("password", registerPassword);
        form.set("image", image)
        dispatch(register(form))
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
        if (isAuthenticated) {
            navigate("/profile")
        }
    }, [errors, dispatch, isAuthenticated, navigate])

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword))
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors())
        }
    }

    const toggle = (e, tab) => {
        if (tab === "login") {
            toggleTab.current.classList.add("shiftToNeutral");
            toggleTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            toggleTab.current.classList.add("shiftToRight");
            toggleTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    const onchange = (e) => {
        if (e.target.name === "image") {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagePreview(reader.result)
                    setImage(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])

        }
        else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
    }

    return (
        <>
            {
                loading ? <Loader /> : <>
                    <div className="login-register-container" >
                        <div className="login-register-box" >
                            <div>
                                <div className="login-register-toggle" >
                                    <p onClick={e => toggle(e, "login")} >
                                        LOGIN
                                    </p>
                                    <p onClick={e => toggle(e, "register")} >
                                        REGISTER
                                    </p>
                                </div>
                                <button ref={toggleTab} ></button>
                            </div>
                            <form className="login-form" ref={loginTab} onSubmit={loginSubmit} >
                                <div className="login-email" >
                                    <AiOutlineMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={loginEmail}
                                        onChange={e => setLoginEmail(e.target.value)}
                                    />
                                </div>
                                <div className="login-password" >
                                    <RiLockPasswordLine />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={loginPassword}
                                        onChange={e => setLoginPassword(e.target.value)}
                                    />
                                </div>
                                <Link to="/password/forgot">Forgot Password ?</Link>
                                <input type="submit" value="Login" className="login-button" />
                            </form>
                            <form className="register-form"
                                ref={registerTab}
                                encType="multipart/form-data"
                                onSubmit={registerSubmit}
                            >
                                <div className="register-name" >
                                    <BsPersonFill />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={registerName}
                                        onChange={onchange}
                                        name="registerName"
                                    />
                                </div>
                                <div className="register-email" >
                                    <AiOutlineMail />
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={registerEmail}
                                        onChange={onchange}
                                        name="registerEmail"
                                    />
                                </div>
                                <div className="register-password" >
                                    <RiLockPasswordLine />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={registerPassword}
                                        onChange={onchange}
                                        name="registerPassword"
                                    />
                                </div>
                                <div id="register-image" >
                                    <input type="file" name="image" accept="image/*" onChange={onchange} />
                                    <img src={imagePreview} alt="Profile Pic" />

                                </div>
                                <input type="submit" value="Register" className="register-button" />
                            </form>
                        </div>
                    </div>

                </>
            }
        </>
    )
}

export default LoginRegister