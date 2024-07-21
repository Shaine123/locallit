import React from 'react'
import './about.css'
import {  BG3 } from '../../assets/img'
const About = () => {
  return (
    <>
       <div className="about-container">
         <div className="img-container">
            <img src={BG3} alt="bg2" />
            <div className="about-text">
                <h2>Our Mission</h2>
                <p>
                  LocalLit aims to provide local book seller in the community a way to 
                  sell there items online without the burden of incurring high charge
                  fees and tedios verification. All products listed are carefully checked
                  to ensure each item will meet the standards of valued customers.
                </p>
            </div>
         </div>   
       </div>
    </>
  )
}

export default About
