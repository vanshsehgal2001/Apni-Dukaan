import React from 'react'
import './Cart.css'
import CartItem from './CartItem'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/actions/product'
import { MdOutlineRemoveShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Cart = () => {

    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.cart)
    const navigate = useNavigate()


    const increment = (prod_id, quantity, inStock) => {
        const newQuantity = quantity + 1;
        if (newQuantity > inStock) {
            return;
        }
        dispatch(addToCart(prod_id, newQuantity))
    }

    const decrement = (prod_id, quantity) => {
        const newQuantity = quantity - 1;
        if (newQuantity <= 0) {
            return;
        }
        dispatch(addToCart(prod_id, newQuantity))
    }

    return (
        <>
            {
                cart && cart.length === 0 ? <>
                    <div className='cart-empty' >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} >
                            <h1>NO ITEMS IN CART </h1>
                            <MdOutlineRemoveShoppingCart style={{ fontSize: "30px" }} />
                        </div>
                        <Link to="/products" >
                            CHECKOUT OUR PRODUCTS

                        </Link>
                    </div>
                </> : <>
                    <div className="cart" >
                        <h1>Your Cart</h1>
                        <div className="cart-top" >
                            <h3>
                                Product
                            </h3>
                            <h3>
                                Quantity
                            </h3>
                            <h3>
                                Total
                            </h3>
                        </div>
                        {
                            cart && cart.map(item => {
                                return (
                                    <div key={item.prod_id} className="cart-container" >
                                        <CartItem item={item} />
                                        <div className="cart-input" >
                                            <button onClick={() => decrement(item.prod_id, item.quantity)}  > - </button>
                                            <input type="number" value={item.quantity} readOnly />
                                            <button onClick={() => increment(item.prod_id, item.quantity, item.stock)}  > + </button>
                                        </div>
                                        <h3 className="cart-total" > ₹{`${item.price * item.quantity}`} </h3>
                                    </div>
                                )
                            })
                        }
                        <div className='cart-grand-total' >
                            <div className='cart-grand-total-box' >
                                <h2>Grand Total</h2>
                                <h3>₹{`${cart.reduce((ans, item) => {
                                    return ans + item.price * item.quantity
                                }, 0)}`}
                                </h3>
                            </div>
                            <div>

                            </div>
                            <div className='cart-checkout-button' >
                                <button onClick={() => navigate("/checkout")} >Checkout</button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Cart