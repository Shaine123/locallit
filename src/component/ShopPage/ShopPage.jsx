import React, { useEffect, useState } from 'react'
import './shoppage.css'
import Card from '../Card/Card'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { SearchIcon } from '../../assets/img'
import { Outlet, useNavigate, useParams } from 'react-router-dom'


const ShopPage = () => {
 
   const [items,setItems] = useState([])
   const {successModal} = useSelector(state => state.universal)
   const [activeState,setActiveState] = useState(1)

   const [searched,setSearched] = useState([])

   const {name} = useParams()
   useEffect(() => {
     axios.get(`${import.meta.env.VITE_URL}/getItem`)
     .then(res => {
      setItems(res.data)
      try {
         const searched = res.data.filter((item) => {
            return item.itemname.toLowerCase().trim() == name.toLowerCase().trim()
         })
         setSearched(searched)
      } catch (error) {
         
      }

     })
   }, [successModal])
    
   const [search,setSearch] = useState('')


   const handleChange = (e) =>{
      setSearch(e.target.value)

      if(search === ''){
          setSearched([])
      }
   }
   const handleSubmit = (e) => {
       e.preventDefault()
       const searched = items.filter((item) => {
          return item.itemname.toLowerCase().trim() === search.toLowerCase().trim()
       })
       setSearched(searched)
   }
     
 const [sortedData,setSorteData] = useState([])
 const handleSort = (values) => {
   setActiveState(values.id)
   const sorted = items.filter((item) => {
        return item.genre.toLowerCase() === values.sort.toLowerCase()
   })
   if(sorted.length > 0){
        setSorteData(sorted)
   }else{
       setSorteData([])
   }

 }

   return (
       <>
          <div className="shoppage-container">
             <div className="filter-btns">
                 <ul>
                    <li 
                     onClick={() => {handleSort({id: 1,sort:'all'})}}
                     className={activeState == 1 ? 'active-shop' : ''}
                     >ALL</li>
                    <li 
                      onClick={() => {handleSort({id: 2,sort:'sci-fi'})}}
                      className={activeState == 2 ? 'active-shop' : ''}
                      >Sci-Fi</li>
                    <li
                      onClick={() => {handleSort({id: 3,sort:'Romance'})}}
                      className={activeState == 3 ? 'active-shop' : ''}
                    >Romance</li>
                    <li
                      onClick={() => {handleSort({id: 4,sort:'fantasy'})}}
                      className={activeState == 4 ? 'active-shop' : ''}
                    >Fantasy</li>
                    <li
                      onClick={() => {handleSort({id: 5,sort:'educational'})}}
                      className={activeState == 5 ? 'active-shop' : ''}
                    >Educational</li>
                 </ul>
           <form action="" onSubmit={handleSubmit}>
              <input 
                     type="text" 
                     name="search" 
                     id="search"
                     className='search-bar'
                     onChange={handleChange}
                  />
                  <button type="submit" className='btn-submit'>
                        <img src={SearchIcon} alt="searchicon" />
                  </button>
               </form>
             </div>
              <div className="items-container">
                {
                  items.length > 0 ? 
                  searched.length > 0 ?
                  searched.map((item) => {
                     return (
                         <Card 
                            productname = {item.itemname}
                            productimage = {item.image}
                            productprice = {item.price}
                            productid = {item._id}
                            productReviews = {item.numberOfReviews}
                            productRatings = {item.ratings}
                            productDescription = {item.description}
                            productGenre = {item.genre}
                            key={item._id}
                         />
                     )
                  })
                  :
                  sortedData.length > 0 ?
                  sortedData.map((item) => {
                     return (
                         <Card 
                            productname = {item.itemname}
                            productimage = {item.image}
                            productprice = {item.price}
                            productid = {item._id}
                            productReviews = {item.numberOfReviews}
                            productRatings = {item.ratings}
                            productDescription = {item.description}
                            productGenre = {item.genre}
                            key={item._id}
                         />
                     )
                  })
                  :
                  items.map((item) => {
                     return (
                         <Card 
                            productname = {item.itemname}
                            productimage = {item.image}
                            productprice = {item.price}
                            productid = {item._id}
                            productReviews = {item.numberOfReviews}
                            productRatings = {item.ratings}
                            productDescription = {item.description}
                            productGenre = {item.genre}
                            key={item._id}
                         />
                     )
                  })
                  :
                  <div className="loader-container">
                        <div className="loader"></div>
                  </div>
                }
              </div>
          </div>
       </>
   )
}

export default ShopPage
