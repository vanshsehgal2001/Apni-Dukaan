import { combineReducers } from 'redux'
import { forgotPasswordReducer } from './forgotPassword'
import { cartReducer, createProductReducer, createReviewReducer, deleteProductReducer, deleteReviewReducer, getReviewsReducer, productDetailsReducer, productsReducer } from './product'
import { profileReducer } from './profile'
import { resetPasswordReducer } from './resetPassword'
import { getUserReducer, getUsersReducer, updateUserReducer, userReducer } from './user'
import { getMyOrdersReducer, getOrder, getOrdersReducer, orderReducer, updateOrderReducer } from './order'

export const reducer = combineReducers({
    products: productsReducer,
    product: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    cart: cartReducer,
    order: orderReducer,
    myOrders: getMyOrdersReducer,
    singleOrder: getOrder,
    review: createReviewReducer,
    createProduct: createProductReducer,
    deleteProduct: deleteProductReducer,
    orders: getOrdersReducer,
    updateOrder: updateOrderReducer,
    users: getUsersReducer,
    singleUser: getUserReducer,
    updateUser: updateUserReducer,
    reviews: getReviewsReducer,
    deleteReview: deleteReviewReducer
})