import React from 'react'
import './purchase.css'
import { BoxIcon, CardIcon, CursorIcon } from '../../assets/img'
const Purchase = () => {
  return (
     <>
       <div className="purchase-container">
          <h1 className='purchase-title'>How to Order</h1>
          <p className='purchase-subtitle'>Currently LocalLit accepts orders within the Sta-Bayawan Area</p>
          <div className="process-container">
              <div className="process-card">
                <div className="process-icon">
                    <img src={CursorIcon} alt="cursor" />
                </div>
                <h2>Select your Items</h2>
                <p>Choose from our stock of high quality and affordable books</p>
              </div>
              <div className="process-card">
                <div className="process-icon">
                    <img src={CardIcon} alt="cursor" />
                </div>
                <h2>Checkout</h2>
                <p>Select your delivery options either for pick-up or delivery</p>
              </div>
              <div className="process-card">
                <div className="process-icon">
                    <img src={BoxIcon} alt="cursor" />
                </div>
                <h2>Recieve your items</h2>
                <p>Recieve your items and prepare your payment upon delivery</p>
              </div>
          </div>
       </div>
     </>
  )
}

export default Purchase
