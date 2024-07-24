import React, { useEffect, useState } from 'react'
import './profilepage.css'
import { useFormik } from 'formik'
import { profileFormSchema } from '../../schemas'
import {motion} from 'framer-motion'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import AlertModal from '../Modal/AlertModal/AlertModal'
import { openSuccessModal } from '../../state/universalSlice'
import { CarretIcon } from '../../assets/img'
import { useNavigate } from 'react-router-dom'
const ProfilePage = () => {

        //reroute for unauthorized users

        const navigate = useNavigate()
        const session = JSON.parse(sessionStorage.getItem('user'))
      
        useEffect(() => {
           if(session === null){
             navigate('/locallit/login')
           }
        },[])
     
        //-------------------------
 
  const [openSelect,setOpenSelect] = useState(false)
  const [data,setData] = useState([]) 
  const [profile,setProfile] =  useState({name:'Choose Profile' , url: ' '})
  
  const [alertMessage,setAlertMessage] = useState('')
  const {successModal} = useSelector(state => state.universal)
  const dispatch = useDispatch()



  useEffect(() => {
     axios.get(`${import.meta.env.VITE_URL}/findUser/${session.email}`,{headers: { 'authorization': `${session.token}`}})
     .then(res => {
      setData(res.data[0])
      setProfile({name:res.data[0].userimage.name , url: res.data[0].userimage.url })
     })
     .catch(err => console.log(err))
  }, [successModal])

  const handleProfile = (value) => {
    setProfile(value)
    setOpenSelect(false)
  }
  const submitForm = () => {
     axios.put(`${import.meta.env.VITE_URL}/editUser`,{
        username: values.username === '' ? data.username : values.username,
        userimage: profile.url === '' ? data.userimage : profile,
        firstname: values.firstname === '' ? data.firstname : values.firstname,
        lastname: values.lastname === '' ? data.lastname : values.lastname,
        phonenumber: values.phonenumber === '' ? data.phonenumber : values.phonenumber,
        email: values.email === '' ? data.email : values.email,
        address:  values.address === '' ? data.address : values.address,
        password:  values.password === '' ? data.password : values.password,
        accesstype: session.accesstype,
        id: data._id
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
     .catch(err => console.log(err))
  }
  
  
  const {values, errors, handleBlur, handleSubmit, touched, handleChange} = useFormik({
     initialValues:{
      username: '',
      userimage: profile.url,
      firstname: '',
      lastname: '',
      phonenumber: '',
      email: '',
      address: '',
      password: '',
     },
     onSubmit: submitForm
  })


  return (
    <div className='profilepage-container'>
       <h1 className="profilepage-title">Profile</h1>
        <form action="" className='profile-form' onSubmit={handleSubmit}>
           <div className="profform-container">
               <label htmlFor="username"   onClick={() => {setTest(item => !item)}}>Username</label>
               <input 
                  type="text" 
                  name='username'
                  value={values.username}
                  onChange={handleChange}
                  placeholder={values.username === '' ? data.username : 'Enter Username'}
                  onBlur={handleBlur}
               />
           </div>
           <div className="profform-container">
               <label htmlFor="userimage" className='profile-label'>Profile</label>
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
           <div className="profform-container">
               <label htmlFor="firstname">Firstname</label>
               <input 
                  type="text" 
                  name='firstname'
                  valus={values.firstname}
                  onChange={handleChange}
                  placeholder={values.firstname === '' ? data.firstname : 'Enter Firstname'}
                  onBlur={handleBlur}
               />
           </div>
           <div className="profform-container">
               <label htmlFor="lastname">Lastname</label>
               <input 
                  type="text" 
                  name='lastname'
                  valus={values.lastname}
                  onChange={handleChange}
                  placeholder={values.lastname === '' ? data.lastname : 'Enter Lastname'}
                  onBlur={handleBlur}
               />
           </div>
           <div className="profform-container">
               <label htmlFor="phonenumber">Phonenumber</label>
               <input 
                  type="text" 
                  name='phonenumber'
                  valus={values.phonenumber}
                  onChange={handleChange}
                  placeholder={values.phonenumber === '' ? data.phonenumber : 'Enter Phonenumber'}
                  onBlur={handleBlur}
               />
           </div>
           <div className="profform-container">
               <label htmlFor="email">Email</label>
               <input 
                  type="text" 
                  name='email'
                  valus={values.email}
                  onChange={handleChange}
                  placeholder={values.email === '' ? data.email : 'Enter Email'}
                  onBlur={handleBlur}
               />
           </div>
           <div className="profform-container">
               <label htmlFor="address">Address</label>
               <input 
                  type="text" 
                  name='address'
                  valus={values.address}
                  onChange={handleChange}
                  placeholder={values.address === '' ? data.address : 'Enter Address'}
                  onBlur={handleBlur}
               />
           </div>
           <div className="profform-container">
               <label htmlFor="password">Password</label>
               <input 
                  type="text" 
                  name='password'
                  valus={values.password}
                  onChange={handleChange}
                  placeholder={values.password === '' ? data.password : 'Enter Password'}
                  onBlur={handleBlur}
               />
           </div>
          <button type="submit" className='profsubmit-btn'>Submit</button>
        </form>
        {successModal && <AlertModal message={alertMessage}/>}
    </div>
  )
}

export default ProfilePage
