
import './assets/App.css'
import About from './component/About/About'
import Hero from './component/Hero/Hero'
import Login from './component/Login/Login'
import AlertModal from './component/Modal/AlertModal/AlertModal'
import File from './component/file/File'
import Footer from './component/footer/Footer'
import Navbar from './component/navbar/Navbar'
import Purchase from './component/purchase/Purchase'
import Shop from './component/shop/Shop'

function App() {


  return (
    <>
      <Navbar/>
      <Hero/>
      <Shop/>
      <About/>
      <Purchase/>
      <Footer/>
    </>
  )
}

export default App
