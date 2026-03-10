import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
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
    <>
      <Navbar />
      <div className='auth-page'>
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className='payment-form' onSubmit={submit}>
          {!isLogin && <input placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />}
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className='error-text'>{error}</p>}
          <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
        </form>
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
        </button>
      </div>
    </>
  )
}

export default Auth
