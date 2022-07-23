import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { clearErrors, deleteUser, getAllUsers } from "../../../redux/actions/user";
import { DELETE_USER_RESET } from "../../../redux/types";
import { useNavigate } from "react-router-dom";
import { alert } from 'react-custom-alert'
import { AiFillEdit } from 'react-icons/ai'
import { AiFillDelete } from 'react-icons/ai'
import LeftSide from "../Dashboard/LeftSide/LeftSide";
import Loader from "../../Loader/Loader";

const AdminUsers = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const { errors, users, loading } = useSelector((state) => state.users);

    const {
        errors: deleteErrors,
        deleted,
    } = useSelector((state) => state.updateUser);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };

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
            alert({ message: "User deleted successfully", type: "success" })
            navigate("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }

        dispatch(getAllUsers());
    }, [dispatch, errors, deleteErrors, navigate, deleted]);

    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

        {
            field: "email",
            headerName: "Email",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
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
                        <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                            <AiFillEdit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteUserHandler(params.getValue(params.id, "id"))
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

    users &&
        users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
                name: item.name,
            });
        });

    return (
        <>

            <div className="dashboard">
                <LeftSide />
                {
                    loading ? <Loader /> : <>
                        <div className="admin-products-container">
                            <h1>ALL USERS</h1>

                            <DataGrid
                                rows={rows}
                                columns={columns}
                                pageSize={10}
                                disableSelectionOnClick
                                className="admin-products-table"
                                autoHeight
                            />
                        </div>
                    </>
                }
            </div>
        </>
    );
};

export default AdminUsers;