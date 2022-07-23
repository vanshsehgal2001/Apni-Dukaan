import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeProductFromCart } from '../../redux/actions/product'
import './CartItem.css'

const CartItem = ({ item }) => {

    const dispatch = useDispatch()

    const removeProduct = prod_id => {
        dispatch(removeProductFromCart(prod_id))
    }

    return (
        <>
            <div className="cart-item" >
                <img src={item.image} alt={item.name} />
                <div>
                    <Link to={`/product/${item.product}`} > {item.name} </Link>
                    <span> ₹{`${item.price}`} </span>
                    <button onClick={() => removeProduct(item.prod_id)} >
                        Remove
                    </button>
                </div>
            </div>
        </>
    )
}

export default CartItem