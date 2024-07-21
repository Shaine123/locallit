import React, { useEffect, useState } from 'react'
import './cart.css'
import CartTable from './CartTable/CartTable'
import axios from 'axios'
import { useSelector } from 'react-redux'
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
const Cart = () => {

        //reroute for unauthorized users

        const navigate = useNavigate()
        const session = JSON.parse(sessionStorage.getItem('user'))
      
        useEffect(() => {
           if(session === null){
             navigate('/locallit/login')
           }
        },[])
     
        //-------------------------

   const [data,setData] = useState([])
   const [hasProducts,setHasProducts] = useState(false)
   const [total,setTotal] = useState(0)
   const {successModel} = useSelector(state => state.universal)

   const [quantity,setQuantity] = useState(0)


   useEffect(() => {
      if(session !== null){
         axios.get(`${import.meta.env.VITE_URL}/getCarts/${session._id}`)
         .then((res) => {
            setData(res.data)
            if(res.data.length > 0){
                setHasProducts(true)
            }else{
                setHasProducts(true)
            }
            setTotal(addAmount(res.data))
         })
         .catch((err) => console.log(err))
      }
   },[successModel])

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


  return (
     <>
        <div className="cart-container">
            <h1 className="cart-title">My Cart</h1>
            {
               hasProducts ?
               data.length > 0 ?
               <CartTable data = {data} quantityFunc = {handleQuantity} />
               :
                <h1 className='no-items-message'>No items</h1>
               :
               <div className="loader-container-tables">
                   <div className="loader"></div>
               </div>
            }
            {
                data.length <= 0 ?
                ''
                :
               <div className="total">
                  <h2 className="total-title">Grand Total: ₱ {total}</h2>
                  <div className="total-btns">
                     <button onClick={() =>{navigate('/locallit/checkoutpage')}}>PROCEED TO CHECKOUT</button>
                     <p>OR</p>
                     <button onClick={() =>{navigate('/locallit/shoppage')}}>CONTINUE SHOPPING</button>
                  </div>
               </div>
            }
        </div>
     </>
  )
}

export default Cart
