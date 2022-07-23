import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LeftSide from '../Dashboard/LeftSide/LeftSide'
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import { clearErrors, deleteProduct, getProductsAdmin } from "../../../redux/actions/product";
import './AdminProducts.css'
import Loader from "../../Loader/Loader";
import { alert } from 'react-custom-alert'
import { DELETE_PRODUCT_RESET } from "../../../redux/types";
import { useNavigate } from 'react-router-dom'

const AdminProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { errors, products, loading } = useSelector((state) => state.products);
    const { deleted, errors: deleteErrors } = useSelector(state => state.deleteProduct)

    useEffect(() => {
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors());
        }
        if (deleteErrors) {
            alert({ message: deleteErrors, type: "error" })
            dispatch(clearErrors());
        }
        if (deleted) {
            alert({ message: "Product deleted successfully", type: "success" })
            navigate("/dashboard")
            dispatch({ type: DELETE_PRODUCT_RESET })
        }
        dispatch(getProductsAdmin())
    }, [dispatch, errors, deleted, deleteErrors, navigate]);

    const onDeleteClick = (id) => {
        dispatch(deleteProduct(id))
    }

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 300, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 100,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
                            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                                <AiFillEdit />
                            </Link>

                            <Button
                                onClick={() => onDeleteClick(params.getValue(params.id, "id"))}
                            >
                                <AiFillDelete />
                            </Button>
                        </div>
                    </Fragment>
                );
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.inStock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <Fragment>

            {
                loading ? <Loader /> : <div className="dashboard">
                    <LeftSide />
                    <div className="admin-products-container">
                        <h1>PRODUCTS</h1>

                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="admin-products-table"
                            autoHeight
                        />
                    </div>
                </div>
            }
        </Fragment>
    );
};

export default AdminProducts;