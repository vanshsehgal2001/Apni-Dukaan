import { CLEAR_ERRORS, FORGOT_PASSWORD_ERROR, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_RESET, FORGOT_PASSWORD_SUCCESS } from "../types"

export const forgotPasswordReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: payload
            }
        case FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }

        case FORGOT_PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                message: null,
                errors: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state
    }

}