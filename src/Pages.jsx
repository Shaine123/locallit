import React from 'react'
import {Routes,Route} from 'react-router-dom'
import App from './App'
import Navbar from './component/navbar/Navbar'
import Login from './component/Login/Login'
import ShopPage from './component/ShopPage/ShopPage'
import Footer from './component/footer/Footer'
import Signup from './component/SignupPage/Signup'
import AdminPage from './pages/admin/AdminPage'
import ItemPage from './pages/ItemPage/ItemPage'
import ProductPage from './component/ProductPage/ProductPage'
import Cart from './component/Cart/Cart'
import CheckOutPage from './component/checkoutpage/CheckOutPage'
import ProfilePage from './component/profile/ProfilePage'
import OrderPage from './component/orders/OrderPage'
import OrderPageAdmin from './pages/orderpage-admin/OrderPageAdmin'
const Pages = () => {
  return (
     <>
        <Routes>
            <Route path='/' element={<App/>}/>
            <Route element = {[<Navbar/>,<Footer/>]}>
               <Route path='/locallit/login' element ={<Login/>}/>
               <Route path='/locallit/shoppage' element ={<ShopPage/>}/>
               <Route path='/locallit/shoppage/:name' element ={<ShopPage/>}/>
               <Route path='/locallit/signuppage' element={<Signup/>}/>
               <Route path='/locallit/productpage/:id' element={<ProductPage/>}/>
               <Route path='/locallit/cartpage' element = {<Cart/>}/>
               <Route path='/locallit/checkoutpage' element = {<CheckOutPage/>}/>
               <Route path='/locallit/profilepage' element = {<ProfilePage/>}/>
               <Route path='/locallit/orderpage' element = {<OrderPage/>}/>
            </Route>
            
            {/*@desc Admin Route Paths*/}
            <Route element = {[<Navbar/>]}>
             <Route  element = {<AdminPage/>} >
                <Route  path='/localit/adminpage/itempage' element = {<ItemPage/>}/> 
                <Route  path='/localit/adminpage/orderpageadmin' element = {<OrderPageAdmin/>}/> 
             </Route>
            </Route>
        </Routes>
     </>
  )
}

export default Pages
