import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import Loader from '../../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import './Profile.css'

const Profile = () => {

    const dispatch = useDispatch();
    const { user, loading, isAuthenticated, errors } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login")
        }
    }, [dispatch, isAuthenticated, navigate])

    return (
        <>
            {
                loading ? <Loader /> : <>
                    <div style={{ marginTop: "30px" }} className="profile" >
                        <div  >
                            <h1 >PROFILE</h1>
                            <img src={user?.image?.url} alt={user?.name} />
                            <Link to="/profile/update" >UPDATE PROFILE</Link>
                        </div>
                        <div>
                            <div className="full-name" >
                                <h3 className="profile-headings3" >Full Name</h3>
                                <h4 className="profile-headings4" style={{ marginTop: "5px", color: "rgba(0,0,0,0.7)" }} > {user?.name} </h4>
                            </div>
                            <div>
                                <h3 className="profile-headings3" >Email</h3>
                                <h4 className="profile-headings4" style={{ marginTop: "5px", color: "rgba(0,0,0,0.7)" }} > {user?.email}</h4>
                            </div>
                            <div>
                                <h3 className="profile-headings3" >Created on </h3>
                                <h4 className="profile-headings4" style={{ marginTop: "5px", color: "rgba(0,0,0,0.7)" }} >
                                    <Moment format="DD/MM/YYYY">
                                        {user?.createdAt}
                                    </Moment>
                                </h4>
                            </div>
                            <div>
                                <Link to="/orders" >My Orders</Link>
                                <Link to="/password/update" >Change Password</Link>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Profile