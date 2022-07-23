import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import './AdminReviews.css'
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { alert } from 'react-custom-alert'
import { clearErrors, deleteReview, getReviews } from "../../../redux/actions/product";
import { DELETE_REVIEW_RESET } from "../../../redux/types";
import { AiFillDelete } from 'react-icons/ai'
import LeftSide from "../Dashboard/LeftSide/LeftSide";
import { AiTwotoneStar } from 'react-icons/ai'
import { Button } from "@mui/material";

const AdminReviews = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { error: deleteErrors, deleted } = useSelector(
        (state) => state.deleteReview
    );

    const { errors, reviews, loading } = useSelector(
        (state) => state.reviews
    );

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (review_id) => {
        dispatch(deleteReview(productId, review_id));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getReviews(productId));
        }
        if (errors) {
            alert({ message: errors, type: "error" })

            dispatch(clearErrors());
        }

        if (deleteErrors) {
            alert({ message: deleteErrors, type: "error" })

            dispatch(clearErrors());
        }

        if (deleted) {
            alert({ message: "Review deleted successfully", type: "success" })

            navigate("/admin/reviews");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, errors, deleteErrors, navigate, deleted, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

        {
            field: "user",
            headerName: "User",
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 350,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 180,
            flex: 0.4,

            cellClassName: (params) => {
                return params.getValue(params.id, "rating") >= 3
                    ? "green-color"
                    : "red-color";
            },
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
                    <>
                        <Button
                            onClick={() =>
                                deleteReviewHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <AiFillDelete />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });

    return (
        <>

            <div className="dashboard">
                <LeftSide />
                <div className="reviews-container">
                    <form
                        className="reviews-form"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 >ALL REVIEWS</h1>

                        <div>
                            <AiTwotoneStar />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <button
                            className="show-reviews-button"
                            type="submit"
                            disabled={
                                loading ? true : false || productId === "" ? true : false
                            }
                        >
                            Search
                        </button>
                    </form>

                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="admin-products-table"
                            autoHeight
                        />
                    ) : (
                        <h1 className="no-reviews">No Reviews Found</h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminReviews;