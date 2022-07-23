import { CLEAR_ERRORS, CREATE_ORDER_ERROR, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_ERROR, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, GET_MY_ORDERS_ERROR, GET_MY_ORDERS_REQUEST, GET_MY_ORDERS_SUCCESS, GET_ORDERS_ERROR, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, GET_ORDER_ERROR, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, UPDATE_ORDER_ERROR, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS } from "../types";

export const orderReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: payload
            }
        case CREATE_ORDER_ERROR:
            return {
                ...state,
                errors: payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state
    }

}


export const getMyOrdersReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_MY_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_MY_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: payload
            }
        case GET_MY_ORDERS_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state
    }

}


export const getOrdersReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: payload
            }
        case GET_ORDERS_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state
    }

}



export const updateOrderReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                updated: payload
            }
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                deleted: payload
            }
        case UPDATE_ORDER_ERROR:
        case DELETE_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                loading: false,
                updated: false
            }
        case DELETE_ORDER_RESET:
            return {
                ...state,
                loading: false,
                deleted: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: null
            }
        default:
            return state
    }

}




export const getOrder = (state = { order: {} }, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: payload
            }
        case GET_ORDER_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        default:
            return state
    }

}