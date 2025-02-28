import React from 'react'
import Navbar from './Components/Navbar'
import Products from './Components/Products'

const Landingpage = () => {
  return (
    <div className='wallpaper'>

        <Navbar/>
        <img src="/assets/banner1.jpg" style={{width:'100%'}}/>
        <Products/>
        
    </div>
  )
}

export default Landingpage