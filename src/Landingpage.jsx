import React from 'react'
import Navbar from './Components/Navbar'
import Products from './Components/Products'

const Landingpage = () => {
  return (
    <div className='wallpaper'>

        <Navbar/>
        <img src="/assets/banner1.jpg" className="hero-banner" alt="Shopping banner" />
        <Products/>
        
    </div>
  )
}

export default Landingpage