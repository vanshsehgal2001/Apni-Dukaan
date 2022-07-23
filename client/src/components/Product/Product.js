import React, { useEffect, useState } from 'react'
import { addToCart, clearErrors, createReview, getProduct } from '../../redux/actions/product'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import SimpleImageSlider from "react-simple-image-slider";
import './Product.css'
import Stars from 'react-rating-stars-component'
import Loader from '../Loader/Loader'
import Review from './Review';
import { alert } from 'react-custom-alert'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Rating, TextField } from '@mui/material'
import { CREATE_REVIEW_RESET } from '../../redux/types';

const Product = () => {

    const dispatch = useDispatch()
    const { product, loading, errors } = useSelector(state => state.product)
    const { errors: reviewErrors, created } = useSelector(state => state.review)
    let { prod_id } = useParams()
    const [quantity, setQuantity] = useState(1)
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState("")
    const [comment, setComment] = useState("")

    useEffect(() => {
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors())
        }
        if (reviewErrors) {
            alert({ message: reviewErrors, type: "error" })
            dispatch(clearErrors())
        }
        if (created) {
            alert({ message: "Review added successfully", type: "success" })
            dispatch({
                type: CREATE_REVIEW_RESET
            })
        }
        dispatch(getProduct(prod_id))
    }, [dispatch, prod_id, errors, created, reviewErrors])

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "orange",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product?.ratings,
        isHalf: true
    }

    const increment = e => {
        const newQuantity = quantity + 1;
        if (newQuantity > product.inStock) {
            return;
        }
        setQuantity(newQuantity)
    }

    const decrement = e => {
        const newQuantity = quantity - 1;
        if (newQuantity <= 0) {
            return;
        }
        setQuantity(newQuantity)
    }

    const addCart = e => {
        dispatch(addToCart(prod_id, quantity))
        alert({ message: "Item added to cart", type: "success" })
    }

    const onclick = () => {
        const data = new FormData()

        data.set("rating", rating)
        data.set("product_id", prod_id)
        data.set("comment", comment)
        dispatch(createReview(data))
        setOpen(false)
        setComment("");
        setRating("")
    }

    return (
        <>
            {
                loading ? <Loader /> : (
                    <>
                        {
                            product && product.images && <>
                                <div className="product-card" >
                                    <div className="product-image-slider" >
                                        <SimpleImageSlider
                                            width={350}
                                            height={400}
                                            images={product.images}
                                            showBullets={true}
                                            showNavs={true}
                                            // autoPlay={true}
                                            // slideDuration={1}
                                            bgColor="white"
                                            navMargin={0}
                                            navStyle={3}
                                        />
                                    </div>
                                    <div className="product-info" >
                                        <div className="section-1" >
                                            <h2> {product.name} </h2>
                                            <p> <span style={{ color: "black" }} >Category :</span> {product.category} </p>
                                        </div>

                                        <div className='section-2' >
                                            <Stars {...options} />
                                            <span> (  {product.reviewsCount}  ) </span>

                                        </div>

                                        <div className="section-3" >
                                            <h2> ₹ {product.price} </h2>
                                            <div className="subsection" >
                                                <div className="subsection-1" >
                                                    <button onClick={decrement} > - </button>
                                                    <input readOnly value={quantity} type="number" />
                                                    <button onClick={increment} > + </button>
                                                </div>
                                                <button disabled={product.inStock === 0} className="add-to-cart" onClick={addCart} > Add to Cart </button>
                                            </div>
                                            <p style={{ marginTop: "1rem" }} >
                                                <b style={{ color: `${product.inStock === 0 ? "red" : "green"}` }} className={product.inStock === 0 ? "color-red" : "color-green"} >
                                                    {product.inStock === 0 ? "Out of Stock" : "In Stock"}
                                                </b>
                                            </p>
                                        </div>
                                        <div className="section-4" >
                                            <h3 style={{ fontWeight: "bold" }} >Description</h3> <p> {product.description} </p>
                                        </div>
                                        <button onClick={() => setOpen(true)} className="add-review-button" >Add Review</button>
                                    </div>
                                </div>

                                <Dialog className="review-dialog" open={open} onClose={() => setOpen(false)} >
                                    <DialogTitle className="dialog-title" >
                                        ADD REVIEW
                                    </DialogTitle>
                                    <DialogContent className='add-review-dialog' >
                                        <Rating onChange={e => setRating(e.target.value)} value={rating} >

                                        </Rating>
                                        <TextField
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                            multiline
                                            placeholder="Add Review"
                                            cols={60} rows={7}
                                            id="standard-multiline-flexible"
                                            style={{ fontWeight: "bold" }}
                                        >

                                        </TextField>
                                    </DialogContent>
                                    <DialogActions className="dialog-buttons" >
                                        <Button onClick={() => setOpen(false)} >
                                            Cancel
                                        </Button>
                                        <Button onClick={onclick} >
                                            Submit
                                        </Button>
                                    </DialogActions>

                                </Dialog>
                            </>

                        }




                        <h2 className='reviews-heading' >REVIEWS</h2>
                        {

                            product?.reviews && product?.reviews[0] ? (
                                <div className="reviews" >
                                    {
                                        product.reviews &&
                                        product.reviews.map(review => {
                                            return <Review review={review} key={review._id} />
                                        })
                                    }
                                </div>
                            ) : (
                                <p className="no-reviews" >No Reviews Yet</p>
                            )
                        }

                    </>
                )
            }
        </>
    )
}

export default Product