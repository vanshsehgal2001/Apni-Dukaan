import { CLEAR_ERRORS, RESET_PASSWORD_ERROR, RESET_PASSWORD_REQUEST, RESET_PASSWORD_RESET, RESET_PASSWORD_SUCCESS } from "../types"

export const resetPasswordReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                status: payload.success
            }
        case RESET_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }

        case RESET_PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                errors: null
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null
            }

        default:
            return state
    }

}