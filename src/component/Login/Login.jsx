import React, { useEffect, useState } from 'react'
import './login.css'
import axios from 'axios'
import { FacebookColoredIcon, FacebookIcon, GoogleIcon } from '../../assets/img'
import { GoogleLogin, useGoogleLogin  } from '@react-oauth/google'
import { jwtDecode } from "jwt-decode"
import {LoginSocialFacebook} from 'reactjs-social-login'
import { loginSchema } from '../../schemas'
import {useFormik} from 'formik'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'



const Login = () => {
   // const config = {
   //    text: "Log in with Facebook",
   //    icon: `fa-brands fa-facebook`,
   //    iconFormat: name => `fa-brands fa-facebook`,
   //    style: { background: "#2f2f9b", color: "white", fontSize: "12px", borderRadius: "5px", width:'220px' },
   //    activeStyle: { background: "#d54b3d" },
   //    iconSize: '20px'
   // };

   // const MyFacebookLoginButton = createButton(config);


   const session = JSON.parse(sessionStorage.getItem('user'))
   const [openSignUp,setOpenSignUp] = useState(false)
   
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const [customError,setCustomError] = useState('')
   const [regloader,setRegLoader] = useState(false)
   const [thirdloader,setThirdLoader] = useState(false)

   const sendForm = () => {



     axios.post(`${import.meta.env.VITE_URL}/login`,{
         email: values.email,
         password: values.password,
     })
     .then(res => {
         const token = res.data.token
        if(res.status == 200){
      setRegLoader(true)
      axios.get(`${import.meta.env.VITE_URL}/findUser/${values.email}`,{
        headers: {
            'authorization': `${token}`
          }
      })
      .then((res) => {
          if(res.data[0].accesstype === 'admin'){
                setCustomError('')
                sessionStorage.setItem('user', JSON.stringify({
                    _id: res.data[0]._id,
                    username:res.data[0].username ,
                    userimage: 'https://i.pinimg.com/564x/d0/f6/dc/d0f6dc93be3fdf033e8c2b4715ef99d6.jpg',
                    firstname:res.data[0].firstname ,
                    lastname: res.data[0].lastname,
                    phonenumber: res.data[0].phonenumber,
                    email: res.data[0].email ,
                    address: res.data[0].address,
                    accesstype: res.data[0].accesstype,
                    status: 'login',
                    token: token
                }))
                setRegLoader(false)
                navigate('/localit/adminpage/itempage')
          }else{
                    setCustomError('')
                    sessionStorage.setItem('user', JSON.stringify({
                        _id: res.data[0]._id,
                        username:res.data[0].username ,
                        userimage: res.data[0].userimage.url,
                        firstname:res.data[0].firstname ,
                        lastname: res.data[0].lastname,
                        phonenumber: res.data[0].phonenumber,
                        email: res.data[0].email ,
                        address: res.data[0].address,
                        accesstype: res.data[0].accesstype,
                        status: 'login',
                        token: token
                    }))
                    setRegLoader(false)
                    navigate('/locallit/shoppage')
                }
      })
      .catch((err) => {
        setCustomError({
            email: 'Email does not exist',
            password: ''
        })
        setRegLoader(false)
        console.log(err)
      })
        }
    
     })
     .catch(err => {
        setCustomError(
            {
                email: '',
                password: 'Password is Incorrect'
            }
        )
     })

   
   }

 const googleLogin = (data) => {
  setThirdLoader(true)
  axios.get(`${import.meta.env.VITE_URL}/findUser/${data.email}`,)
  .then((res) => {
      if (res.data.length === 0) {
        axios.post(`${import.meta.env.VITE_URL}/addUser`,{
            username: data.given_name,
            userimage: data.picture,
            firstname: data.given_name,
            lastname: data.family_name,
            phonenumber: '',
            email: data.email,
            address: '',
            password: '',
            accesstype: 'thirdparty'
           })
           .then((res) => {
               if (res.status === 200) {
                  axios.get(`${import.meta.env.VITE_URL}/findUser/${data.email}`)
                  .then((res) => {
                      if (res.data[0].accesstype === 'thirdparty') {
                            sessionStorage.setItem('user', JSON.stringify({
                                _id: res.data[0]._id,
                                username:res.data[0].username ,
                                userimage: data.picture,
                                firstname:res.data[0].firstname ,
                                lastname: res.data[0].lastname,
                                phonenumber: res.data[0].phonenumber,
                                email: res.data[0].email ,
                                address: res.data[0].address,
                                accesstype: res.data[0].accesstype,
                                status: 'login'
                            }))
                            setThirdLoader(false)
                            navigate('/locallit/shoppage')
                      }
                  })
                  .catch(err => console.log(err))
               }
           })
           .catch(err => console.log(err))          
      } else {
        if (res.data[0].accesstype === 'thirdparty') {
            sessionStorage.setItem('user', JSON.stringify({
                _id: res.data[0]._id,
                username:res.data[0].username ,
                userimage: data.picture,
                firstname:res.data[0].firstname ,
                lastname: res.data[0].lastname,
                phonenumber: res.data[0].phonenumber,
                email: res.data[0].email ,
                address: res.data[0].address,
                accesstype: res.data[0].accesstype,
                status: 'login'
            }))
            setThirdLoader(false)
            navigate('/locallit/shoppage')
      }
      }
  })
  .catch(err => console.log(err))
 
 }

 const facebookLogin = (data) => {
    setThirdLoader(true)
    axios.get(`${import.meta.env.VITE_URL}/findUser/${data.first_name}`)
    .then((res) => {
         if (res.data.length === 0) {
            axios.post(`${import.meta.env.VITE_URL}/addUser`,{
                username: data.first_name,
                userimage: data.picture.data.url,
                firstname: data.first_name,
                lastname: data.last_name,
                phonenumber: '',
                email: data.email,
                address: '',
                password: '',
                accesstype: 'thirdparty'
               })
               .then((res) => {
                if (res.status === 200) {
                   axios.get(`${import.meta.env.VITE_URL}/findUser/${data.first_name}`)
                   .then((res) => {
                       if (res.data[0].accesstype === 'thirdparty') {
                             sessionStorage.setItem('user', JSON.stringify({
                                 _id: res.data[0]._id,
                                 username:res.data[0].username ,
                                 userimage: data.picture.data.url,
                                 firstname:res.data[0].firstname ,
                                 lastname: res.data[0].lastname,
                                 phonenumber: res.data[0].phonenumber,
                                 email: res.data[0].email ,
                                 address: res.data[0].address,
                                 accesstype: res.data[0].accesstype,
                                 status: 'login'
                             }))
                             setThirdLoader(false)
                             navigate('/locallit/shoppage')
                       }
                   })
                   .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
         } else {
            if (res.data[0].accesstype === 'thirdparty') {
                sessionStorage.setItem('user', JSON.stringify({
                    _id: res.data[0]._id,
                    username:res.data[0].username ,
                    userimage: data.picture.data.url,
                    firstname:res.data[0].firstname ,
                    lastname: res.data[0].lastname,
                    phonenumber: res.data[0].phonenumber,
                    email: res.data[0].email ,
                    address: res.data[0].address,
                    accesstype: res.data[0].accesstype,
                    status: 'login'
                }))
                setThirdLoader(false)
                navigate('/locallit/shoppage')
          }
         }
    })




   
 }


   const {values,handleBlur,handleChange,handleSubmit, errors, touched} = useFormik({
        initialValues: {
          email: '',
          password: ''
       },
       validationSchema: loginSchema,
       onSubmit: sendForm
   })



  return (
   
     <>
         <div className="login-container">
             <h1 className="login-title">Choose a Login Method</h1>
             <div className="loginmethod-container">
                 <div className='loginmethod'>
                   {
                      thirdloader ? 
                      <div className="loader-container" style={{marginLeft:'43%'}}>
                         <div className="loader"></div>
                      </div>
                      :
                      <div className="btn-container">
                      <GoogleLogin
                           onSuccess={(response) => {
                               const res = jwtDecode(response.credential)
                               if (res) {
                                   googleLogin(res)
                               }
                           }}
                           onError={(error) => {
                               console.log(error)
                           }}
                         />
                         {/* <LoginSocialFacebook 
                           appId = {`${import.meta.env.VITE_APP_ID}`}
                           onResolve = {(response) => {facebookLogin(response.data)}}
                           onReject = {(error) => {
                               console.log(error)
                           }}
                         >
                            <button className='facebook-btn'>
                            <img src={FacebookColoredIcon} alt="fbcolored" />
                               <h2>Login with Facebook</h2>
                            </button>
                         </LoginSocialFacebook> */}
                      </div>
                   }
                 </div>
                 <div className='center'>
                      <h2 className='center-text'>OR</h2>
                 </div>
                 <div className='loginmethod'>
                 {
                     regloader ? 
                     <div className="loader-container" style={{marginLeft:'50%'}}>
                        <div className="loader"></div>
                     </div>
                     :
                     <>
                     <form action="" onSubmit={handleSubmit}>
                     <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className='input-box'
                        placeholder='Enter email'
                        value={values.email}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        />
                        <div className="error-container">
                            {customError && <p className='form-error'>{customError.email}</p>}
                            {errors.email && touched.email && <p className='form-error'>{errors.email}</p>}
                        </div>
                      <input 
                        type="password" 
                        name="password" 
                        id="pass" 
                        className='input-box'
                        placeholder='Enter password'
                        value={values.password}
                        onBlur={handleBlur}
                        onChange={handleChange}
                       />
                        <div className="error-container">
                            {customError && <p className='form-error'>{customError.password}</p>}
                            {errors.password && touched.password && <p className='form-error'>{errors.password}</p>}
                        </div>
                       <button type="submit" className='login-btn'>Login</button>
                   </form>
                    <div className="signupredirect-container">
                       <p className='signup-subtext'>or <Link to='/locallit/signuppage' className='sign-up'>Sign up</Link></p>
                    </div>
                    </>
                 }
                  </div>
             </div>
         </div>
     </>
  )
}

export default Login
