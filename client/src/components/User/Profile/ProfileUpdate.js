import React, { useEffect, useState } from 'react'
import { alert } from 'react-custom-alert'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors, updateProfile } from '../../../redux/actions/profile'
import { useNavigate } from 'react-router-dom'
import { loadUser } from '../../../redux/actions/user'
import { UPDATE_PROFILE_RESET } from '../../../redux/types'
import { BsPersonFill } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import './ProfileUpdate.css'
import Loader from '../../Loader/Loader'

const ProfileUpdate = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const { errors, update, loading } = useSelector(state => state.profile)
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [imagePreview, setImagePreview] = useState("/profile.png");


    const updateProfileSubmit = e => {
        e.preventDefault();

        const form = new FormData();
        form.set("name", name);
        form.set("email", email);
        form.set("image", image)
        dispatch(updateProfile(form))
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors())
        }
    }

    const imageChange = (e) => {
        const reader = new FileReader()

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result)
                setImage(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

    }

    useEffect(() => {

        if (user) {
            setName(user.name)
            setEmail(user.email)
            setImagePreview(user.image.url)
        }
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors())
        }
        if (update) {
            dispatch(loadUser())
            navigate("/profile")
            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }
    }, [errors, dispatch, update, navigate, user])

    return (
        <>
            {
                loading ? <Loader /> : <>
                    <div className="profile-update-container" >

                        <div className="profile-update-box" >
                            <h1 style={{ margin: "auto", textAlign: "center", borderBottom: "2px solid grey", padding: "1rem", width: "fit-content", marginTop: "10px" }} >Update Profile</h1>

                            <form className="profile-update-form"
                                encType="multipart/form-data"
                                onSubmit={updateProfileSubmit}
                            >
                                <div >
                                    <BsPersonFill />
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        name="name"
                                    />
                                </div>
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
                                <div id="profile-update-image" >
                                    <input type="file" name="image" accept="image/*" onChange={imageChange} />
                                    <img src={imagePreview} alt="Profile Pic" />

                                </div>
                                <input type="submit" value="Update" className="profile-update-button" />
                            </form>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ProfileUpdate