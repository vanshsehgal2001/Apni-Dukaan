import { CLEAR_ERRORS, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PASSWORD_ERROR, UPDATE_PASSWORD_REQUEST, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS } from "../types"
import axios from 'axios'

export const updateProfile = (data) => {
    return async dispatch => {
        try {
            dispatch({
                type: UPDATE_PROFILE_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }

            const response = await axios.put("/api/my/update", data, config)
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: UPDATE_PROFILE_ERROR,
                payload: error.response.data.msg
            })
        }

    }
}

export const updatePassword = (data) => {
    return async dispatch => {
        try {
            dispatch({
                type: UPDATE_PASSWORD_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': "application/json"
                }
            }

            const response = await axios.put("/api/password/update", data, config)
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: UPDATE_PASSWORD_ERROR,
                payload: error.response.data.msg
            })
        }

    }
}


export const forgotPassword = (email) => {
    return async dispatch => {
        try {
            dispatch({
                type: FORGOT_PASSWORD_REQUEST
            })

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            const response = await axios.post("/api/password/reset", email, config)

            dispatch({
                type: FORGOT_PASSWORD_SUCCESS,
                payload: response.data.message
            })

        } catch (error) {
            dispatch({
                type: FORGOT_PASSWORD_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}

export const resetPassword = (data, token) => {
    return async dispatch => {
        try {
            dispatch({
                type: RESET_PASSWORD_REQUEST
            })

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }


            const response = await axios.put(`/api/password/reset/${token}`, data, config)
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: response.data
            })

        } catch (error) {
            dispatch({
                type: RESET_PASSWORD_ERROR,
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