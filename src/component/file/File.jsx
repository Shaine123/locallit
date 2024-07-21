import React, { useEffect, useState } from 'react'
import './file.css'
import axios from 'axios'


const File = () => {
 
  const [file,setFile] = useState('')
  const [image,setImage] = useState('')
  const handleSubmit = () => {
      const formdata = new FormData()
      formdata.append('file',file)
      console.log(file)
      // console.log(formdata)
      axios.post(`${import.meta.env.VITE_URL}/uploadImg`,formdata)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    }

    useEffect(() => {
      axios.get(`${import.meta.env.VITE_URL}/getImg`)
      .then(res => setImage(res.data))
      .catch(err => console.log(err))
    },[])

    console.log(file)
  return (
     <>
        <div className="form-container">
           <input 
              type="file" 
               name="filename" 
               id="file" 
               onChange={e => setFile(e.target.files[0])}
            />
            <button onClick={handleSubmit}>Upload</button>
            {/* {
               image !== undefined ? 
               <img src={`${import.meta.env.VITE_URL}/images/${image[0].image}`} alt="img" />
               :
               <p>no image</p>
            } */}
            
        </div>
     </>
  )
}

export default File
