import axios from 'axios'
import { CLEAR_ERRORS, DELETE_USER_REQUEST, DELETE_USER_ERROR, DELETE_USER_SUCCESS, GET_USERS_ERROR, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS, LOAD_USER_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS } from '../types'

export const login = (email, password) => {
    return async dispatch => {
        try {
            dispatch({
                type: LOGIN_REQUEST
            })

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const data = { email, password }

            const response = await axios.post("/api/login", data, config)

            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data.user
            })

        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const register = (data) => {
    return async dispatch => {
        try {
            dispatch({
                type: REGISTER_REQUEST
            })

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const response = await axios.post("/api/register", data, config)

            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data.user
            })

        } catch (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const loadUser = () => {
    return async dispatch => {
        try {
            dispatch({
                type: LOAD_USER_REQUEST
            })

            const response = await axios.get("/api/my")

            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: response.data.user
            })

        } catch (error) {
            dispatch({
                type: LOAD_USER_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const logout = () => {
    return async dispatch => {
        try {

            await axios.post("/api/logout")

            dispatch({
                type: LOGOUT_SUCCESS
            })

        } catch (error) {
            dispatch({
                type: LOGOUT_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        try {
            dispatch({
                type: GET_USERS_REQUEST
            })
            const response = await axios.get("/api/admin/users")
            dispatch({
                type: GET_USERS_SUCCESS,
                payload: response.data.users
            })
        } catch (error) {
            dispatch({
                type: GET_USERS_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const getUser = (user_id) => {
    return async dispatch => {
        try {
            dispatch({
                type: GET_USER_REQUEST
            })
            const response = await axios.get(`/api/admin/user/${user_id}`)
            dispatch({
                type: GET_USER_SUCCESS,
                payload: response.data.user
            })
        } catch (error) {
            dispatch({
                type: GET_USER_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const updateUser = (user_id, data) => {
    return async dispatch => {
        try {
            dispatch({
                type: UPDATE_USER_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }

            const response = await axios.put(`/api/admin/user/${user_id}`, data, config)
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: response.data.success
            })
        } catch (error) {
            dispatch({
                type: UPDATE_USER_ERROR,
                payload: error.response.data.msg
            })
        }

    }
}


export const deleteUser = (user_id) => {
    return async dispatch => {
        try {
            dispatch({
                type: DELETE_USER_REQUEST
            })

            const response = await axios.delete(`/api/admin/user/${user_id}`)
            dispatch({
                type: DELETE_USER_SUCCESS,
                payload: response.data.success
            })
        } catch (error) {
            dispatch({
                type: DELETE_USER_ERROR,
                payload: error.response.data.msg
            })
        }

    }
}


export const clearErrors = () => {
    return async dispatch => {
        dispatch({ type: CLEAR_ERRORS })
    }
}