import React, { useEffect, useState } from 'react'
import './orderpageadmin.css'
import axios from 'axios'
import { DeleteIcon, EditIcon, ViewIcon } from '../../assets/img'
import { useDispatch, useSelector } from 'react-redux'
import ModalDetailsAdmin from '../../component/Modal/AddModal/ModalDetailsAdmin'
import { openModalDelete, openModalEdit, openSummaryModal } from '../../state/universalSlice'
import ModalEditOrders from '../../component/Modal/AddModal/ModalEditOrders'
import ModalDeleteOrders from '../../component/Modal/AddModal/ModalDeleteOrders'

const OrderPageAdmin = () => {
  
  const [data,setData] = useState([])
  const [hasProducts,setHasProducts] = useState(false)
  const session = JSON.parse(sessionStorage.getItem('user'))
  const {summaryModalState, editModalState, successModal,deleteModalState} = useSelector(state => state.universal)
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_URL}/getOrders`,{headers: { 'authorization': `${session.token}`}})
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

   
  const [modalData,setModalData] = useState([])
  const [orders,setOrders] = useState([])
  
  const handleDetails = (value) => {
    const findOrder = data.filter((item) => {
      return item._id === value.orderid
  })
  const findProduct = findOrder[0].orders.filter((item) => {
     return item.productid === value.productid
  })

  setModalData(findProduct[0])
  setOrders(findOrder[0])
    dispatch(openSummaryModal())
  }

  const handleEdit = (value) => {
    const findOrder = data.filter((item) => {
      return item._id === value.orderid
  })
  const findProduct = findOrder[0].orders.filter((item) => {
     return item.productid === value.productid
  })

  setModalData({...findProduct[0],productid:value.productid})
  setOrders(findOrder[0])
     dispatch(openModalEdit())
  }

  const handleDelete = (value) => {
  const findOrder = data.filter((item) => {
      return item._id === value.orderid
  })
  const findProduct = findOrder[0].orders.filter((item) => {
     return item.productid === value.productid
  })

  setModalData({...findProduct[0],productid:value.productid})
  setOrders(findOrder[0])
   dispatch(openModalDelete())
  }

  const [activeState,setActiveState] = useState(1)
  const [sortedData,setSortedData] = useState([])
  const handleActive = (values) => {
     setActiveState(values.id)
     const filtered = data.filter((item) => {
        return item.deliverystatus === values.sort
     })
     if(filtered.length > 0){
        setSortedData(filtered)
     }else{
       setSortedData([])
     }
  }

  
  return (
    <div className='orderpageadmin-container'>
       <div className="orderpageadmin-controls-container">
          <div className="orderpage-filters">
             <p 
               className={activeState === 1 ? 'active' : ''}
               onClick={()=>{handleActive({id: 1,sort: 'all'})}}
             >All</p>
             <p
                className={activeState === 2 ? 'active' : ''}
                onClick={()=>{handleActive({id: 2,sort: 'pending'})}}
             >Pending</p>
             <p
                className={activeState === 3 ? 'active' : ''}
                onClick={()=>{handleActive({id: 3,sort: 'success'})}}
             >Success</p>
             <p
               className={activeState === 4 ? 'active' : ''}
               onClick={()=>{handleActive({id: 4,sort: 'failed'})}}
              >Failed</p>
          </div>
       </div>
       <table className="orderadmin-table">
           <thead className="orderadmin-thead">
               <tr className="orderadmin-tr">
                  <th className="orderadmin-th">Order</th>
                  <th className="orderadmin-th">Amount</th>
                  <th className="orderadmin-th">Price</th>
                  <th className="orderadmin-th">Order number</th>
                  <th className="orderadmin-th">Order status</th>
                  <th className="orderadmin-th">Package</th>
                  <th className="orderadmin-th">Order date</th>
                  <th className="orderadmin-th">Delivery date</th>
                  <th className="orderadmin-th">Actions</th>
               </tr>
           </thead>
           <tbody className="orderadmin-tbody">
              {
                hasProducts ? 
                 data.length > 0 ?
                 sortedData.length > 0 ?
                 sortedData.map((item) => {
                  return (
                      <>
                         {
                           item.orders.map((items) => {
                              return (
                                <tr className="orderadmin-tr" key={items._id}>
                                  <td className="orderadmin-td">
                                      <div className="orderadmin-tdcontainer">
                                        <div className="orderadmin-imagecontainer">
                                          <img src={`${import.meta.env.VITE_URL}/images/${items.productimage}`} alt="" />
                                        </div>
                                        <p>{items.productname}</p>
                                      </div>
                                  </td>
                                  <td className="orderadmin-td">{items.productquantity}</td>
                                  <td className="orderadmin-td">{items.productprice}</td>
                                  <td className="orderadmin-td">{item._id}</td>
                                  <td className="orderadmin-td">
                                     
                                     {
                                       item.deliverystatus === 'success' ?
                                       <p style={{borderColor:'#5ce363',backgroundColor:'#98f39d',color: '#20ae27'}}>{item.deliverystatus}</p>
                                        :
                                       item.deliverystatus === 'failed' ?
                                       <p style={{borderColor:'#f92a17',backgroundColor:'#ff9380',color: '#c23627'}}>{item.deliverystatus}</p>
                                       :
                                       <p>{item.deliverystatus}</p>
                                     }
                                  </td>
                                  <td className="orderadmin-td">{item.deliverypackage}</td>
                                  <td className="orderadmin-td">{item.dateordered}</td>
                                  <td className="orderadmin-td">{item.datedelivered}</td>
                                  <td className="orderadmin-td">
                                     <div className="orderad-actioncontainer">
                                        <img src={EditIcon} alt="edit" onClick={() => {handleEdit({orderid: item._id , productid: items.productid })}} />
                                        <img src={DeleteIcon} alt="delete" onClick={() => {handleDelete({orderid: item._id , productid: items.productid})}} />
                                        <img src={ViewIcon} alt="view" onClick={() => {handleDetails({orderid: item._id , productid: items.productid })}} />
                                     </div>
                                  </td>
                                </tr>
                              )
                           })
                         }
                      </>
                  )
              })
                :
                data.map((item) => {
                  return (
                      <>
                         {
                           item.orders.map((items) => {
                              return (
                                <tr className="orderadmin-tr" key={items._id}>
                                  <td className="orderadmin-td">
                                      <div className="orderadmin-tdcontainer">
                                        <div className="orderadmin-imagecontainer">
                                          <img src={`${import.meta.env.VITE_URL}/images/${items.productimage}`} alt="" />
                                        </div>
                                        <p>{items.productname}</p>
                                      </div>
                                  </td>
                                  <td className="orderadmin-td">{items.productquantity}</td>
                                  <td className="orderadmin-td">{items.productprice}</td>
                                  <td className="orderadmin-td">{item._id}</td>
                                  <td className="orderadmin-td">
                                     
                                     {
                                       item.deliverystatus === 'success' ?
                                       <p style={{borderColor:'#5ce363',backgroundColor:'#98f39d',color: '#20ae27'}}>{item.deliverystatus}</p>
                                        :
                                       item.deliverystatus === 'failed' ?
                                       <p style={{borderColor:'#f92a17',backgroundColor:'#ff9380',color: '#c23627'}}>{item.deliverystatus}</p>
                                       :
                                       <p>{item.deliverystatus}</p>
                                     }
                                  </td>
                                  <td className="orderadmin-td">{item.deliverypackage}</td>
                                  <td className="orderadmin-td">{item.dateordered}</td>
                                  <td className="orderadmin-td">{item.datedelivered}</td>
                                  <td className="orderadmin-td">
                                     <div className="orderad-actioncontainer">
                                        <img src={EditIcon} alt="edit" onClick={() => {handleEdit({orderid: item._id , productid: items.productid })}} />
                                        <img src={DeleteIcon} alt="delete" onClick={() => {handleDelete({orderid: item._id , productid: items.productid})}} />
                                        <img src={ViewIcon} alt="view" onClick={() => {handleDetails({orderid: item._id , productid: items.productid })}} />
                                     </div>
                                  </td>
                                </tr>
                              )
                           })
                         }
                      </>
                  )
              })
                 :
                 <h1 className="no-items-message">No orders</h1>
                 :
                 <div  className="loader-container-admintable">
                    <div className="loader"></div>
                 </div>
              }
           </tbody>
       </table>
       { summaryModalState && <ModalDetailsAdmin data = {modalData} orders = {orders}/>}
       { editModalState && <ModalEditOrders orders = {orders} data = {modalData}/> }  
       { deleteModalState && <ModalDeleteOrders data = {modalData} orders = {orders}/>}
    </div>
  )
}

export default OrderPageAdmin
