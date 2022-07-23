import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../assets/logo1.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { BsSearch } from 'react-icons/bs'

const Header = () => {
    return (
        <ReactNavbar
            navColor1="lightgray"
            navColor2="black"
            burgerColor="rgba(0,0,0,0.7)"
            burgerColorHover="black"
            logo={logo}
            logoWidth="250px"
            logoHoverColor="hsl(250, 100%, 75%)"
            nav2justifyContent="space-around"
            nav3justifyContent="space-around"
            link1Text="Home"
            link2Text="Products"
            link3Text="Contact"
            link4Text="About"
            link1Url="/"
            link2Url="/products"
            link3Url="/contact"
            link4Url="/about"
            link1ColorHover="white"
            link1Color="HSL(250, 100%, 75%)"
            link1Size="1.5rem"
            link1Padding="3vmax"
            profileIcon={true}
            profileIconUrl="/login"
            ProfileIconElement={FiUser}
            cartIcon={true}
            CartIconElement={AiOutlineShoppingCart}
            searchIcon={true}
            SearchIconElement={BsSearch}
            searchIconMargin="20px"
            cartIconMargin="20px"
            profileIconMargin="20px"
        />
    );
};

export default Header;