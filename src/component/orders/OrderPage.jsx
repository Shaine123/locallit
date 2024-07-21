import React, { useEffect, useState } from 'react'
import './orderpage.css'
import axios from 'axios'
import { ActionIcon, CancelIcon, DetailIcon } from '../../assets/img'
import {motion} from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import ModalSummary from '../Modal/AddModal/ModalSummary'
import { openSummaryModal } from '../../state/universalSlice'
import { useNavigate } from 'react-router-dom'

const OrderPage = () => {

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
  const {summaryModalState} = useSelector(state => state.universal)
  const dispatch = useDispatch()

  useEffect(() => {
     axios.get(`${import.meta.env.VITE_URL}/getOrders/${session._id}`)
     .then(res => {
      setData(res.data)
       if(res.data.length > 0){
          setHasProducts(true)
       }else{
         setHasProducts(true)
       }
     })
     .catch(err => console.log(err))
  },[])

 const [actionMenu,setActionMenu] = useState({orderid: '', productid: ''})
 const [modalData,setModalData] = useState('')
 const [orders,setOrders] = useState('')

 const handleAction = (value) => {

     const findOrder = data.filter((item) => {
         return item._id === value.orderid
     })
     const findProduct = findOrder[0].orders.filter((item) => {
        return item.productid === value.productid
     })

     setModalData(findProduct[0])
     setOrders(findOrder[0])

    if (actionMenu.productid === value.productid) {
      setActionMenu('')
    } else {
      setActionMenu(value)
    }
 }


//  let obj = new Date()
//  let hours = obj.getHours() > 12 ? obj.getHours() - 12 : obj.getHours()
//  let minutes = obj.getMinutes()
//  const totalInterval = hours === 0 ? ((12 * 60) + minutes) / 60 : ((hours * 60) + minutes) / 60
//  const intervalConverted = Math.floor(totalInterval) - Math.floor(data.timeinterval / 60) 
const [activeState,setActiveState] = useState('')
const handleActive = (id) => {
    setActiveState(id)
}

  return (
    <div className='orderpage-container'>
       <h1 className="orderpage-title">Orders</h1>
       <div className="orderpage-controls-container">
          <div className="orderpage-filters">
             <p 
               className={activeState === 1 ? 'active' : ''}
               onClick={()=>{handleActive(1)}}
             >All</p>
             <p
                className={activeState === 2 ? 'active' : ''}
                onClick={()=>{handleActive(2)}}
             >Pending</p>
             <p
                className={activeState === 3 ? 'active' : ''}
                onClick={()=>{handleActive(3)}}
             >Success</p>
             <p
               className={activeState === 4 ? 'active' : ''}
               onClick={()=>{handleActive(4)}}
              >Failed</p>
          </div>
       </div>
       <table className='orderpage-table'>
          <thead className='orderpage-thead'>
              <tr className='orderpage-tr'>
                 <th className='orderpage-th'>Order</th>
                 <th className='orderpage-th'>Amount</th>
                 <th className='orderpage-th'>Price</th>
                 <th className='orderpage-th'>Order number</th>
                 <th className='orderpage-th'>Order status</th>
                 <th className='orderpage-th'>Package</th>
                 <th className='orderpage-th'>Order date</th>
                 <th className='orderpage-th'>Delivery date</th>
                 <th className='orderpage-th'></th>
              </tr>
          </thead>
          <tbody className='orderpage-tbody'>
             {
               hasProducts ? 
               data.length > 0 ? 
                 data.map((item) => {
                   return (
                      <>
                         {
                            item.orders.map((items) => {
                                return (
                                 <tr className='orderpage-tr' key={`${items.productid}_${items._id}`}>
                                 <td className='orderpage-td'>
                                    <img src={`${import.meta.env.VITE_URL}/images/${items.productimage}`} alt="items" />
                                    <p>{items.productname}</p>
                                 </td>
                                 <td className='orderpage-td'>{items.productquantity}</td>
                                 <td className='orderpage-td'>₱ {item.ordertotal}</td>
                                 <td className='orderpage-td'>{item._id}</td>
                                 <td className='orderpage-td'>
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
                                 <td className='orderpage-td'>{item.deliverypackage}</td>
                                 <td className='orderpage-td'>{item.dateordered}</td>
                                 <td className='orderpage-td'>{item.datedelivered}</td>
                                 <td className='orderpage-td'> 
                                   <img src={ActionIcon} alt="action" onClick={() => {handleAction({orderid: item._id , productid: items.productid})}} />
                                    <motion.div 
                                      initial={{
                                         display: 'none',
                                         height: '30px',
                                         opacity: 0
                                      }}
                                      animate = {{
                                          display: actionMenu.productid === items.productid ? actionMenu.orderid === item._id ? 'block' : 'none' : 'none',
                                          height: actionMenu.productid === items.productid ? actionMenu.orderid === item._id ? item.deliverystatus === 'success' ? '40px': '70px' : '30px' : '30px',
                                          opacity: actionMenu.productid === items.productid ? actionMenu.orderid === item._id ? 1 : 0 : 0
                                      }}
                                      transition={{ 
                                         duration: 0.5,
                                         type: 'spring',
                                         stiffness:80
                                      }}
                                      className="action-dropmenu"
                                     >
                                        <div className="action-box" onClick={() => {dispatch(openSummaryModal())}}>
                                           <img className='action-image' src={DetailIcon} alt="detail" />
                                           <p className='action-detail'>Summary</p>
                                        </div>
                                        {
                                           item.deliverystatus !== 'success'  ?
                                             <div className="action-box">
                                                <img className='action-image' src={CancelIcon} alt="detail" />
                                                <p className='action-detail'>Cancel </p>
                                             </div>
                                             :
                                             ''
                                        }
                                     
                                    </motion.div>
                                 </td>
                               </tr>
                                )
                            })
                         }
                      </>
                   )
                 })
                :
                 <h1 className='no-items-message'>No Orders</h1>
                :
            <div className="loader-container-tables">
                <div className="loader"></div>
             </div>
             }
          </tbody>
       </table>
       {summaryModalState && <ModalSummary data = {modalData} orders = {orders}/>}
    </div>
  )
}

export default OrderPage
