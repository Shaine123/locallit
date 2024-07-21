import React, { useEffect, useState } from 'react'
import './checkoutpage.css'
import { useFormik } from 'formik'
import {motion} from 'framer-motion'
import { HarryPotterBook1 } from '../../assets/img'
import axios from 'axios'
import { checkoutFormSchema } from '../../schemas'
import { useDispatch, useSelector } from 'react-redux'
import { openSuccessModal } from '../../state/universalSlice'
import AlertModal from '../Modal/AlertModal/AlertModal'
import { useNavigate } from 'react-router-dom'

const addAmount = (items) => {
  let amounts = 0
  items.forEach((amount) => {
       if(amount.itemquantity == 1){
         return amounts += amount.itemprice
       }else{
        return amounts += (amount.itemprice  * amount.itemquantity)
       }
      
  })

  return amounts
}

const CheckOutPage = () => {

       //reroute for unauthorized users

       const navigate = useNavigate()
       const session = JSON.parse(sessionStorage.getItem('user'))
     
       useEffect(() => {
          if(session === null){
            navigate('/locallit/login')
          }
       },[])
    
       //-------------------------



  const dispatch = useDispatch()
  const {successModal} = useSelector(state => state.universal)


  const [data,setData] = useState([])
  const [total,setTotal] = useState(0)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/getCarts/${session._id}`)
     .then((res) => {
        setData(res.data)
        setTotal(addAmount(res.data))
     })
     .catch((err) => console.log(err))
  }, [])

  const [quantity,setQuantity] = useState(1)

  const submitForm = () => {

  }

  const  {values, handleChange, handleSubmit, handleBlur,  errors, touched} = useFormik({
     initialValues:{
       firstname: session.firstname,
       lastname: session.lastname,
       address: session.address,
       city: '',
       postalcode: '' 
     },
     onSubmit: submitForm,
     validationSchema: checkoutFormSchema
  })

  const [selected,setSelected] = useState('')
  const [shippingFee,setShippingFee] = useState({fee: 0, package: ''})
  const handleClick = (id) => {
     if (selected === id) {
        setSelected('')
        setShippingFee(0)
     }else{
      if(id === 1){
        setShippingFee({fee: 20, package: 'Standard'})
      }else if(id === 2){
         setShippingFee({fee: 50, package: 'Delux'})
      }
      setSelected(id)
     }
  }

  const handleQuantity = (val) => {
    if(val.operation === 'add'){
       
      let tempData = data.map((obj ) => {
        if(obj.itemname === val.name){
            return {...obj, itemquantity: obj.itemquantity + 1}
        }
        return obj
    })
    setTotal(addAmount(tempData))
    setData(tempData)
  
     }else if(val.operation === 'minus'){
        let tempData = data.map((obj ) => {
           if(obj.itemname === val.name){
               return {...obj, itemquantity: obj.itemquantity - 1}
           }
           return obj
       })
        setTotal(addAmount(tempData))
        setData(tempData)
     }
}

const [alertMessage,setAlertMessage] = useState('')


const submitOrder = () => {
  let tempData = []

  let obj = new Date()
  let day = obj.getUTCDate()
  let month = obj.getUTCMonth() + 1
  let year  = obj.getFullYear()
  let hour = obj.getHours() > 12 ? obj.getHours() - 12 : obj.getHours()
  let minutes = obj.getMinutes()

   data.forEach((item) => {
      tempData.push({
         productid: item.itemid,
         productimage: item.itemimage,
         productname: item.itemname,
         productprice: item.itemprice,
         productquantity: item.itemquantity,
         dateadded: item.dateadded
      })
   })


   const deliveryDate = shippingFee.package === 'Standard' ? `${month}/${day + 2}/${year}` : `${month}/${day+ 1}/${year}`

   axios.post(`${import.meta.env.VITE_URL}/addOrder`,{
      userid: session._id,
      orders: tempData,
      dateordered:`${month}/${day}/${year}`,
      datedelivered: deliveryDate,
      deliverypackage: shippingFee.package,
      deliverystatus: 'pending',
      timeinterval: (hour * 60) + minutes,
      ordertotal: total + shippingFee.fee,
      userinfo:{
         firstname: session.firstname ,
         lastname: session.lastname ,
         address: session.address ,
         phonenumber: session.phonenumber,
         postalcode: values.postalcode,
         city: values.city
      }
   })
   .then((res) => {
      setAlertMessage(res.data.message)
      if (res.status === 200) {
          //openModal
          dispatch(openSuccessModal())
          setTimeout(() => {
           //closeModal
           dispatch(openSuccessModal())     
           navigate('/locallit/shoppage')   
          },2000)
      }
   })
   .catch(err => console.log(err))
}


  return (
    <div className='checkout-container'>
        <div className="checkout-text">
           <h1 className='checkout-title'>Checkout</h1>
           <h2 className="checkout-subtitle">Shipping Info</h2>
          <form className='checkout-form'>
            <div className='checkout-box'> 
              <label htmlFor="firstname">Firstname</label>
              <input 
                  type="text" 
                  name="firstname" 
                  id="fname" 
                  value={values.firstname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter Firstname'
              />
            <div className="error-container">
                {errors.firstname && touched.firstname && <p className='form-error'>{errors.firstname}</p>}
            </div>
            </div>
            <div className='checkout-box'>
              <label htmlFor="lastname">Lastname</label>
              <input 
                  type="text" 
                  name="lastname" 
                  id="lname" 
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter Lastname'
              />
            <div className="error-container">
                {errors.lastname && touched.lastname && <p className='form-error'>{errors.lastname}</p>}
            </div>
            </div>
            <div className='checkout-box'>
              <label htmlFor="address">Address</label>
              <input 
                  type="text" 
                  name="address" 
                  id="add" 
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter Address'
              />
            <div className="error-container">
                {errors.address && touched.address && <p className='form-error'>{errors.address}</p>}
            </div>
            </div>
            <div className='checkout-box'>
              <label htmlFor="city">City/Barangay</label>
              <input 
                  type="text" 
                  name="city" 
                  id="cty" 
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter City/Barangay'
              />
             <div className="error-container">
                {errors.city && touched.city && <p className='form-error'>{errors.city}</p>}
            </div>
            </div>
            <div className='checkout-box'>
              <label htmlFor="postalcode">Postal Code</label>
              <input 
                  type="text" 
                  name="postalcode" 
                  id="add" 
                  value={values.postalcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Enter Postalcode'
              />
            <div className="error-container">
                {errors.postalcode && touched.postalcode && <p className='form-error'>{errors.postalcode}</p>}
            </div>
            </div>
          </form>
          <h2 className="checkout-subtitle">Delivery options</h2>
          <div className="shipping-box" onClick={() => {handleClick(1)}}>
            <div className="shipping-desc">
               <motion.div 
                 animate = {{ 
                    backgroundColor: selected === 1 ? '#878d5d' : '#ffffff'
                 }}
                 transition={{
                   duration: 1,
                 }}
                 className="shipping-active"
                ></motion.div>
               <h1 className="shipping-title">Standard</h1>
               <p className="shipping-subtitle">2 days</p>
            </div>
            <p className="shipping-price">₱ 20</p>
          </div>
          <div className="shipping-box" onClick={() => {handleClick(2)}}>
            <div className="shipping-desc">
               <motion.div 
                  animate = {{ 
                    backgroundColor: selected === 2 ? '#878d5d' : '#ffffff'
                 }}
                 transition={{
                   duration: 1,
                 }}
                 className="shipping-active"
                 ></motion.div>
               <h1 className="shipping-title">Delux</h1>
               <p className="shipping-subtitle">1 day</p>
            </div>
            <p className="shipping-price">₱ 50</p>
          </div>
          <button className='buyitem-btn' onClick={submitOrder}>Place order</button>
        </div>
        <div className="checkoutcard-container">
           <div className="checkout-card">
              <h2 className='checkoutcard-title'>Order summary</h2>
             <div className="checkoutcardbox-container">
              {
                 data.length > 0 ? data.map((product) => {
                   return (
                    <div className="checkoutcard-box" key={product._id}>
                        <img src={`${import.meta.env.VITE_URL}/images/${product.itemimage}`} alt="" className="checkoutimg" />
                        <div className="checkoutinfo">
                            <p className='checkoutinfo-p'>{product.itemname}</p>
                            <p className='checkoutinfo-p2'>quantity: <span style={{color: 'black'}}>{product.itemquantity}</span></p>
                            <p className='checkoutinfo-p'>₱ {product.itemprice}</p>
                        </div>
                        <div className="checkoutcard-controls">
                          <button className="checkoutbtn" onClick={() => {handleQuantity({operation:'minus',price:product.itemprice, name: product.itemname })}}>-</button>
                            <p>{product.itemquantity}</p>
                          <button className="checkoutbtn" onClick={() => {handleQuantity({operation:'add',price:product.itemprice, name: product.itemname })}}>+</button>
                        </div>
                    </div>
                   )
                 })
                  : 
                  ''
              }
             </div>
              <div className="checkoutcard-sub">
                 <p className="checkoutcard-subinfo">Subtotal  <span>₱ {total + shippingFee.fee}</span></p>
                 <p className="checkoutcard-subinfo">Shipping <span>₱ {shippingFee.fee}</span></p>
              </div>
              <h2 className="checkoutcard-total">Order total <span style={{color: 'black', marginLeft: '135px'}}>₱ {total + shippingFee.fee}</span></h2>
           </div>
        </div>
        { successModal && <AlertModal message = {alertMessage}/>}
    </div>
  )
}

export default CheckOutPage
