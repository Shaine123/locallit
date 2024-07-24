import React, { useState } from 'react'
import './modal.css'
import { useDispatch, useSelector } from 'react-redux'
import { openModalDelete, openSuccessModal } from '../../../state/universalSlice'
import axios from 'axios'
import AlertModal from '../AlertModal/AlertModal'
const ModalDeleteItem = ({deleteItem}) => {

  const dispatch = useDispatch()
  const {successModal} = useSelector(state => state.universal)
  const [alertMessage,setAlertMessage] = useState('')
  const session = JSON.parse(sessionStorage.getItem('user'))
  const handleProceed = () => {
     axios.delete(`${import.meta.env.VITE_URL}/deleteItem/${deleteItem[0]._id}/${deleteItem[0].image}`,{headers: { 'authorization': `${session.token}`}})
     .then((res) => {
         setAlertMessage(res.data.message)
          if(res.status === 200) {
            dispatch(openSuccessModal())
            setTimeout(() => {
             //closeModal
             dispatch(openSuccessModal())        
             dispatch(openModalDelete())
            },2000)
          }
     })
     .catch(err => console.log(err))
    // console.log('test')
  }
  return (
     <>
        <div className="modal-bg" style={{paddingTop: '200px', paddingLeft: '44vw'}}>
           <div className="modal-container-sm">
               <h2 className="modal-delete-title">
                 Are you sure you want to delete  {deleteItem[0].itemname}?
               </h2>
               <button className='cancel-btn' onClick={() => {dispatch(openModalDelete())}}>Cancel</button>
               <button className='proceed-btn' onClick={() => {handleProceed()}}>Proceed</button>
           </div>
        </div>
        {
           successModal && <AlertModal message={alertMessage}/>
        }
     </>
  )
}

export default ModalDeleteItem
