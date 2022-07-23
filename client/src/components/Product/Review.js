import React from 'react'
import profile from '../../assets/profile.png'
import Stars from 'react-rating-stars-component'
import './Product.css'

const Review = ({ review }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "orange",
        size: window.innerWidth < 600 ? 15 : 20,
        value: review?.rating,
        isHalf: true
    }

    return (
        <div className="review" >

            <img src={profile} alt="user" />
            <p> {review.name} </p>
            <Stars {...options} />
            <span> {review.comment} </span>
        </div>
    )
}

export default Review