import React, { useEffect, useState } from 'react'
import './itempage.css'
import { KeyIcon } from '../../assets/img'
import { useDispatch, useSelector } from 'react-redux'
import ModalAddItem from '../../component/Modal/AddModal/ModalAddItem'
import { openModalAdd, openModalDelete, openModalEdit } from '../../state/universalSlice'
import axios from 'axios'
import ModalEditItem from '../../component/Modal/AddModal/ModalEditItem'
import ModalDeleteItem from '../../component/Modal/AddModal/ModalDeleteItem'

const ItemPage = () => {
  
   const {successModal} = useSelector(state => state.universal)
   const [data,setData] = useState([])
   const [hasProducts,setHasProducts] = useState(false)
   localStorage.setItem('name','bob')
   useEffect(() => {
       axios.get(`${import.meta.env.VITE_URL}/getItem`)
       .then(res => {
         setData(res.data)
         if(res.data.length > 0){
             setHasProducts(true)
         }else{
             setHasProducts(true)
         }
       })
       .catch(err => console.log(err))
   },[successModal])

   const dispatch = useDispatch()
   const {addModalState, editModalState, deleteModalState} = useSelector(state => state.universal)
   
   const [editData,setEditData] = useState('')
   const handleEdit = (item) => {
      axios.get(`${import.meta.env.VITE_URL}/getOneItem/${item}`)
      .then((res) => {
         setEditData(res.data)
      })
     .catch(err => console.log(err))

     setTimeout(() => {
       dispatch(openModalEdit())
     },500)
   }
   const handleDelete = (item) => {
      axios.get(`${import.meta.env.VITE_URL}/getOneItem/${item}`)
      .then((res) => {
         setEditData(res.data)
      })
     .catch(err => console.log(err))
     setTimeout(() => {
      dispatch(openModalDelete())
    },300)
   }

  return (
     <>
        <div className="itempage-container">
            <div className="itempage-controls">
                 <div className="searchinput-container">
                  <input 
                     type="text" 
                     name="search" 
                     id="sea"
                     className='search-input'
                     placeholder='Search by Item Name'
                     />
                   <img src={KeyIcon} alt="key" />
                 </div>
                 <button className='button-50' onClick={() => {dispatch(openModalAdd())}}>Add Item</button>
                 {
                   addModalState ? <ModalAddItem/> : ''
                 }
                 {
                   editModalState ? <ModalEditItem editData = {editData}/> : ''
                 }
                 {
                   deleteModalState ? <ModalDeleteItem deleteItem = {editData}/> : ''
                 }
            </div>
            <table>
                 <thead>
                     <tr>
                        <th className='itempage-th'></th>
                        <th className='itempage-th'>Product</th>
                        <th className='itempage-th'>Price</th>
                        <th className='itempage-th'>Genre</th>
                        <th className='itempage-th'>Description</th>
                        <th className='itempage-th'></th>
                     </tr>
                 </thead>
                 <tbody>
                    {
                      hasProducts ? 
                       data.length > 0 ? 
                         data.map((item) => {
                             return (
                              <tr key={item._id}>
                                 <td>
                                     <img className='itempage-image' src={`${import.meta.env.VITE_URL}/images/${item.image}`} alt="img"  />
                                 </td>
                                 <td>{item.itemname}</td>
                                 <td>{item.price}</td>
                                 <td>{item.genre}</td>
                                 <td>{item.description}</td>
                                 <td>
                                     <button className='edit-btn' onClick={() => {handleEdit(item._id)}}>Edit</button>
                                     <button className='delete-btn' onClick={() =>{handleDelete(item._id)}}>Delete</button>
                                 </td>
                              </tr>
                             )
                         })
                       :
                        <h1 className='no-items-message'>No Items</h1>
                       :
                       <div className="loader-container-admintable">
                         <div className="loader"></div>
                       </div>
                    }
                 </tbody>
            </table>
        </div>
     </>
  )
}

export default ItemPage
