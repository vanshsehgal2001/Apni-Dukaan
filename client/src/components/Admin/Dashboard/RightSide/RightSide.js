import React, { useEffect } from 'react'
import './RightSide.css'
import { Link } from 'react-router-dom'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsAdmin, getReviews } from "../../../../redux/actions/product";
import { getOrders } from "../../../../redux/actions/order";
import { getAllUsers } from '../../../../redux/actions/user'

const RightSide = () => {

    let outOfStockCount = 0;

    const { products } = useSelector(state => state.products)
    const { orders } = useSelector(state => state.orders)
    const { users } = useSelector(state => state.users)
    const { reviews } = useSelector(state => state.reviews)
    const dispatch = useDispatch()

    products && products.forEach(product => {
        if (product.inStock === 0) {
            outOfStockCount++;
        }
    })
    let revenue = 0;

    orders && orders.forEach(order => {
        revenue += order.totalPrice
    })

    useEffect(() => {
        dispatch(getProductsAdmin())
        dispatch(getAllUsers())
        dispatch(getOrders());
    }, [dispatch])

    const lineData = {
        labels: [
            "Initial Revenue", "Revenue Till Now"
        ],
        datasets: [
            {
                label: "Total Amount",
                backgroundColor: ["red"],
                data: [0, revenue]
            }
        ]
    }




    const doughnutData = {
        labels: ["Out of Stock", "In Stock"],
        datasets: [
            {
                backgroundColor: ["rgb(194, 59, 59)", "lightseagreen"],
                data: [outOfStockCount, products?.length - outOfStockCount]
            }
        ]
    }


    return (
        <>
            <div className='right-side-panel' >
                <h1>
                    Dashboard
                </h1>
                <div className='dashboard-data' >
                    <div>
                        <h4>
                            Revenue : ₹ {revenue}

                        </h4>
                    </div>
                    <div className='dashboard-data-container-1' >
                        <Link to="/admin/products" >
                            <h3 style={{ color: "wheat" }} > {products?.length} </h3>

                            <h3>Products</h3>
                        </Link>
                        <Link to="/admin/users" >
                            <h3 style={{ color: "wheat" }} > {users && users.length} </h3>

                            <h3>Users</h3>
                        </Link>
                        <Link to="/admin/orders" >
                            <h3 style={{ color: "wheat" }} >{orders && orders.length}</h3>

                            <h3>Orders</h3>
                        </Link>
                        {/* <Link to="/admin/reviews" >
                            <h3 style={{ color: "wheat" }} >10000+</h3>

                            <h3>Reviews</h3>
                        </Link> */}
                    </div>
                </div>

                <div className='line-graph'  >
                    <Line data={lineData} />
                </div>

                <div className='doughnut-graph'  >
                    <Doughnut data={doughnutData} />
                </div>


            </div>
        </>
    )
}

export default RightSide