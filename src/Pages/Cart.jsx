import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { useStore } from '../context/StoreContext'

const Cart = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useStore()
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <div className='list-page'>
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Cart is empty. <Link to='/'>Go shopping</Link></p>
        ) : (
          <>
            {cartItems.map(({ key, product, quantity }) => (
              <div className='cart-row' key={key}>
                <img src={product.image} alt={product.model} />
                <div>
                  <h4>{product.company || product.brand} {product.model}</h4>
                  <p>${product.price}</p>
                </div>
                <div className='cart-controls'>
                  <button onClick={() => updateQuantity(key, quantity - 1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => updateQuantity(key, quantity + 1)}>+</button>
                  <button onClick={() => removeFromCart(key)}>Remove</button>
                </div>
              </div>
            ))}
            <h3>Total: ${cartTotal.toFixed(2)}</h3>
            <button onClick={() => navigate('/payment', { state: { cartItems } })}>Checkout Cart</button>
          </>
        )}
      </div>
    </>
  )
}

export default Cart
