import React from 'react'
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
    <div className="navsection">
      <Link to='/'>
      <div className="mylogo">

      <img src="https://cdn.dribbble.com/users/13443688/screenshots/19703287/02.png" alt="" />
        <div className="title">Emart</div>
        
      </div>
      </Link>


        <div className="navsearch">
            <input type="text" placeholder='Search'/>
        </div>

        <div className="signin">
            <p>Signup</p>
        </div>

        <div className="cart">
        <ShoppingCart />
        <p>Cart</p>
        </div>
    </div>


    <div className="submenu">
      <ul>
        <Link to='/mobiles'>
        <li>Mobiles</li>
        </Link>

        <Link to='/computers'>
        <li>Computer</li>
        </Link>
        <Link to='/fridge'>
        <li>Fridge</li>
        </Link>

        <Link to='/furniture'>
        <li>Furniture</li>
        </Link>

        <Link to='/kitchen' >
        <li>Kitchen</li>
        </Link>

        <Link to='/men'>
        <li>Men</li>
        </Link>

        <Link to='/woman' >
        <li>Woman</li>
        </Link>

        <Link to='/ac'>
        <li>Ac</li>
        </Link>

        <Link to='/Speaker' >
        <li>Speaker</li>
        </Link>

        <Link to='/tv' >
        <li>Tv</li>
        </Link>

        <Link to='/Watch' >
        <li>Watch</li>
        </Link>
      </ul>
    </div>
    </>
  )
}

export default Navbar