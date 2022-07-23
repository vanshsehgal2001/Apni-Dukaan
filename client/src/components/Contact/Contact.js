import React from 'react'
import my from '../../assets/my.jpeg'
import './Contact.css'
import { AiFillInstagram } from 'react-icons/ai'
import { AiFillFacebook } from 'react-icons/ai'
import { AiFillLinkedin } from 'react-icons/ai'

const Contact = () => {
    return (
        <>
            <div className='contact-container' >
                <img src={my} alt="My Pic" />
                <h1 style={{ marginTop: "2rem" }} >CONTACT ME</h1>

                <div className="contact-links" >
                    <a href="https://www.instagram.com/i_vansh_sehgal/" target="_blank" rel='noreferrer' >
                        <AiFillInstagram />
                    </a>
                    <a href="https://m.facebook.com/vansh.sehgal.790" target="_blank" rel='noreferrer' >
                        <AiFillFacebook />
                    </a>
                    <a href="https://www.linkedin.com/in/vansh-sehgal-1519391a8/" target="_blank" rel='noreferrer' >
                        <AiFillLinkedin />
                    </a>
                </div>
            </div>
        </>
    )
}

export default Contact