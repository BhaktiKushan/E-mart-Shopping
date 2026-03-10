import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../context/StoreContext'

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signIn, login } = useStore()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    setError('')

    if (isLogin) {
      const ok = login({ email, password })
      if (!ok) {
        setError('Invalid credentials. Please sign up first or check details.')
        return
      }
    } else {
      signIn({ name: name || 'User', email, password })
    }

    navigate('/')
  }

  return (
    <div className='auth-shell'>
      <div className='auth-card'>
        <h2>{isLogin ? 'Welcome Back' : 'Create Your Account'}</h2>
        <p className='auth-subtext'>
          {isLogin
            ? 'Login to continue your shopping journey.'
            : 'Sign up to save cart items and checkout faster.'}
        </p>

        <form className='auth-form' onSubmit={submit}>
          {!isLogin && (
            <input
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className='error-text'>{error}</p>}
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
        </form>

        <button className='auth-toggle' onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>

        <Link to='/' className='auth-home-link'>← Back to Home</Link>
      </div>
    </div>
  )
}

export default Auth
