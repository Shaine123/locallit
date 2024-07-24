import * as Yup from 'yup'

const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
export const loginSchema = Yup.object({
   email: Yup.string().email('Please Enter Valid Email').required('Please Enter Email'),
   password: Yup.string().required('Please Enter Your Password')
})

 export const signupSchema = Yup.object({
   username: Yup.string().min(5).required('Please Enter Your UserName'),
   firstname: Yup.string().min(2).required('Please Enter Your FirstName'),
   lastname: Yup.string().min(5).required('Please Enter Lastname'),
   phonenumber: Yup.number('Enter Valid PhoneNumber').integer().required('Please Enter Phone Number'),
   email: Yup.string().email('Please Enter Valid Email').required('Please Enter Email'),
   address: Yup.string().min(5).required('Please Enter Address'),
   password: Yup.string().min(5).required('Please Enter Password'),
   confirmpassword: Yup.string().oneOf([Yup.ref('password'),'Password Does Not Match']).required('Please Enter Password Again')
})

export const modalAddSchema = Yup.object({
    itemname: Yup.string().min(3).required('Please Enter Item Name'),
    price: Yup.number().integer().required('Please Enter Valid Price'),
    genre: Yup.string().required('Please Select Genre'),
    description: Yup.string().min(5).required('Please Enter A Description')
})

export const checkoutFormSchema = Yup.object({
   firstname: Yup.string().min(3).required('Please enter your firstname'),
   lastname: Yup.string().min(3).required('Please enter your lastname'),
   address: Yup.string().min(5).required('Please enter your addres'),
   city: Yup.string().min(4).required('Please enter your city/barangay'),
   postalcode: Yup.number('Please enter a valid postal code').required('Please enter your postal code') 
})

export const profileFormSchema = Yup.object({
   username: Yup.string().min(5).required('Please Enter Your UserName'),
   firstname: Yup.string().min(2).required('Please Enter Your FirstName'),
   lastname: Yup.string().min(5).required('Please Enter Lastname'),
   phonenumber: Yup.number('Enter Valid PhoneNumber').integer().required('Please Enter Phone Number'),
   email: Yup.string().email('Please Enter Valid Email').required('Please Enter Email'),
   address: Yup.string().min(5).required('Please Enter Address'),
   password: Yup.string().min(5).required('Please Enter Password'),
})