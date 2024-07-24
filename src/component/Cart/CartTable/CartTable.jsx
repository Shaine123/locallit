import React, { useState } from 'react'
import './carttable.css'
import { DuneBook1 } from '../../../assets/img'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { openSuccessModal } from '../../../state/universalSlice'
import AlertModal from '../../Modal/AlertModal/AlertModal'
const CartTable = ({data, quantityFunc}) => {

const {successModal} = useSelector(state => state.universal)
const dispatch = useDispatch()
const [alertMessage,setAlertMessage] = useState('')
const session = JSON.parse(sessionStorage.getItem('user'))

const handleDelete = (id) => {
     axios.delete(`${import.meta.env.VITE_URL}/deleteCart/${id}`,{headers: { 'authorization': `${session.token}`}})
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

  return (
    <>
         <table className="cart-table">
        <thead>
            <tr>
               <th className='carttable-th'>Cart Items</th>
                <th className='carttable-th'></th>
                <th className='carttable-th'>Price</th>
                <th className='carttable-th'>Quantity</th>
                <th className='carttable-th'></th>
            </tr>
         </thead>
         <tbody>
            {
               data.map((item) => {
                  return (
                    <tr key={item._id}>
                        <td>
                            <img src={`${import.meta.env.VITE_URL}/images/${item.itemimage}`} alt="dune" className='cartItem-img' />
                        </td>
                        <td>{item.itemname}</td>
                        <td>₱ {item.itemprice}</td>
                        <td>
                            <div className="quantity-box">
                                <button className='add' onClick={() => {quantityFunc({operation:'add',price:item.itemprice, name: item.itemname })}}>+</button>
                                <p className='quantity'>{item.itemquantity}</p>
                                <button className="minus" onClick={() => {quantityFunc({operation:'minus',price:item.itemprice, name: item.itemname })}}>-</button>
                            </div>
                        </td>
                        <td>
                        <div className="delete-btn" onClick={() => {handleDelete(item._id)}}>Delete</div>
                        </td>
                    </tr>
                  )
               })
            }
        </tbody>
        </table>
        {successModal && <AlertModal message={alertMessage}/>}
    </>
  )
}

export default CartTable
