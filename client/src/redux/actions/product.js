import { ADD_TO_CART, CLEAR_ERRORS, CREATE_PRODUCT_ERROR, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_REVIEW_ERROR, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, DELETE_PRODUCT_ERROR, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_REVIEW_ERROR, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, GET_REVIEWS_ERROR, GET_REVIEWS_REQUEST, GET_REVIEWS_SUCCESS, PRODUCTS_ERROR_ADMIN, PRODUCTS_FETCH_ERROR, PRODUCTS_FETCH_SUCCESS, PRODUCTS_REQUEST, PRODUCTS_REQUEST_ADMIN, PRODUCTS_SUCCESS_ADMIN, PRODUCT_FETCH_ERROR, PRODUCT_FETCH_SUCCESS, PRODUCT_REQUEST, REMOVE_PRODUCT_FROM_CART, SHIPPING_INFORMATION, UPDATE_PRODUCT_ERROR, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS } from "../types";
import axios from 'axios'

export const getProducts = (word = "", currPage = 1, price = [0, 20000], category) => {
    return async dispatch => {
        try {

            dispatch({
                type: PRODUCTS_REQUEST
            })
            let response;
            if (category) {
                response = await axios.get(`/api/products?keyword=${word}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`)
            }
            else {
                response = await axios.get(`/api/products?keyword=${word}&page=${currPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`)
            }
            dispatch({
                type: PRODUCTS_FETCH_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: PRODUCTS_FETCH_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const getProductsAdmin = () => {
    return async dispatch => {
        try {

            dispatch({
                type: PRODUCTS_REQUEST_ADMIN
            })
            const response = await axios.get("/api/admin/products")
            dispatch({
                type: PRODUCTS_SUCCESS_ADMIN,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: PRODUCTS_ERROR_ADMIN,
                payload: error.response.data.msg
            })
        }
    }
}



export const getProduct = prod_id => {
    return async dispatch => {
        try {
            dispatch({
                type: PRODUCT_REQUEST
            })

            const response = await axios.get(`/api/product/${prod_id}`)
            dispatch({
                type: PRODUCT_FETCH_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: PRODUCT_FETCH_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}

export const addToCart = (prod_id, quantity) => {
    return async (dispatch, getState) => {
        const response = await axios.get(`/api/product/${prod_id}`)
        dispatch({
            type: ADD_TO_CART,
            payload: {
                prod_id: prod_id,
                quantity: quantity,
                name: response.data.product.name,
                price: response.data.product.price,
                image: response.data.product.images[0].url,
                stock: response.data.product.inStock,
            }
        })

        localStorage.setItem('cart', JSON.stringify(getState().cart.cart))
    }
}

export const removeProductFromCart = (prod_id) => {
    return async (dispatch, getState) => {

        dispatch({
            type: REMOVE_PRODUCT_FROM_CART,
            payload: prod_id
        })

        localStorage.setItem('cart', JSON.stringify(getState().cart.cart))


    }
}

export const setShippingInfo = (data) => {
    return async dispatch => {
        dispatch({
            type: SHIPPING_INFORMATION,
            payload: data
        })

        localStorage.setItem("shippingInfo", JSON.stringify(data))

    }
}


export const createReview = (data) => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_REVIEW_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': "application/json"
                }
            }

            const response = await axios.post(`/api/product/review`, data, config)

            dispatch({
                type: CREATE_REVIEW_SUCCESS,
                payload: response.data.success
            })
        } catch (error) {
            dispatch({
                type: CREATE_REVIEW_ERROR,
                payload: error.response.data.msg
            })
        }

    }
}


export const createProduct = (data) => {
    return async dispatch => {
        try {
            dispatch({
                type: CREATE_PRODUCT_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }

            const response = await axios.post(`/api/admin/product/create`, data, config)

            dispatch({
                type: CREATE_PRODUCT_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: CREATE_PRODUCT_ERROR,
                payload: error.response.data.msg
            })
        }

    }
}


export const updateProduct = (prod_id, data) => {
    return async dispatch => {
        try {
            dispatch({
                type: UPDATE_PRODUCT_REQUEST
            })

            const config = {
                headers: {
                    'Content-Type': "multipart/form-data"
                }
            }

            const response = await axios.put(`/api/admin/product/${prod_id}`, data, config)

            dispatch({
                type: UPDATE_PRODUCT_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: UPDATE_PRODUCT_ERROR,
                payload: error.response.data.msg
            })
        }

    }
}


export const deleteProduct = (prod_id) => {
    return async dispatch => {
        try {
            dispatch({
                type: DELETE_PRODUCT_REQUEST
            })

            const response = await axios.delete(`/api/admin/product/${prod_id}`)

            dispatch({
                type: DELETE_PRODUCT_SUCCESS,
                payload: response.data
            })
        } catch (error) {
            dispatch({
                type: DELETE_PRODUCT_ERROR,
                payload: error.response.data.msg
            })
        }

    }
}


export const getReviews = (prod_id) => {
    return async dispatch => {
        try {
            dispatch({
                type: GET_REVIEWS_REQUEST
            })

            const response = await axios.get(`/api/reviews?prod_id=${prod_id}`)
            dispatch({
                type: GET_REVIEWS_SUCCESS,
                payload: response.data.reviews
            })
        } catch (error) {
            dispatch({
                type: GET_REVIEWS_ERROR,
                payload: error.response.data.msg
            })
        }
    }
}


export const deleteReview = (prod_id, review_id) => {
    return async dispatch => {
        try {
            dispatch({
                type: DELETE_REVIEW_REQUEST
            })

            const response = await axios.delete(`/api/review?prod_id=${prod_id}&review_id=${review_id}`)
            dispatch({
                type: DELETE_REVIEW_SUCCESS,
                payload: response.data.success
            })
        } catch (error) {
            dispatch({
                type: DELETE_REVIEW_ERROR,
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