import React, { useEffect, useState } from 'react'
import './dashboardpage.css'
import { CustomerIcon, InventoryIcon, OrderIconAdmin, PesoIcon, ProductIconAdmin } from '../../assets/img'
import axios from 'axios'
import { useSelector } from 'react-redux'
import {Bar, Line , Doughnut} from 'react-chartjs-2'
import {Chart, defaults} from 'chart.js/auto';
import {CategoryScale} from 'chart.js'; 


defaults.maintainAspectRatio = false
defaults.responsive = true

defaults.plugins.title.display = true
defaults.plugins.title.align = 'start'
defaults.plugins.title.font.size = 20
const addTotal = (total) => {
  if(total.length > 0){
    let amount = 0
         total.forEach(obj => {
           amount += obj.ordertotal
     })
    return amount
  }
}
const addProducts = (total) => {
   if(total.length > 0) {
      let amount = 0
        total.forEach(obj => {
           amount += obj.orders.length
        })

        return amount
   }
}

const DashboardPage = () => {

  const session = JSON.parse(sessionStorage.getItem('user'))
  Chart.register(CategoryScale);
  const {successModal} = useSelector(state => state.universal)

  const [orders,setOrders] = useState(0)
  const [sales,setSales] = useState(0)
  const [products,setProducts] = useState(0)
  const [customers,setCustomers] = useState(0)
  const [stock,setStock] = useState(0)
  const [dashData,setDashdata] = useState([])
  useEffect(() => {
     axios.get(`${import.meta.env.VITE_URL}/getOrders`, {headers: { 'authorization': `${session.token}`}})
     .then((res) => {
        setSales(addTotal(res.data))
        setProducts(addProducts(res.data))
        setOrders(res.data.length)
     })
     .catch(err => console.log(err))
     
     axios.get(`${import.meta.env.VITE_URL}/findUsers`, {headers: { 'authorization': `${session.token}`}})
     .then((res) => {
        setCustomers(res.data.length)
     })
     .catch(err => console.log(err))

     axios.get(`${import.meta.env.VITE_URL}/getItem`,{headers: { 'authorization': `${session.token}`}})
       .then(res => {
        setStock(res.data.length)
       })
       .catch(err => console.log(err))

    axios.get(`${import.meta.env.VITE_URL}/getDashboard`,{headers: { 'authorization': `${session.token}`}})
    .then((res) => {
       setDashdata(res.data)
    })
  },[successModal])
   

 
  return (
    <div className='dashboardpage-container'>
       <div className="dashstat-container">
          <div className="dashstat-card">
             <h2 className="dash-title">Sales</h2>
             <div className="dashdesc-container">
                <img src={PesoIcon} alt="" className="dashimage" />
                <p className="dash-data">{sales}</p>
             </div>
          </div>
          <div className="dashstat-card">
          <h2 className="dash-title">Products Sold</h2>
             <div className="dashdesc-container">
                <img src={ProductIconAdmin} alt="" className="dashimage" />
                <p className="dash-data">{products}</p>
             </div>
          </div>
          <div className="dashstat-card">
            <h2 className="dash-title">Orders</h2>
              <div className="dashdesc-container">
                  <img src={OrderIconAdmin} alt="" className="dashimage" />
                  <p className="dash-data">{orders}</p>
              </div>
          </div>
          <div className="dashstat-card">
          <h2 className="dash-title">Customers</h2>
             <div className="dashdesc-container">
                <img src={CustomerIcon} alt="" className="dashimage" />
                <p className="dash-data">{customers}</p>
             </div>
          </div>
          <div className="dashstat-card">
          <h2 className="dash-title">Item stocks</h2>
             <div className="dashdesc-container">
                <img src={InventoryIcon} alt="" className="dashimage" />
                <p className="dash-data">{stock}</p>
             </div>
          </div>
       </div>
       <div className="dashcharts-container">
         {
           dashData.length > 0 ?
            <>
                 <div className="line-chart">
           <Line
                  data={{
                     labels: ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'],
                     datasets: [
                       {
                         label: 'Sales',
                         data: [
                                dashData[0].sales[0].amount,
                                dashData[0].sales[1].amount,
                                dashData[0].sales[2].amount,
                                dashData[0].sales[3].amount,
                                dashData[0].sales[4].amount,
                                dashData[0].sales[5].amount,
                                dashData[0].sales[6].amount,
                                dashData[0].sales[7].amount,
                                dashData[0].sales[8].amount,
                                dashData[0].sales[9].amount,
                                dashData[0].sales[10].amount,
                                dashData[0].sales[11].amount,
                              ],
                         backgroundColor: '#97BC62FF',
                         borderColor:'#2C5F2D',
                         tension: 0.1
                       },
                     ]
                  }}
                  options={{
                    plugins: {
                       title: {
                         text:'Yearly Sales'
                       }
                    }
                 }}
                 />
           </div>
           <div className="line-chart">
           <Line
                  data={{
                     labels: ['Jan','Feb','Mar','Apr','May','Jun','July','Aug','Sept','Oct','Nov','Dec'],
                     datasets: [
                       {
                         label: 'Orders',
                         data: [
                              dashData[0].orders[0].amount,
                              dashData[0].orders[1].amount,
                              dashData[0].orders[2].amount,
                              dashData[0].orders[3].amount,
                              dashData[0].orders[4].amount,
                              dashData[0].orders[5].amount,
                              dashData[0].orders[6].amount,
                              dashData[0].orders[7].amount,
                              dashData[0].orders[8].amount,
                              dashData[0].orders[9].amount,
                              dashData[0].orders[10].amount,
                              dashData[0].orders[11].amount,
                              ],
                         backgroundColor: '#69544f',
                         borderColor:'#483d43',
                         fill: true,
                         tension: 0.1
                       },
                     ]
                  }}
                  options={{
                    plugins: {
                       title: {
                         text:'Yearly Orders'
                       }
                    }
                 }}
                 />
           </div>
            </>
            :
            ''
         }
       </div>
    </div>
  )
}

export default DashboardPage
