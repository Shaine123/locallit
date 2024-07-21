import React from 'react'
import { CloseIcon } from '../../../assets/img'
import { useDispatch } from 'react-redux'
import { openSummaryModal } from '../../../state/universalSlice'

const ModalSummary = ({data, orders}) => {
  
  console.log(orders)

  const dispatch = useDispatch()
  return (
    <div className='modal-bg' style={{paddingTop: '50px', paddingLeft: '24vw'}}>
       <div className="modal-container-summary" >
       <div className="modal-title-summary">Product Summary</div>
           <button className="close-btn" onClick={() => { dispatch(openSummaryModal())}}>
               <img src={CloseIcon} alt="close" />
            </button>
          <div className="modal-summary-subcontainer">
            <div className="summary-box">
                <h2 className="summary-subtitle">Product Details</h2>
                <div className="summary-desc">
                    <p><span style={{color: '#878d5d'}}>Product name:</span> {data.productname}</p>
                    <p><span style={{color: '#878d5d'}}>Product price:</span> ₱ {data.productprice} </p>
                    <p><span style={{color: '#878d5d'}}>Product quantity:</span> {data.productquantity}</p>
                    <p><span style={{color: '#878d5d'}}>Product total price:</span> ₱ {data.productprice * data.productquantity} </p>
                    <p><span style={{color: '#878d5d'}}>Product number:</span> {data.productid}</p>
                    <p><span style={{color: '#878d5d'}}>Product image:</span> </p>
                    <img className='summary-image' src={`${import.meta.env.VITE_URL}/images/${data.productimage}`} alt="img" />
                </div>
              </div>
              <div className="summary-box">
                <h2 className="summary-subtitle">Order Details</h2>
                <div className="summary-desc">
                   {
                     orders.orders.map((item) => {
                        return (
                          <div className="order-box" key={item.productid}>
                              <p><span style={{color: '#878d5d'}}>Product:</span> {item.productname}</p>
                              <p><span style={{color: '#878d5d'}}>Amount:</span>  {item.productquantity}</p>
                              <p><span style={{color: '#878d5d'}}>Price:</span>  ₱ {item.productprice}</p>
                          </div>
                        )
                     })
                   }
                   <p><span style={{color: '#878d5d'}}>Package:</span>  {orders.deliverypackage} </p>
                   <p><span style={{color: '#878d5d'}}>Date ordered:</span>  {orders.dateordered} </p>
                   <p><span style={{color: '#878d5d'}}>Delivery date:</span>  {orders.datedelivered} </p>
                   <p><span style={{color: '#878d5d'}}>Order status:</span>  {orders.deliverystatus}</p>
                   <p><span style={{color: '#878d5d'}}>Order number:</span>  {orders._id}</p>
                   <p><span style={{color: '#878d5d'}}>Order total:</span> {orders.ordertotal}</p>
                </div>
              </div>
          </div>
       </div>
    </div>
  )
}

export default ModalSummary
