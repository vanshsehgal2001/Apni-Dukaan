import { ADD_TO_CART, CLEAR_ERRORS, CREATE_ORDER_ERROR, CREATE_PRODUCT_ERROR, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_RESET, CREATE_PRODUCT_SUCCESS, CREATE_REVIEW_ERROR, CREATE_REVIEW_REQUEST, CREATE_REVIEW_RESET, CREATE_REVIEW_SUCCESS, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_RESET, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_ERROR, DELETE_REVIEW_REQUEST, DELETE_REVIEW_RESET, DELETE_REVIEW_SUCCESS, GET_REVIEWS_ERROR, GET_REVIEWS_REQUEST, GET_REVIEWS_RESET, GET_REVIEWS_SUCCESS, PRODUCTS_ERROR_ADMIN, PRODUCTS_FETCH_ERROR, PRODUCTS_FETCH_SUCCESS, PRODUCTS_REQUEST, PRODUCTS_REQUEST_ADMIN, PRODUCTS_SUCCESS_ADMIN, PRODUCT_FETCH_ERROR, PRODUCT_FETCH_RESET, PRODUCT_FETCH_SUCCESS, PRODUCT_REQUEST, REMOVE_PRODUCT_FROM_CART, SHIPPING_INFORMATION, UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_SUCCESS } from "../types";

export const productsReducer = (state = { products: [] }, action) => {
    const { type, payload } = action;

    switch (type) {
        case PRODUCTS_REQUEST:
        case PRODUCTS_REQUEST_ADMIN:
            return {
                ...state,
                products: [],
                loading: true
            }
        case PRODUCTS_SUCCESS_ADMIN:
            return {
                ...state,
                products: payload.products,
                loading: false,
                errors: null,
            }
        case PRODUCTS_FETCH_SUCCESS:
            return {
                ...state,
                products: payload.products,
                count: payload.prodsCount,
                loading: false,
                errors: null,
                productsPerPage: payload.productsPerPage,
                filteredCount: payload.filteredCount
            }
        case PRODUCTS_FETCH_ERROR:
        case PRODUCTS_ERROR_ADMIN:
            return {
                ...state,
                products: [],
                errors: payload,
                loading: false
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

export const productDetailsReducer = (state = { product: null }, action) => {
    const { type, payload } = action;

    switch (type) {
        case PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
                product: null
            }
        case PRODUCT_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                product: payload.product,
                errors: null
            }
        case PRODUCT_FETCH_ERROR:
            return {
                ...state,
                loading: false,
                product: null,
                errors: payload
            }
        case PRODUCT_FETCH_RESET:
            return {
                ...state,
                loading: false,
                product: null
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

export const cartReducer = (state = { cart: [], shippingInfo: {} }, action) => {
    const { type, payload } = action

    switch (type) {
        case ADD_TO_CART:

            const isPresent = state.cart.find(item => {
                return payload.prod_id === item.prod_id
            })

            if (isPresent) {
                return {
                    ...state,
                    cart: state.cart.map(item => {
                        return item.prod_id === payload.prod_id ? payload : item
                    })
                }
            }
            else {
                return {
                    ...state,
                    cart: [...state.cart, payload]
                }
            }

        case REMOVE_PRODUCT_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.prod_id !== payload)
            }

        case SHIPPING_INFORMATION:
            return {
                ...state,
                shippingInfo: payload
            }


        default:
            return state
    }

}

export const createReviewReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case CREATE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                created: payload
            }
        case CREATE_REVIEW_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload,
                created: false
            }
        case CREATE_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                created: false
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



export const getReviewsReducer = (state = { reviews: [] }, action) => {
    const { type, payload } = action

    switch (type) {
        case GET_REVIEWS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_REVIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: payload
            }
        case GET_REVIEWS_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        case GET_REVIEWS_RESET:
            return {
                ...state,
                loading: false,
                reviews: []
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


export const deleteReviewReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                deleted: payload
            }
        case DELETE_REVIEW_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload,
            }
        case DELETE_REVIEW_RESET:
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


export const createProductReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case CREATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                created: payload.success,
                product: payload.product
            }
        case CREATE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload,
                created: false
            }
        case CREATE_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                created: false
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

export const deleteProductReducer = (state = {}, action) => {
    const { type, payload } = action

    switch (type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                updated: payload.success
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                deleted: payload.success
            }
        case DELETE_PRODUCT_ERROR:
        case UPDATE_PRODUCT_ERROR:
            return {
                ...state,
                loading: false,
                errors: payload,
                deleted: false,
                updated: false
            }
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                updated: false,
                loading: false
            }
        case DELETE_PRODUCT_RESET:

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