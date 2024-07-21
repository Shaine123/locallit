import React, { useEffect, useState } from 'react'
import './productpage.css'
import { HarryPotterBook1, MinusIcon, PesoIcon, PlusIcon, RatingStarIconColor, RatingStarIconFill } from '../../assets/img'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { openSuccessModal, openUniversalModal } from '../../state/universalSlice'
import AlertModal from '../Modal/AlertModal/AlertModal'
import ModalProductComments from '../Modal/AddModal/ModalProductComments'

const ProductPage = () => {

        //reroute for unauthorized users

        const navigate = useNavigate()
        const session = JSON.parse(sessionStorage.getItem('user'))
      
        useEffect(() => {
           if(session === null){
             navigate('/locallit/login')
           }
        },[])
     
        //-------------------------
        
  const [quantity,setQuantity] = useState(1)
  const {successModal,universalModalState} = useSelector(state => state.universal)
  const dispatch = useDispatch()
  const [rating ,setRating] = useState(null)
  const [hover,setHover] = useState(null)
  
  const handleComment = (value) => {
     setRating(value)
     dispatch(openUniversalModal())
  }



  const {id} = useParams()

  const [productData,setProductData] = useState([])
  const [reviewData,setReviewData] = useState([{reviewDescription:[]}])
  useEffect(() => {
     axios.get(`${import.meta.env.VITE_URL}/getOneItem/${id}`)
     .then(res => {
      setProductData(res.data)
      setReviewData(res.data)
      const curRating = res.data[0].reviewDescription.filter((item) => {
          return item.id === session._id
      })
       if(curRating.length > 0){
          setRating(curRating[0].rating)
       }
     })
     .catch(err => console.log(err))
  },[])


  const [alertMessage,setAlertMessage] = useState('')
  const userData = JSON.parse(sessionStorage.getItem('user'))

    let obj = new Date(); 
    let day = obj.getUTCDate(); 
    let month = obj.getUTCMonth() + 1; 
    let year = obj.getUTCFullYear(); 
   
  
  const handleAddCart = () => {

     if(userData == null){
       navigate('/locallit/login')
     }else {
      axios.post(`${import.meta.env.VITE_URL}/addCart`,{
          userid: userData._id,
          username: userData.username,
          itemid: id,
          itemname: productData.itemname,
          itemprice: productData.price,
          itemquantity: quantity,
          itemimage: productData.image,
          dateadded: `${month}/${day}/${year}`
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
     }
  }
  console.log(productData.length)
  return (
     <>
        <div className="productpage-maincontainer">
          <div className="productpage-container">
            {
               productData.length > 0 ? 
               productData.map((productDatas) => {
                  return (
              <>
              <div className="productimage-container">
                <img src={`${import.meta.env.VITE_URL}/images/${productDatas.image}`} alt="harry" className='productimage' />
              </div>
              <div className="productinfo-container">
                  <p className="genre-subtitle">{productDatas.genre}</p>
                  <h2 className='productmain-title'>{productDatas.itemname}</h2>
                  <h2 className="productmain-details">{productDatas.description}</h2>
                  <div className="price-container">
                    <h1 className='productmain-price'>{productDatas.price}</h1>
                    <img src={PesoIcon} alt="peso" className='pesos-icon' />
                  </div>
                  <div className="quantity-container">
                    <p className="quantity-title">Quantity</p>
                    <div className="quantity-btns">
                        <button className='quantity-btn' onClick={() => {setQuantity(item => item + 1)}}>
                            <img src={PlusIcon} alt="plus" />
                        </button>
                        <p className='quantity-value'>{quantity < 1 ? setQuantity(1) : quantity}</p>
                        <button className='quantity-btn' onClick={() => {setQuantity(item => item - 1)}}>
                            <img src={MinusIcon} alt="minus" />
                        </button>
                    </div>
                    <button className="buyItem-btn">Buy Item</button>
                    <button className="addCart-btn" onClick={() =>{handleAddCart()}}>Add To Cart</button>

                    <div className="rating-container">
                      <p className="rating-title">Rate Us</p>
                    {
                      [...Array(5)].map((star,index) => {
                        const currentRating = index + 1
                          return (
                            <label onMouseEnter={() => {setHover(currentRating)}} onMouseLeave={() => {setHover(null)}} key={currentRating} >
                              <input 
                                type="radio" 
                                name="rating" 
                                value={currentRating}
                                style={{display:'none'}}
                                onClick={() => {handleComment(currentRating)}}
                                />
                                {
                                  currentRating <= (rating || hover) ?
                                  <img src={RatingStarIconColor} alt="star" style={{width:'35px',height: 'auto', cursor: 'pointer'}}/> 
                                    :
                                    <img src={RatingStarIconFill} alt="star" style={{width:'35px',height: 'auto', cursor: 'pointer'}}/>
                                }
                            </label>
                          )
                      })
                    }
                    </div>
                    
                  </div>
              </div>
              </>
                  )
               })
               :
               <div className="loader-container">
                 <div className="loader"></div>
               </div>
            }
          </div>
          <div className="reviewsec-container">
            <p className="reviewsec-title">Reviews</p>
            <div className="reviewsec-subcontainer">
              { 
                reviewData[0].reviewDescription.length > 0 ?
                 reviewData[0].reviewDescription.map((val) => {
                     return (
                      <div className="reviewsec-box">
                          <div className="reviewsec-subbox">
                              <img src={`${val.image}`} alt="img" className="reviewsec-image" />
                          </div>
                          <div className="reviewsec-subbox">
                            <div className="reviewsec-userinfo">
                                <div className="reviewsec-ratings">
                                {
                                  [...Array(5)].map((star,index) => {
                                    const currentRating = index + 1
                                      return (
                                        <label >
                                          <input 
                                            type="radio" 
                                            name="rating" 
                                            value={val.rating}
                                            style={{display:'none'}}
                                            onClick={() => {handleComment(currentRating)}}
                                            />
                                            {
                                              currentRating <= (rating || hover) ?
                                              <img src={RatingStarIconColor} alt="star" style={{width:'15px',height: 'auto', cursor: 'pointer'}}/> 
                                                :
                                                <img src={RatingStarIconFill} alt="star" style={{width:'15px',height: 'auto', cursor: 'pointer'}}/>
                                            }
                                        </label>
                                      )
                                  })
                                }
                                </div>
                                <p>{val.name}</p>
                                <p>{val.date}</p>
                            </div>
                            <div className="reviewsec-comment">
                                <p>{val.comment}</p>
                            </div>
                          </div>
                      </div>
                     )
                 })
                :
                 ''
              }
            </div>
          </div>
        </div>
         {successModal && <AlertModal message = {alertMessage}/>}
         {universalModalState && <ModalProductComments ratings = {rating} data = {productData}/>}
     </>
  )
}

export default ProductPage
