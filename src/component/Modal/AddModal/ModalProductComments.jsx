import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { openSuccessModal, openUniversalModal } from '../../../state/universalSlice'
import { CloseIcon, RatingStarIconColor, RatingStarIconFill } from '../../../assets/img'
import axios from 'axios'
import AlertModal from '../AlertModal/AlertModal'

const ModalProductComments = ({ratings,data}) => {
  

  const dispatch = useDispatch()
  const [rating ,setRating] = useState(ratings)
  const [hover,setHover] = useState(null)
  const session = JSON.parse(sessionStorage.getItem('user'))
  const [comment,setComment] = useState('')
  
  const {successModal} = useSelector(state => state.universal)
  const [alertMessage,setAlertMessage] = useState('')

  let obj = new Date()
  let day = obj.getUTCDate()
  let month = obj.getUTCMonth() + 1
  let year  = obj.getFullYear()

   const handleSubmit = () => {
    let reviews = data[0].reviewDescription

    //This section is for when the item currently has no reviews or comments
      if( data[0].reviewDescription.length <= 0) {
           reviews.push({
              name: session.username,
              id: session._id,
              rating: rating,
              comment: [comment],
              date: `${month}/${day}/${year}`,
              image: session.userimage
           })         

        axios.put(`${import.meta.env.VITE_URL}/editItem`,{
          itemname: data[0].itemname,
          price: data[0].price,
          genre: data[0].genre,
          image: data[0].image,
          description: data[0].description,
          reviewDescription: reviews,
          ratings: data[0].ratings,
          numberOfReviews: data[0].numberOfReviews,
          oldImage: data[0].image,
          id: data[0]._id
        },{headers: { 'authorization': `${session.token}`}})
        .then((res) => {
          setAlertMessage(res.data.message2)
          if (res.status === 200) {
            //openModal
             dispatch(openSuccessModal())
             setTimeout(() => {
              //closeModal
              dispatch(openSuccessModal())        
             },2000)
          }
        })
        .catch((err) => console.log(err))
      }else{
        //This section is when there are already existing comments or reviews in the product
          const tempData = reviews.filter((item) => {
              return item.name === session.username
          })

          if(tempData.length > 0){
            // this is for when the user has already commented on this item before
              let newComment = [comment]
              const comments = reviews.map((item) =>{
                  if(item.name === session.username){ 
                      return {...item,comment: item.comment.concat(newComment)}
                  }
                  return item
              })
             
              axios.put(`${import.meta.env.VITE_URL}/editItem`,{
                itemname: data[0].itemname,
                price: data[0].price,
                genre: data[0].genre,
                image: data[0].image,
                description: data[0].description,
                reviewDescription: comments,
                ratings: data[0].ratings,
                numberOfReviews: data[0].reviewDescription.length,
                oldImage: data[0].image,
                id: data[0]._id
              },{headers: { 'authorization': `${session.token}`}})
              .then((res) => {
                setAlertMessage(res.data.message2)
                if (res.status === 200) {
                  //openModal
                   dispatch(openSuccessModal())
                   setTimeout(() => {
                    //closeModal
                    dispatch(openSuccessModal())        
                   },2000)
                }
              })
              .catch((err) => console.log(err))
             
          }else{
            //This section is for when a user hasnt commented on the item before
            reviews.push({
              name: session.username,
              id: session._id,
              rating: rating,
              comment: [comment],
              date: `${month}/${day}/${year}`,
              image: session.userimage
           })    

            axios.put(`${import.meta.env.VITE_URL}/editItem`,{
              itemname: data[0].itemname,
              price: data[0].price,
              genre: data[0].genre,
              image: data[0].image,
              description: data[0].description,
              reviewDescription: reviews,
              ratings: data[0].ratings,
              numberOfReviews: data[0].reviewDescription.length,
              oldImage: data[0].image,
              id: data[0]._id
            },{headers: { 'authorization': `${session.token}`}})
            .then((res) => {
              setAlertMessage(res.data.message2)
              if (res.status === 200) {
                //openModal
                 dispatch(openSuccessModal())
                 setTimeout(() => {
                  //closeModal
                  dispatch(openSuccessModal())        
                 },2000)
              }
            })
            .catch((err) => console.log(err))
          }
      }
   }


  return (
    <div className="modal-bg">
     <div className="modal-container">
      <div className="modal-title">Comment</div>
        <button className="close-btn" onClick={() => { dispatch(openUniversalModal())}}>
          <img src={CloseIcon} alt="close" />
        </button>
        <h2 className="modalcomment-title">Feel free to leave a comment</h2>
        <p className="modalcomment-subtitle">Rating</p>
         <div className="modalcomment-ratings">
         {
           [...Array(5)].map((star,index) => {
               const currentRating = index + 1
               return (
                      <label onMouseEnter={() => {setHover(currentRating)}} onMouseLeave={() => {setHover(null)}} key={currentRating}>
                       <input 
                         type="radio" 
                         name="rating" 
                         value={currentRating}
                         style={{display:'none'}}
                         onClick={() => {setRating(currentRating)}}
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
        <p className="modalcomment-subtitle">Comment</p>
        <textarea 
          name="" 
          id="" 
          cols="40" 
          rows="7"
          placeholder='Enter Comment'
          onChange={(e) => {setComment(e.target.value)}}
          className='modalcomment-textarea'
        />
        <button className="modalcomment-btn" onClick={() =>{handleSubmit()}}>Submit</button>
      </div>
      {successModal && <AlertModal message={alertMessage}/>}
    </div>
  )
}

export default ModalProductComments
