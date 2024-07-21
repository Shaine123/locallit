import React from 'react'
import './footer.css'
const Footer = () => {
  return (
    <>
      <footer className="footer-container">
          <ul>
             <li>Orders</li>
             <li>Shop</li>
             <li>About</li>
          </ul>
          <h1 style={{color:'#69544f'}}>Local<span style={{color:'#878d5d'}}>Lit</span></h1>
          <p className='copyright'>@2024LocalLit.All Right Reserved</p>
      </footer>
    </>
  )
}

export default Footer
