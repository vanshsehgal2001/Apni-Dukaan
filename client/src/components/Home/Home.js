import React, { useEffect } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import './Home.css'
import Product from './Product'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProducts } from '../../redux/actions/product'
import Loader from '../Loader/Loader'
import { ImSad } from 'react-icons/im'
import { alert } from 'react-custom-alert'

const Home = () => {
    const products = useSelector(state => state.products)

    const dispatch = useDispatch()

    useEffect(() => {
        if (products.errors) {
            alert({ message: products.errors, type: "error" })
            dispatch(clearErrors())
        }
        else {
            dispatch(getProducts())
        }

    }, [dispatch, products.errors])

    return (
        <>
            {
                products.loading ? <Loader /> :
                    <>
                        <div className="home" >
                            <h1  >Welcome To <span style={{ color: "lightyellow" }} >  APNI DUKAAN</span> </h1>
                            <h2>Storehouse of Amazing Products</h2>
                            <div>
                                <a href="#container" >
                                    <div className="scroll-icon" ><FaArrowDown /></div>
                                </a>
                                <h3 >Scroll Down</h3>
                            </div>
                        </div>
                        <h2 className="home-heading">Featured Products</h2>
                        <div id="container" >
                            {
                                products.products.length === 0 ?
                                    <h3 style={{ marginTop: "30px" }} >
                                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} >
                                            <span>No   Products   Available</span> <ImSad />
                                        </div> </h3> :
                                    products.products.map(product => {
                                        return <Product product={product} key={product._id} />
                                    })
                            }
                        </div>
                    </>
            }
        </>
    )
}

export default Home