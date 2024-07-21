import React, { useState } from 'react'
import './hero.css'
import { BG1, SearchIcon } from '../../assets/img'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  
  const [searched,setSearched] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
     e.preventDefault()
     navigate(`/locallit/shoppage/${searched}`)
  } 

  return (
    <>
       <div className="hero-container">
          <img src={BG1} alt="bg" />
           <div className="hero-text">
            <h1>Book Supplies</h1>
            <p>At a reasonable and affordable price</p>
           </div>
          <form action="" onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="search" 
                id="search"
                className='search-bar'
                onChange={(e) =>{setSearched(e.target.value)}}
              />
              <button type="submit" className='btn-submit'>
                  <img src={SearchIcon} alt="searchicon" />
              </button>
          </form>
       </div>
    </>
  )
}

export default Hero
