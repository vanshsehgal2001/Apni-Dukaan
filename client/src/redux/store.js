import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { reducer } from './reducers/index'

let initialState = {
    cart: {
        cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : {}
    }
}
const middleware = [thunk]

export const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))