import React, { useEffect, useState } from 'react'
import './adminpage.css'
import { DashboardIcon, DashboardIconWhite, ItemIcon, ItemIconWhite, OrderBoxIcon, OrderBoxIconWhite, OrdersIcon, UserAdminIcon, UserAdminIconWhite } from '../../assets/img'
import { Link, Outlet, NavLink, useNavigate } from 'react-router-dom'
const AdminPage = () => {
       //reroute for unauthorized users

       const navigate = useNavigate()
       const session = JSON.parse(sessionStorage.getItem('user'))
     
       useEffect(() => {
          if(session === null){
            navigate('/locallit/login')
          }
       },[])
    
       //-------------------------

  const [hoverState,setHoverState] = useState('')

  const handleHover = (id) => {
    setHoverState(id)
  }
  return (
     <>
      <div className="admin-maincontainer">
        <div className="sidebar-container">
            <h1 className="sidebar-title">Local<span>Lit</span></h1>
            <ul className="sidebarlist">
                <Link className='sidebar-options' onMouseEnter={() => {handleHover(1)}} onMouseLeave={() => {handleHover('')}}>
                     <img src={hoverState === 1 ? DashboardIconWhite : DashboardIcon} alt="sidebar" />
                      <p >Dashboard</p>
                </Link>
                <NavLink className='sidebar-options' to = '/localit/adminpage/itempage' onMouseEnter={() => {handleHover(2)}} onMouseLeave={() => {handleHover('')}}>
                     <img src={hoverState === 2 ? ItemIconWhite : ItemIcon} alt="item" />
                      <p >Products</p>
                </NavLink>
                <NavLink className='sidebar-options' to = '/localit/adminpage/orderpageadmin' onMouseEnter={() => {handleHover(3)}} onMouseLeave={() => {handleHover('')}}>
                     <img src={hoverState === 3 ? OrderBoxIconWhite : OrderBoxIcon} alt="orders" />
                      <p >Orders</p>
                </NavLink>
                <Link className='sidebar-options' onMouseEnter={() => {handleHover(4)}} onMouseLeave={() => {handleHover('')}}>
                     <img src={hoverState === 4 ? UserAdminIconWhite : UserAdminIcon} alt="sidebar" />
                      <p>Customers</p>
                </Link>
            </ul>
        </div>
        <div className="admin-content">
           <Outlet/>
        </div>
       </div>
     </>
  )
}

export default AdminPage
