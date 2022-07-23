import React, { useEffect, useState } from 'react'
import './Products.css'
import Loader from '../Loader/Loader'
import { getProducts, clearErrors } from '../../redux/actions/product'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../Home/Product'
import Pagination from 'react-js-pagination'
import { BsFilter } from 'react-icons/bs'
import { alert } from 'react-custom-alert'
import { Box, Button, Modal, Slider, Typography } from '@mui/material'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const categories = [
    "laptop",
    "phone",
    "camera",
    "bottom"
]


const Products = () => {

    const dispatch = useDispatch()
    const { products, loading, count, errors, productsPerPage, filteredCount } = useSelector(state => state.products)
    const [currPage, setCurrPage] = useState(1)
    const [price, setPrice] = useState([0, 20000])
    const [open, setOpen] = useState(false)
    const [category, setCategory] = useState("")

    useEffect(() => {
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors())
        }
        else {
            dispatch(getProducts("", currPage))
        }
    }, [dispatch, errors, currPage])

    const onchange = e => {
        setCurrPage(e)
    }

    const priceChange = (e, price) => {
        setPrice(price)
    }

    const applyChanges = () => {
        if (errors) {
            alert({ message: errors, type: "error" })
            return dispatch(clearErrors())
        }
        dispatch(getProducts("", currPage, price, category))
        setOpen(false)
        setCurrPage(1)
    }


    return (
        <>
            {
                loading ? <Loader /> : <>
                    <h1 className='products-header' >Products</h1>
                    <div className='products' >
                        {
                            products && products.map(product => {
                                return <Product product={product} key={product._id} />
                            })
                        }
                    </div>

                    {
                        products && products.length > 0 && <div className="filters-container" >
                            <Button style={{
                                display: "flex", fontSize: "30px", gap: "10px", justifyContent: "center",
                                alignItems: "center",

                            }} onClick={() => setOpen(true)}> <BsFilter /> </Button>
                            <Modal
                                open={open}
                                onClose={() => setOpen(false)}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <div className="filter-price" >
                                        <Typography style={{ fontWeight: "bold" }} >
                                            PRICE
                                        </Typography>

                                        <Slider
                                            value={price}
                                            onChange={priceChange}
                                            valueLabelDisplay="auto"
                                            aria-labelledby='range-slider'
                                            min={0}
                                            max={20000}
                                        />

                                    </div>
                                    <div className="filter-category" >
                                        <Typography style={{ marginTop: "10px", fontWeight: "bold" }} >CATEGORIES</Typography>
                                        <ul className="category-box" >
                                            {
                                                categories.map(cat => {
                                                    return (
                                                        <li className={`category-link ${category === cat && "category-link-active"}`} key={cat} onClick={() => {
                                                            if (category === "") {
                                                                setCategory(cat)
                                                            }
                                                            else if (category === cat) {
                                                                setCategory("")
                                                            }
                                                            else {
                                                                setCategory(cat)
                                                            }
                                                        }} >
                                                            {cat}
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                    <div style={{ margin: "auto", textAlign: "center", marginTop: "20px" }} >
                                        <Button onClick={applyChanges} >APPLY</Button>

                                    </div>
                                </Box>

                            </Modal>
                        </div>
                    }


                    {
                        filteredCount > productsPerPage && <div className="pagination" >
                            <Pagination
                                activePage={currPage}
                                itemsCountPerPage={productsPerPage}
                                totalItemsCount={count}
                                onChange={onchange}
                                // nextPageText="Next"
                                // prevPageText="Prev"
                                // firstPageText="1"
                                // lastPageText="Last"
                                itemClass='page-item'
                                linkClass='page-link'
                                activeClass="page-item-active"
                                activeLinkClass="page-link-active"
                            />
                        </div>
                    }
                </>
            }
        </>
    )
}

export default Products