import React from 'react'
import Navbar from './Components/Navbar'
import Products from './Components/Products'
import banner from '../public/assets/banner1.jpg'

const Landingpage = () => {
  return (
    <div className='wallpaper'>

        <Navbar/>
        <img src={banner} style={{width:'100%'}}/>
        <Products/>
        
    </div>
  )
}

export default Landingpage