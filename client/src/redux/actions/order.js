import axios from 'axios'
import { CLEAR_ERRORS, CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_ERROR, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, GET_MY_ORDERS_ERROR, GET_MY_ORDERS_REQUEST, GET_MY_ORDERS_SUCCESS, GET_ORDERS_ERROR, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, UPDATE_ORDER_ERROR, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from '../types'

export const createOrder = (order) => {
    return async dispatch => {

        try {
            dispatch({
                type: CREATE_ORDER_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post("/api/order/create", order, config)
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: CREATE_ORDER_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}

export const getMyOrders = () => {
    return async dispatch => {
        try {
            dispatch({
                type: GET_MY_ORDERS_REQUEST
            })

            const response = await axios.get("/api/orders/my")
            dispatch({
                type: GET_MY_ORDERS_SUCCESS,
                payload: response.data.orders
            })

        } catch (error) {
            dispatch({
                type: GET_MY_ORDERS_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const getOrder = (order_id) => {
    return async dispatch => {
        try {
            dispatch({
                type: GET_ORDER_REQUEST
            })

            const response = await axios.get(`/api/order/${order_id}`)
            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: response.data.order
            })

        } catch (error) {
            dispatch({
                type: GET_ORDER_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const getOrders = () => {
    return async dispatch => {
        try {
            dispatch({
                type: GET_ORDERS_REQUEST
            })

            const response = await axios.get("/api/admin/orders")
            dispatch({
                type: GET_ORDERS_SUCCESS,
                payload: response.data.orders
            })

        } catch (error) {
            dispatch({
                type: GET_ORDERS_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const updateOrder = (order_id, order) => {
    return async dispatch => {

        try {
            dispatch({
                type: UPDATE_ORDER_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.put(`/api/admin/order/${order_id}`, order, config)
            dispatch({
                type: UPDATE_ORDER_SUCCESS,
                payload: data.success
            })
        } catch (error) {
            dispatch({
                type: UPDATE_ORDER_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}

export const deleteOrder = (order_id) => {
    return async dispatch => {

        try {
            dispatch({
                type: DELETE_ORDER_REQUEST
            })

            const { data } = await axios.delete(`/api/admin/order/${order_id}`)
            dispatch({
                type: DELETE_ORDER_SUCCESS,
                payload: data.success
            })
        } catch (error) {
            dispatch({
                type: DELETE_ORDER_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}

export const clearErrors = () => {
    return async dispatch => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }
}
