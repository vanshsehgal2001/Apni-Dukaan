import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UPDATE_USER_RESET } from "../../../redux/types";
import { clearErrors, getUser, updateUser } from "../../../redux/actions/user";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { alert } from 'react-custom-alert'
import LeftSide from "../Dashboard/LeftSide/LeftSide";
import Loader from "../../Loader/Loader";
import { BiUser } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import { GrUserAdmin } from 'react-icons/gr'
import './UpdateUser.css'

const UpdateUser = () => {
    const dispatch = useDispatch();
    const { user_id } = useParams()
    const navigate = useNavigate()

    const { loading, errors, user } = useSelector((state) => state.singleUser);

    const {
        loading: updateLoading,
        error: updateErrors,
        updated,
    } = useSelector((state) => state.updateUser);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [done, setDone] = useState(false)


    useEffect(() => {
        if (!done || !user) {
            dispatch(getUser(user_id))
            setDone(true)
        }
        else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors());
        }

        if (updateErrors) {
            alert({ message: updateErrors, type: "error" })
            dispatch(clearErrors());
        }

        if (updated) {
            alert({ message: "User Role updated successfully", type: "success" })
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, done, errors, navigate, updated, updateErrors, user, user_id]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(user_id, myForm));
    };

    return (
        <>
            <div className="dashboard">
                <LeftSide />
                <div className="create-product-container">
                    {loading ? (
                        <Loader />
                    ) : (
                        <form
                            className="create-product-form"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User</h1>

                            <div>
                                <BiUser />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                />
                            </div>

                            <div>
                                <GrUserAdmin />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Choose Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <button
                                className="update-user-button"
                                type="submit"
                                disabled={
                                    updateLoading ? true : false || role === "" ? true : false
                                }
                            >
                                Update
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default UpdateUser;