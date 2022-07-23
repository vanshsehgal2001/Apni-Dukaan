import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import LeftSide from '../Dashboard/LeftSide/LeftSide'
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import './AdminProducts.css'
import Loader from "../../Loader/Loader";
import { alert } from 'react-custom-alert'
import { useNavigate } from 'react-router-dom'
import { clearErrors } from '../../../redux/actions/product'
import { DELETE_ORDER_RESET } from "../../../redux/types";
import { deleteOrder, getOrders } from "../../../redux/actions/order";

const AdminProducts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { errors, orders, loading } = useSelector((state) => state.orders);
    const { deleted, errors: deleteErrors } = useSelector(state => state.updateOrder)

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
            alert({ message: "Order deleted successfully", type: "success" })
            navigate("/dashboard")
            dispatch({ type: DELETE_ORDER_RESET })
        }
        dispatch(getOrders())
    }, [dispatch, errors, deleted, deleteErrors, navigate]);

    const onDeleteClick = (id) => {
        dispatch(deleteOrder(id))
    }

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.5 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "green-color"
                    : "red-color";
            },
        },
        {
            field: "quantity",
            headerName: "quantity",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },

        {
            field: "amount",
            headerName: "Amount",
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
                            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
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

    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                quantity: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });

    return (
        <Fragment>

            {
                loading ? <Loader /> : <div className="dashboard">
                    <LeftSide />
                    <div className="admin-products-container">
                        <h1>ORDERS</h1>

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