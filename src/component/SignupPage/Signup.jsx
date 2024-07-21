import React, { useState } from 'react'
import './signup.css'
import { useFormik } from 'formik'
import { signupSchema } from '../../schemas'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { openSuccessModal } from '../../state/universalSlice'
import { motion } from 'framer-motion'
import AlertModal from '../Modal/AlertModal/AlertModal'
import { CarretIcon } from '../../assets/img'
const Signup = () => {

  const {successModal} = useSelector(state => state.universal)
  const [message,setMessage] = useState('')
  const dispatch = useDispatch()

  const [profile,setProfile] =  useState({name:'Choose Profile' , url: ' '})
  const [openSelect,setOpenSelect] = useState(false)

  const submitForm = (values) => {
       axios.post(`${import.meta.env.VITE_URL}/addUser`,values )
       .then((res) => {
            setMessage(res.data.message)
           if(res.status === 200){
               dispatch(openSuccessModal())
              setTimeout(() => {
                dispatch(openSuccessModal())     
              },2000)
           } 
       })
       .catch(err => console.log(err))
  }
  const {values, handleChange, handleSubmit, handleBlur,  errors, touched} = useFormik({
      initialValues: {
          username: '',
          userimage: profile,
          firstname: '',
          lastname: '',
          phonenumber: '',
          email: '',
          address: '',
          password: '',
          confirmpassword: '',
          accesstype: 'user'
      },
      validationSchema: signupSchema,
      onSubmit: submitForm
  })

  const handleProfile = (value) => {
    setProfile(value)
    setOpenSelect(false)
  }
  return (
     <>
        <div className="signuppage-container">
            <h1 className="signup-title">Create An Account</h1>
            <div className="signup-select">
            <button type='button' className="select-item" onClick={() => {setOpenSelect(state => !state)}}>
               {profile.name}
               <motion.img 
                   src={CarretIcon} 
                   alt="carret" 
                   animate={{
                     rotate: openSelect ? '180deg' : '0deg'
                   }}
              />
            </button>
                <motion.div 
                  initial={{
                     display: 'none',
                     height: 'auto',
                     opacity: 0
                  }}
                  animate ={{
                     display: openSelect ? 'block' : 'none',
                     height: openSelect ? 'auto' : '50px',
                     opacity: openSelect ? 1 : 0
                  }}
                  transition={{
                    duration: 0.5,
                     
                  }}  
          
                  className="select-box"
                 >
                  <div className="select-values" onClick={()=>{handleProfile({name:'Profile 1' , url: 'https://i.pinimg.com/564x/ba/42/0e/ba420e792cab3a0a475fffd768c44c87.jpg'})}}>
                     <div className="select-value">
                      <img className = 'select-img'src="https://i.pinimg.com/564x/ba/42/0e/ba420e792cab3a0a475fffd768c44c87.jpg" alt="img1"  />
                      <p className='select-desc'>Profile 1</p>
                     </div>
                  </div>
                  <div className="select-values" onClick={()=>{handleProfile({name:'Profile 2' , url: 'https://i.pinimg.com/564x/d0/f6/dc/d0f6dc93be3fdf033e8c2b4715ef99d6.jpg'})}}>
                     <div className="select-value">
                      <img className = 'select-img'src="https://i.pinimg.com/564x/d0/f6/dc/d0f6dc93be3fdf033e8c2b4715ef99d6.jpg" alt="img1"  />
                      <p className='select-desc'>Profile 2</p>
                     </div>
                  </div>
                  <div className="select-values" onClick={()=>{handleProfile({name:'Profile 3' , url: 'https://i.pinimg.com/564x/47/83/70/47837078bb80297b5f9d626199256415.jpg'})}}>
                     <div className="select-value">
                      <img className = 'select-img'src="https://i.pinimg.com/564x/47/83/70/47837078bb80297b5f9d626199256415.jpg" alt="img1"  />
                      <p className='select-desc'>Profile 3</p>
                     </div>
                  </div>
                  <div className="select-values" onClick={()=>{handleProfile({name:'Profile 4' , url: 'https://i.pinimg.com/564x/9b/ca/78/9bca78a3c7727f355f31cb922e676c1e.jpg'})}}>
                     <div className="select-value">
                      <img className = 'select-img'src="https://i.pinimg.com/564x/9b/ca/78/9bca78a3c7727f355f31cb922e676c1e.jpg" alt="img1"  />
                      <p className='select-desc'>Profile 4</p>
                     </div>
                  </div>
                  <div className="select-values" onClick={()=>{handleProfile({name:'Profile 5' , url: 'https://i.pinimg.com/564x/31/63/15/316315aca5c6fa61fb48f679d3ca3869.jpg'})}}>
                     <div className="select-value">
                      <img className = 'select-img'src="https://i.pinimg.com/564x/31/63/15/316315aca5c6fa61fb48f679d3ca3869.jpg" alt="img1"  />
                      <p className='select-desc'>Profile 5</p>
                     </div>
                  </div>
                  <div className="select-values" onClick={()=>{handleProfile({name:'Profile 6' , url: 'https://i.pinimg.com/564x/d0/b7/0d/d0b70da7b154c0d593b7a88e11219c51.jpg'})}}>
                     <div className="select-value">
                      <img className = 'select-img'src="https://i.pinimg.com/564x/d0/b7/0d/d0b70da7b154c0d593b7a88e11219c51.jpg" alt="img1"  />
                      <p className='select-desc'>Profile 6</p>
                     </div>
                  </div>
                </motion.div>
            </div>
           
         <form action="" className='signup-form' onSubmit={handleSubmit}>
           <div>
            <label htmlFor="username" style={{display: 'block'}}>Username</label>
              <input 
                type="text" 
                name='username'
                className='signup-input'
                value={values.username}
                onBlur={handleBlur}
                placeholder='Enter Username'
                onChange = {handleChange}
              />
            <div className="error-container">
                {errors.username && touched.username && <p className='form-error'>{errors.username}</p>}
            </div>
           </div>
            <div>
            <label htmlFor="firstname" style={{display: 'block'}}>FirstName</label>
            <input 
              type="text" 
              name='firstname'
              className='signup-input'
              value={values.firstname}
              onBlur={handleBlur}
              placeholder='Enter Firstname'
              onChange = {handleChange}
            />
             <div className="error-container">
                {errors.firstname && touched.firstname && <p className='form-error'>{errors.firstname}</p>}
            </div>
            </div>
            <div>
              <label htmlFor="lastname" style={{display: 'block'}}>LastName</label>
              <input 
                type="text" 
                name='lastname'
                className='signup-input'
                value={values.lastname}
                onBlur={handleBlur}
                placeholder='Enter Lastname'
                onChange = {handleChange}
              />
             <div className="error-container">
                {errors.lastname && touched.lastname && <p className='form-error'>{errors.lastname}</p>}
            </div>
            </div>
            <div>
              <label htmlFor="phonenumber" style={{display: 'block'}}>PhoneNumber</label>
              <input 
                type="text" 
                name='phonenumber'
                className='signup-input'
                value={values.phonenumber}
                onBlur={handleBlur}
                placeholder='Enter Phonenumber'
                onChange = {handleChange}
              />
             <div className="error-container">
                {errors.phonenumber && touched.phonenumber && <p className='form-error'>{errors.phonenumber}</p>}
            </div>
            </div>
             <div>
              <label htmlFor="email" style={{display: 'block'}}>Email</label>
              <input 
                type="email" 
                name='email'
                className='signup-input'
                value={values.email}
                onBlur={handleBlur}
                placeholder='Enter Email'
                onChange = {handleChange}
              />
             <div className="error-container">
                {errors.email && touched.email && <p className='form-error'>{errors.email}</p>}
            </div>
             </div>
              <div> 
                <label htmlFor="address" style={{display: 'block'}}>Address</label>
                <input 
                  type="text" 
                  name='address'
                  className='signup-input'
                  value={values.address}
                  onBlur={handleBlur}
                  placeholder='Enter Address'
                  onChange = {handleChange}
                />
              <div className="error-container">
                  {errors.address && touched.address && <p className='form-error'>{errors.address}</p>}
              </div>
              </div>
             <div>
              <label htmlFor="password" style={{display: 'block'}}>Password</label>
              <input 
                type="password" 
                name='password'
                className='signup-input'
                value={values.password}
                onBlur={handleBlur}
                placeholder='Enter Password'
                onChange = {handleChange}
              />
              <div className="error-container">
                  {errors.password && touched.password && <p className='form-error'>{errors.password}</p>}
              </div>
             </div>
             <div>
             <label htmlFor="cpassword" style={{display: 'block'}}>Confrim Password</label>
            <input 
              type="password" 
              name='confirmpassword'
              className='signup-input'
              value={values.confirmpassword}
              onBlur={handleBlur}
              placeholder='Enter CPassword'
              onChange = {handleChange}
            />
              <div className="error-container">
                  {errors.confirmpassword && touched.confirmpassword && <p className='form-error'>{errors.confirmpassword}</p>}
              </div>
            </div>
             <button type="submit" className='signup-btn'>Sign Up</button>
         </form>
        </div>
        { 
           successModal ? <AlertModal message = {message}/> : ''
        }
     </>
  )
}

export default Signup
