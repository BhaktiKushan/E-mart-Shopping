import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const { cartCount, currentUser, logout } = useStore()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <>
      <div className='navsection'>
        <Link to='/' className='no-underline'>
          <div className='mylogo'>
            <img src='https://cdn.dribbble.com/users/13443688/screenshots/19703287/02.png' alt='E-mart logo' />
            <div className='title'>
              <span className='no-underline'>E-mart</span>
            </div>
          </div>
        </Link>

        <form className='navsearch' onSubmit={handleSearch}>
          <input
            type='text'
            placeholder='Search item name, brand, model...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        <div className='signin'>
          {currentUser ? (
            <>
              <p>Hello, {currentUser.name}</p>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to='/auth'><p>Signin / Login</p></Link>
          )}
        </div>

        <Link to='/cart' className='cart no-underline'>
          <FontAwesomeIcon icon={faShoppingCart} size='2x' className='carticon' />
          <p>Cart ({cartCount})</p>
        </Link>
      </div>

      <div className='submenu'>
        <ul>
          <li><Link to='/mobiles'>Mobiles</Link></li>
          <li><Link to='/computers'>Computer</Link></li>
          <li><Link to='/fridge'>Fridge</Link></li>
          <li><Link to='/furniture'>Furniture</Link></li>
          <li><Link to='/kitchen'>Kitchen</Link></li>
          <li><Link to='/men'>Men</Link></li>
          <li><Link to='/woman'>Woman</Link></li>
          <li><Link to='/ac'>Ac</Link></li>
          <li><Link to='/speaker'>Speaker</Link></li>
          <li><Link to='/tv'>Tv</Link></li>
          <li><Link to='/watch'>Watch</Link></li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
