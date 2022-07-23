import React from 'react'
import { Link } from 'react-router-dom'
import Stars from 'react-rating-stars-component'
import './Product.css'



const Product = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "orange",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true
    }


    return (
        <Link className='product' to={`/product/${product._id}`} >
            <img src={product.images[0].url} alt={product.name} />
            <p style={{ fontWeight: "bold" }} > {product.name} </p>
            <div>
                <Stars {...options} /> <span> ({product.reviewsCount}) </span>
            </div>
            <span> ₹{product.price} </span>
        </Link>
    )
}

export default Product