import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, admin }) => {

    const { isAuthenticated, loading, user } = useSelector(state => state.user)

    return (
        loading === false && isAuthenticated === false ? (
            <Navigate to="/login" />
        ) : (

            admin === true && user?.role !== "admin" ? (
                <Navigate to="/login" />
            ) : (
                children
            )

        )
    )
};

export default PrivateRoute