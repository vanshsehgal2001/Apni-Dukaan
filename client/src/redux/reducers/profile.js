import { CLEAR_ERRORS, UPDATE_PASSWORD_ERROR, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_RESET, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_RESET, UPDATE_PROFILE_SUCCESS } from "../types"


export const profileReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                update: payload.success
            }
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }

        case UPDATE_PROFILE_ERROR:
        case UPDATE_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload
            }

        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
            return {
                ...state,
                update: false
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