import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModalEdit, openSuccessModal } from '../../../state/universalSlice'
import { CloseIcon } from '../../../assets/img'
import { useFormik } from 'formik'
import axios from 'axios'
import AlertModal from '../AlertModal/AlertModal'

const ModalEditOrders = ({orders,data}) => {
   const dispatch = useDispatch()
   const {successModal} = useSelector(state => state.universal)
   const [alertMessage,setAlertMessage] = useState('')

   const submitForm = () => {
       const newOrders = orders.orders.map((item) => {
           if(item.productid == data.productid){
              return {...item,
                  productname: values.productname,
                  productprice: values.productprice,
                  productquantity: values.productamount
              }
           }
           return item
       })
     
      axios.put(`${import.meta.env.VITE_URL}/editOrder`,{
        userid: orders.userid,
        orders: newOrders,
        dateordered: orders.dateordered,
        datedelivered: values.deliverydate,
        deliverypackage: values.productpackage,
        deliverystatus: values.productstatus,
        timeinterval: orders.timeinterval,
        ordertotal: orders.ordertotal,
        userinfo: orders.userinfo,
        id:orders._id
      })
      .then((res) => {
        setAlertMessage(res.data.message)
        if (res.status === 200) {
          //openModal
           dispatch(openSuccessModal())
           setTimeout(() => {
            //closeModal
            dispatch(openSuccessModal())        
           },2000)
        }
      })
      .catch((err) => console.log(err))
   }
  
   const {values, errors, handleSubmit, handleBlur, handleChange, touched} = useFormik({
     initialValues: {
        productname: data.productname,
        productamount: data.productquantity,
        productprice: data.productprice,
        productstatus: orders.deliverystatus,
        productpackage: orders.deliverypackage,
        deliverydate: orders.datedelivered
     },
     onSubmit: submitForm
   })


  return (
    <div className="modal-bg">
      <div  className="modal-container" style={{paddingBottom: '20px'}}>
       <div className="modal-title">Edit Order</div>
          <button className="close-btn" onClick={() => { dispatch(openModalEdit())}}>
              <img src={CloseIcon} alt="close" />
          </button>
          <form onSubmit={handleSubmit} className='orders-form'>
             <div className="ordersbox-form">
              <label className='orders-label' htmlFor="productname">Product name</label>
              <input 
                  type="text" 
                  name="productname" 
                  id="order" 
                  value={values.productname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='orders-input'
                />
             </div>
             <div className="ordersbox-form">
              <label className='orders-label' htmlFor="productamount">Product amount</label>
              <input 
                  type="number" 
                  name="productamount" 
                  id="num" 
                  value={values.productamount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='orders-input'
                />
             </div>
             <div className="ordersbox-form">
              <label className='orders-label' htmlFor="productprice">Product price</label>
              <input 
                  type="number" 
                  name="productprice" 
                  id="price" 
                  value={values.productprice}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='orders-input'
                />
             </div>
             <div className="ordersbox-form">
              <label className='orders-label' htmlFor="productstatus">Product status</label>
              <select 
                id='productstatus' 
                name='productstatus'
                value={values.productstatus}
                onChange={handleChange}
                onBlur={handleBlur}
                className='orders-input'
               >
                 <option value="status">Choose Status</option>
                 <option value="pending">Pending</option>
                 <option value="failed">Failed</option>
                 <option value="success">Success</option>
              </select>
             </div>
             <div className="ordersbox-form">
              <label className='orders-label' htmlFor="productpackage">Product package</label>
              <select 
                id='productpackage' 
                name='productpackage'
                value={values.productpackage}
                onChange={handleChange}
                onBlur={handleBlur}
                className='orders-input'
              >
                 <option value="status">Choose Status</option>
                 <option value="Standard">Standard</option>
                 <option value="Delux">Delux</option>
              </select>
             </div>
             <div className="ordersbox-form">
              <label className='orders-label' htmlFor="deliverydate">Delivery date</label>
              <input 
                  type="text" 
                  name="deliverydate" 
                  id="datedelivered" 
                  value={values.deliverydate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className='orders-input'
                />
             </div>
             <button type="submit" className='orders-btn'>Submit</button>
          </form>
      </div>
      {successModal && <AlertModal message = {alertMessage}/> }
    </div>
  )
}

export default ModalEditOrders
