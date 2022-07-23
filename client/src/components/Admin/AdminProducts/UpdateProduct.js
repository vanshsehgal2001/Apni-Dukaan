import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProduct } from "../../../redux/actions/product";
import { UPDATE_PRODUCT_RESET } from "../../../redux/types";
import { useNavigate } from "react-router-dom";
import LeftSide from "../Dashboard/LeftSide/LeftSide";
import { FaPencilAlt } from 'react-icons/fa'
import { FaRupeeSign } from 'react-icons/fa'
import { MdDescription } from 'react-icons/md'
import { MdOutlineList } from 'react-icons/md'
import { AiOutlineNumber } from 'react-icons/ai'
import './CreateProduct.css'
import { alert } from 'react-custom-alert'
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { prod_id } = useParams()

    const { product, errors } = useSelector(state => state.product)
    const { errors: updateErrors, loading, updated } = useSelector(state => state.deleteProduct)

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [inStock, setInStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [done, setDone] = useState(false)

    const categories = [
        "Laptop",
        "TV",
        "Refrigerator",
        "Phone",
        "Headphones",
        "Earphones",
        "Shirts",
        "Jeans",
        "Pants",
        "Shoes",
        "Belts",
        "AC",
        "Furniture",
        "Desktops",
        "Camera",
        "Artifacts",
        "Shorts",
        "Pyjamas",
        "Glasses",
        "Microwave"
    ];

    useEffect(() => {
        if (!done || !product) {
            dispatch(getProduct(prod_id))
            setDone(true)
        }
        else {
            setName(product?.name);
            setDescription(product?.description);
            setPrice(product?.price);
            setCategory(product?.category);
            setInStock(product?.inStock);
            setOldImages(product?.images)
        }


        if (errors) {
            alert({ message: errors, type: "error" })
            dispatch(clearErrors());
        }

        if (updateErrors) {
            alert({ message: updateErrors, type: "error" })
            dispatch(clearErrors());
        }

        if (updated) {
            alert({ message: "Product updated successfully", type: "success" })
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, errors, navigate, updated, product, prod_id, updateErrors, done]);

    const updateProductHandler = (e) => {
        e.preventDefault();
        if (inStock < 0) {
            alert({ message: "Stock can't be less than 0", type: "error" })
            dispatch(clearErrors());
            return;
        }
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("inStock", inStock);

        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(prod_id, myForm));
    };

    const onchange = (e) => {
        const files = Array.from(e.target.files);
        setOldImages([])

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <div className="dashboard">
                <LeftSide />
                <div className="create-product-container">
                    <h1>UPDATE PRODUCT</h1>

                    <form
                        className="create-product-form"
                        encType="multipart/form-data"
                        onSubmit={updateProductHandler}
                    >

                        <div>
                            <FaPencilAlt />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <FaRupeeSign />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <MdDescription />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <MdOutlineList />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <AiOutlineNumber />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setInStock(e.target.value)}
                                value={inStock}
                            />
                        </div>

                        <div className="create-product-images-upload">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={onchange}
                                multiple
                            />
                        </div>

                        <div className="create-product-image">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
                        </div>

                        <div className="create-product-image">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <button
                            className="create-product-button"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default UpdateProduct;