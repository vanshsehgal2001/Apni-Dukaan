import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { alert } from 'react-custom-alert'
import { BsArrowBarRight } from 'react-icons/bs'
import { clearErrors, getMyOrders } from "../../redux/actions/order";
import Loader from "../Loader/Loader";

const MyOrders = () => {
    const dispatch = useDispatch();

    const { loading, errors, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

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
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.1,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <BsArrowBarRight />
                    </Link>
                );
            },
        },
    ];
    const rows = [];

    orders &&
        orders.forEach((item, index) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors());
        }

        dispatch(getMyOrders());
    }, [dispatch, errors]);

    return (
        <>

            {loading ? (
                <Loader />
            ) : (
                <div className="my-orders-container">
                    <h1>{user?.name}'s Orders</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="my-orders"
                        autoHeight
                    />

                </div>
            )}
        </>
    );
};

export default MyOrders;