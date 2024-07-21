import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openModalDelete, openSuccessModal } from '../../../state/universalSlice'
import axios from 'axios'
import AlertModal from '../AlertModal/AlertModal'

const ModalDeleteOrders = ({data,orders}) => {
  const dispatch = useDispatch()

  const {successModal} = useSelector(state => state.universal)
  const [alertMessage,setAlertMessage] = useState('')

  const handleProceed = () => {
      const newOrders = orders.orders.filter((item) => {
          return data.productid !== item.productid
      })
      
      if(newOrders.length > 1){
        axios.put(`${import.meta.env.VITE_URL}/editOrder`,{
          userid: orders.userid,
          orders: newOrders,
          dateordered: orders.dateordered,
          datedelivered: orders.datedelivered,
          deliverypackage: orders.deliverypackage,
          deliverystatus: orders.deliverystatus,
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

      }else{
          axios.delete(`${import.meta.env.VITE_URL}/deleteOrders/${orders._id}`)
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
  }
  return (
 <div className="modal-bg" style={{paddingTop: '200px', paddingLeft: '44vw'}}>
    <div className="modal-container-sm">
        <h2 className="modal-delete-title">
          Are you sure you want to delete {data.productname} ?
        </h2>
        <button className='cancel-btn' onClick={() => {dispatch(openModalDelete())}}>Cancel</button>
        <button className='proceed-btn' onClick={() => {handleProceed()}}>Proceed</button>
    </div>
    {successModal && <AlertModal message={alertMessage}/>}
 </div>
  )
}

export default ModalDeleteOrders
