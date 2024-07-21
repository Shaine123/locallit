import React from 'react'
import './alertmodal.css'
import { AlertCheckIcon } from '../../../assets/img'
import { motion } from 'framer-motion'

const AlertModal = ({message}) => {
  return (
     <>
       <motion.div 
         className="alertmodal-container"
         initial ={{
            scaleX: '-50%'
         }}
         animate={{
             scaleX: '100%'
         }}
         transition={{
          duration: 0.5,
          type: 'spring',
          stiffness: 50
         }}
        >
         <img src={AlertCheckIcon} alt="alert" className='alert-icon' />
          <div className="alert-text">
             <p className='alert-p'><span className='alert-span'>Success!</span> {message}</p>
          </div>
       </motion.div>
     </>
  )
}

export default AlertModal
