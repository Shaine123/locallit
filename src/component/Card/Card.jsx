import React, { useState } from 'react'
import './card.css'
import { HarryPotterBook1, StarYellow } from '../../assets/img'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const images = import.meta.glob('../../assets/img/items/*')
const Card =  ({productname,productprice,productimage,productid,productReviews,productRatings,productDescription,productGenre}) => {
   
 const navigate = useNavigate()
 const dispatch = useDispatch()

 const handleNavigate = () => {
    navigate(`/locallit/productpage/${productid}`)
 }
  return (
      <> 
         <div className="card-container" onClick={() => {handleNavigate()}}>
                   <div className="item-image-container" key={productid}>
                        <img src={`${import.meta.env.VITE_URL}/images/${productimage}`} alt="products" />
                    </div>
                    <div className="card-info">
                    <div className="card-price">
                        <h2><span>₱</span>{productprice}</h2>
                        <img src={StarYellow} alt="staryellow" />
                        <p>{productRatings} ({productReviews})</p>
                    </div>
                        <p className='item-name'>{productname}</p>
                    </div>
          </div>
         </>
  )
}

export default Card
