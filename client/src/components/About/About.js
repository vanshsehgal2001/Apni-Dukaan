import React from 'react'
import my from '../../assets/my.jpeg'
import './About.css'
// v-s-2001.netlify.app
const About = () => {
    return (
        <>
            <div className='about-container' >
                <div>
                    <img src={my} alt="My Pic" />

                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "40px" }} >
                    <h1>
                        Vansh Sehgal
                    </h1>
                    <h3>
                        MERN Stack Developer , 2023 Grad currently pursuing BTech In Computers from TIET.
                        To know more about me, checkout my <a style={{ color: "gray", textDecoration: "none" }} href="https://v-s-2001.netlify.app" rel="noreferrer" target="_blank" >Portfolio Website</a>
                    </h3>
                </div>
            </div>
        </>
    )
}

export default About