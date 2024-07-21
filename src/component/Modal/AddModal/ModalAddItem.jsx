import React, { useState } from 'react'
import './modal.css'
import { CloseIcon, PesoIcon } from '../../../assets/img'
import { useDispatch, useSelector } from 'react-redux'
import { openModalAdd, openSuccessModal } from '../../../state/universalSlice'
import { useFormik } from 'formik'
import { modalAddSchema } from '../../../schemas'
import axios from 'axios'
import AlertModal from '../AlertModal/AlertModal'

const ModalAddItem = () => {

  const dispatch = useDispatch()
  const {successModal} = useSelector(state => state.universal)
  const [uploadImage,setUploadImage] = useState()
  const [alertMessage,setAlertMessage] = useState('')

  const submitForm = () => {
     const formData = new FormData()
     formData.append('file',uploadImage)
     axios.post(`${import.meta.env.VITE_URL}/uploadItemImage`,formData)
     .then((res) => {
         if(res.status === 200){
             axios.post(`${import.meta.env.VITE_URL}/addItem`,{
                itemname: values.itemname,
                price: values.price,
                genre: values.genre,
                image: res.data.filename,
                description: values.description,
                reviewDescription: [],
                ratings: 0,
                numberOfReviews: 0
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
             .catch(err => console.log(err))
         }
     })
     .catch(err => console.log(err))

    // values.itemname = ''
    // values.price = ''
    // values.genre = ''
    // values.description = ''
  }

  const {values,errors,touched,handleChange,handleSubmit,handleBlur} = useFormik({
      initialValues: {
         itemname: '',
         price: '',
         genre: '',
         description: '',
      },
      validationSchema: modalAddSchema,
      onSubmit: submitForm
  })


  return (
     <>
        <div className="modal-bg">
            <div className="modal-container">
                <div className="modal-title">New Item</div>
                 <button className="close-btn" onClick={() => { dispatch(openModalAdd())}}>
                    <img src={CloseIcon} alt="close" />
                 </button>
               <form action="" onSubmit={handleSubmit} >
                   <div className="input-container">
                       <label htmlFor="itemname">Name</label>
                       <input 
                         type="text" 
                         name="itemname" 
                         id="name"
                         placeholder='Enter Name' 
                         value={values.itemname}
                         onBlur={handleBlur}
                         onChange={handleChange}
                       />
                     {
                       values.itemname !== '' ?   
                        <div className="error-container2">
                            {errors.itemname && touched.itemname && <p className='form-error'>{errors.itemname}</p>}
                        </div>
                        : ''
                     }
                   </div>
                   <div className="input-container">
                       <label htmlFor="price">Price</label>
                       <input 
                         type="number" 
                         name="price" 
                         id="price"
                         placeholder='Enter Price' 
                         value={values.price}
                         onBlur={handleBlur}
                         onChange={handleChange}
                       />
                      <img src={PesoIcon} alt="pesos" className='peso-icon' />
                     {
                       values.price !== '' ?   
                        <div className="error-container2">
                            {errors.price && touched.price && <p className='form-error'>{errors.price}</p>}
                        </div>
                        : ''
                     }
                   </div>
                   <div className="input-container">
                       <label htmlFor="genre">Genre</label>
                        <select 
                           name="genre" 
                           id=""
                           value={values.genre}
                           onBlur={handleBlur}
                           onChange={handleChange}
                        >
                           <option value="None">Select Genre</option>
                           <option value="Fantasy">Fantasy</option>
                           <option value="Sci-Fi">Sci Fi</option>
                        </select>
                      {
                        values.genre !== '' ?   
                          <div className="error-container2">
                              {errors.genre && touched.genre && <p className='form-error'>{errors.genre}</p>}
                          </div>
                          : ''
                       }
                   </div>
                   <div className="input-container">
                       <label htmlFor="image">Image</label>
                       <input 
                         type="file" 
                         name="image" 
                         placeholder='Select Image' 
                         onChange={(e) => {setUploadImage(e.target.files[0])}}
                       />
                        {
                            values.image !== '' ?   
                              <div className="error-container2">
                                  {errors.image && touched.image && <p className='form-error'>{errors.image}</p>}
                              </div>
                              : ''
                         }
                   </div>
                   <div className="input-container">
                       <label htmlFor="description">Description</label>
                        <textarea 
                            name="description"
                            id="" 
                            cols="65"
                            rows="5"
                            value={values.description}
                            onBlur={handleBlur}
                            onChange={handleChange}
                        />
                         {
                            values.description !== '' ?   
                              <div className="error-container2">
                                  {errors.description && touched.description && <p className='form-error'>{errors.description}</p>}
                              </div>
                              : ''
                         }
                   </div>
                   <button type="submit" className='submit-btn'>Submit</button>
               </form>
            </div>
        </div>
        {
           successModal ? 
           <AlertModal message={alertMessage}/> 
           :
           ''
        }
     </>
  )
}

export default ModalAddItem
