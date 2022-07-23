import { CLEAR_ERRORS, DELETE_USER_ERROR, DELETE_USER_REQUEST, DELETE_USER_RESET, DELETE_USER_SUCCESS, GET_USERS_ERROR, GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS, LOAD_USER_ERROR, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_ERROR, LOGOUT_SUCCESS, REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_REQUEST, UPDATE_USER_RESET, UPDATE_USER_SUCCESS } from '../types'

export const userReducer = (state = { user: {} }, action) => {
    const { type, payload } = action;

    switch (type) {
        case LOGIN_REQUEST:
        case REGISTER_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                ...state,
                loading: true,
                user: null,
                isAuthenticated: false
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload,
                isAuthenticated: true,
                errors: null
            }
        case LOGIN_ERROR:
        case REGISTER_ERROR:
        case LOAD_USER_ERROR:
            return {
                ...state,
                errors: payload,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                user: null,
                isAuthenticated: false
            }
        case LOGOUT_ERROR:
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


export const getUsersReducer = (state = { users: [] }, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: payload
            }
        case GET_USERS_ERROR:
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


export const getUserReducer = (state = { user: {} }, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload
            }
        case GET_USER_ERROR:
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


export const updateUserReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                updated: payload
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                deleted: payload
            }
        case UPDATE_USER_ERROR:
        case DELETE_USER_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }
        case UPDATE_USER_RESET:
            return {
                ...state,
                loading: false,
                updated: false
            }
        case DELETE_USER_RESET:
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