import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import { useStore } from '../context/StoreContext'

const Payment = () => {
  const { state } = useLocation()
  const { clearCart } = useStore()
  const product = state?.product
  const cartItems = state?.cartItems || []

  const total = product
    ? Number(product.price)
    : cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (cartItems.length) {
      clearCart()
    }
    alert('Payment successful!')
  }

  return (
    <>
      <Navbar />

      <div className='payment-page'>
        <h2>Process Payment</h2>

        {product ? (
          <div className='payment-product'>
            <img src={product.image} alt={product.model} />
            <div>
              <h3>{product.company || product.brand} {product.model}</h3>
              <p>Amount: ${product.price}</p>
            </div>
          </div>
        ) : cartItems.length ? (
          <div>
            {cartItems.map(({ key, product: p, quantity }) => (
              <div className='payment-product' key={key}>
                <img src={p.image} alt={p.model} />
                <div>
                  <h3>{p.company || p.brand} {p.model}</h3>
                  <p>{quantity} x ${p.price}</p>
                </div>
              </div>
            ))}
            <h3>Total Amount: ${total.toFixed(2)}</h3>
          </div>
        ) : (
          <p>Please select a product before making payment.</p>
        )}

        <form className='payment-form' onSubmit={handleSubmit}>
          <input type='text' placeholder='Cardholder Name' required />
          <input type='text' placeholder='Card Number' required />
          <div className='payment-row'>
            <input type='text' placeholder='MM/YY' required />
            <input type='password' placeholder='CVV' required />
          </div>
          <button type='submit'>Pay Now</button>
        </form>

        <Link to='/' className='payment-home-link'>Continue Shopping</Link>
      </div>
    </>
  )
}

export default Payment
