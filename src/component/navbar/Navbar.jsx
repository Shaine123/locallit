import React, { useEffect, useState } from 'react'
import './navbar.css'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CarretIcon, OrdersIcon, ShoppingbagIcon, ShoppingbagIcongray, StoreIcon, UserIcon } from '../../assets/img'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'
import axios from 'axios'


const Navbar = () => {
  
  const [data,setData] = useState([])
  const {successModel} = useSelector(state => state.universal)
  const navigate = useNavigate()

  const session = JSON.parse(sessionStorage.getItem('user'))


  useEffect(() => {
    if(session !== null){
       axios.get(`${import.meta.env.VITE_URL}/getCarts/${session._id}`)
       .then((res) => {
          setData(res.data)
          // setTotal(addAmount(res.data))
       })
       .catch((err) => console.log(err))
    }
 },[successModel])

  const userData = JSON.parse(sessionStorage.getItem('user')) || ''


  const dispatch = useDispatch()
  const [openProfile,setOpenProfile] = useState(false)
  const handleProfile = () => {
      setOpenProfile(item => !item)
  }
  const handleLogout = () => {
    setOpenProfile(false)
    sessionStorage.removeItem('user')
    navigate('/')
  }

  const handleCart = () => {
    navigate('/locallit/cartpage')
  }

  return (
   <>
      <nav className="navbar-container">
          <ul>
            {
               userData.accessType === 'admin' ?
               ''
               :
             <li><Link to = '/' className='nav-link'>Local<span style={{color:'#878d5d'}}>Lit</span></Link></li>
            }
            <li><Link to = '/locallit/shoppage' className='nav-link'>Shop</Link></li>
              {
                 userData.status === 'login' ?
                  <div className="nav-logoutbtn" onClick={handleProfile}>
                      <p>{userData.username}</p>
                      <motion.img 
                        src={CarretIcon} 
                        alt="caret" 
                        animate={{
                           rotate: openProfile ? '180deg' : '0deg'
                        }}
                      />
                  </div>
                  :
                    <li><Link to = '/locallit/login' className='nav-link'>Login</Link></li> 
              }
            <li className='cart-btn' onClick={handleCart}> 
              <img src={ShoppingbagIcon} alt="shoping" className='cart-img' />
               {data.length > 0 ?  <p className='cart-count'>{data.length}</p> : ''}
            </li>
               <motion.div className="navprofile-controls"
                 initial = {{
                    height: '50px',
                    width: '30px',
                    opacity: 0
                 }}
                 animate = {{
                    height: `${openProfile ? '400px' : '50px'}`,
                    width: `${openProfile ? '300px' : '30px'}`,
                    opacity: `${openProfile ? 1 : 0}`
                 }}
                 transition={{
                   duration: 0.5,
                   type: 'spring',
                   stiffness:80
                 }}
               >
                  <div className="navprofile-controlUsername">
                      <div className="logo">
                        {/* <h1>Local<span>Lit</span></h1> */}
                        {
                           session !== null ?
                            <img className='logo-img' src={session.userimage} alt="userimg" />
                            : 
                            ''
                        }
                      </div>
                       <h3>{userData.username}</h3>
                       <p className='logo-info'>{userData.email}</p>
                  </div>
                     <div className="navprofile-links">
                        <div className='navprofile-linkcontainer'>
                          <img src={UserIcon} alt="user" className='navprofile-img' />
                          <Link className='navprofile-link' to = '/locallit/profilepage'>Profile</Link>
                        </div>
                        <div className='navprofile-linkcontainer'>
                          <img src={StoreIcon} alt="user" className='navprofile-img' />
                          <Link className='navprofile-link' to = '/locallit/shoppage' >Store</Link>
                        </div>
                        <div className='navprofile-linkcontainer'>
                          <img src={ShoppingbagIcongray} alt="user" className='navprofile-img' />
                          <Link className='navprofile-link' to = '/locallit/cartpage' >Cart</Link>
                        </div>
                        <div className='navprofile-linkcontainer'>
                          <img src={OrdersIcon} alt="user" className='navprofile-img' />
                          <Link className='navprofile-link' to = '/locallit/orderpage'>Orders</Link>
                        </div>

                     </div>
                  
                   <div className="logout-btn" onClick={handleLogout}>
                       <p>Log out</p>
                   </div>
               </motion.div>
          </ul>
      </nav>
      <Outlet/>
   </>
  )
}

export default Navbar
