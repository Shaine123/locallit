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
  const [cartData,setCartData] = useState([])
  const [reviewData,setReviewData] = useState([{reviewDescription:[{comment:[]}]}])
  const userData = JSON.parse(sessionStorage.getItem('user'))
  
  useEffect(() => {
     axios.get(`${import.meta.env.VITE_URL}/getOneItem/${id}`,{headers: { 'authorization': `${session.token}`}})
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
    
     if(userData !== null){
      axios.get(`${import.meta.env.VITE_URL}/getCarts/${userData._id}`,{headers: { 'authorization': `${session.token}`}})
      .then((res) => {
         setCartData(res.data)
      })
      .catch((err) => console.log(err))
   }

  //  axios.get(`${import.meta.env.VITE_URL}/getItem`,{headers: { 'authorization': `${session.token}`}})
  //  .then(res => {
  //   setReviewData(res.data)
   
  //   console.log(res.data)
  //  })
  //  .catch(err => console.log(err))


  },[])


  const [alertMessage,setAlertMessage] = useState('')


    let obj = new Date(); 
    let day = obj.getUTCDate(); 
    let month = obj.getUTCMonth() + 1; 
    let year = obj.getUTCFullYear(); 
   
  
  const handleAddCart = () => {
    const productExist = cartData.filter((item) => {
       return item.itemname === productData[0].itemname
    })
    console.log(productExist)
     if(userData == null){
       navigate('/locallit/login')
     }else {

        if(productExist.length > 0) { 
            axios.put(`${import.meta.env.VITE_URL}/editCart`,{
              userid: userData._id,
              username: userData.username,
              itemid: id,
              itemname: productData[0].itemname,
              itemprice: productData[0].price,
              itemquantity: productExist[0].itemquantity + quantity,
              itemimage: productData[0].image,
              dateadded: `${month}/${day}/${year}`,
              id: productExist[0]._id
            },{headers: { 'authorization': `${session.token}`}})
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
        }else{
          axios.post(`${import.meta.env.VITE_URL}/addCart`,{
            userid: userData._id,
            username: userData.username,
            itemid: id,
            itemname: productData[0].itemname,
            itemprice: productData[0].price,
            itemquantity: quantity,
            itemimage: productData[0].image,
            dateadded: `${month}/${day}/${year}`
        },{headers: { 'authorization': `${session.token}`}})
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
  }


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
                    <button className="buyItem-btn" onClick={() => {navigate(`/locallit/checkoutpage/${JSON.stringify({id: id,quantity:quantity })}`)}}>Buy Item</button>
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
                   <>
                      {
                          val.comment.length > 0 ? 
                          val.comment.map((vals) => {
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
                                                  currentRating <= (val.rating || hover) ?
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
                                 <p>{vals}</p>
                           
                                </div>
                              </div>
                          </div>
                             )
                          })
                          :
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
                              {
                                 val.comment.length >= 0 ?
                                 val.comment.map((arr) => {
                                    return (
                                       <p>{arr}</p>
                                    )
                                 })
                                 :
                                 <p>{arr.comment[0]}</p>
                              }
                       
                            </div>
                          </div>
                      </div>
                      }
                  
                   </>
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
