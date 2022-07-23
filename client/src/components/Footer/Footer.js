import React from "react";
import { BsInstagram } from 'react-icons/bs'
import { AiFillLinkedin } from 'react-icons/ai'
import { BsFacebook } from 'react-icons/bs'
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">

            <div className="left-footer">
                <h1>APNI DUKAAN</h1>
                <p>OLD PRODUCTS ARE LUXURY FOR SOME...</p>
                <p>DON'T WASTE</p>

                <p style={{ fontSize: "13px" }} >Made with <span style={{ color: "red", fontSize: "20px" }} >&hearts;</span> By Vansh Sehgal</p>
            </div>

            <div className="right-footer">
                <h4>FOLLOW ME</h4>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/i_vansh_sehgal/"> <BsInstagram /> </a>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/vansh-sehgal-1519391a8/"> <AiFillLinkedin /> </a>
                <a target="_blank" rel="noreferrer" href="https://m.facebook.com/vansh.sehgal.790"> <BsFacebook /></a>
            </div>
        </footer>
    );
};

export default Footer;