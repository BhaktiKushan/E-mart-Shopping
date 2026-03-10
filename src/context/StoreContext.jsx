import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const StoreContext = createContext(null)

const cartKey = 'e-mart-cart'
const userKey = 'e-mart-user'
const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const parseLocal = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

const toCartItem = (product) => ({
  key: `${product.type || product.product}-${product.id}`,
  product,
  quantity: 1,
})

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => parseLocal(cartKey, []))
  const [currentUser, setCurrentUser] = useState(() => parseLocal(userKey, null))

  const persistCart = (items) => {
    setCartItems(items)
    localStorage.setItem(cartKey, JSON.stringify(items))
  }

  const persistUser = (user) => {
    setCurrentUser(user)
    localStorage.setItem(userKey, JSON.stringify(user))
  }

  const addToCartLocal = (product) => {
    const item = toCartItem(product)
    const existing = cartItems.find((cartItem) => cartItem.key === item.key)
    if (existing) {
      persistCart(cartItems.map((cartItem) => (cartItem.key === item.key ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem)))
      return
    }
    persistCart([...cartItems, item])
  }

  const addToCart = async (product) => {
    if (!currentUser?.id) {
      addToCartLocal(product)
      return
    }

    try {
      const response = await fetch(`${apiBase}/cart/${currentUser.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      const data = await response.json()
      persistCart(data.items || [])
    } catch {
      addToCartLocal(product)
    }
  }

  const updateQuantity = async (key, quantity) => {
    if (!currentUser?.id) {
      if (quantity <= 0) {
        persistCart(cartItems.filter((item) => item.key !== key))
      } else {
        persistCart(cartItems.map((item) => (item.key === key ? { ...item, quantity } : item)))
      }
      return
    }

    const response = await fetch(`${apiBase}/cart/${currentUser.id}/quantity`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, quantity }),
    })
    const data = await response.json()
    persistCart(data.items || [])
  }

  const removeFromCart = async (key) => {
    if (!currentUser?.id) {
      persistCart(cartItems.filter((item) => item.key !== key))
      return
    }

    const response = await fetch(`${apiBase}/cart/${currentUser.id}/item/${encodeURIComponent(key)}`, {
      method: 'DELETE',
    })
    const data = await response.json()
    persistCart(data.items || [])
  }

  const clearCart = async () => {
    if (!currentUser?.id) {
      persistCart([])
      return
    }

    await fetch(`${apiBase}/cart/${currentUser.id}/clear`, { method: 'DELETE' })
    persistCart([])
  }

  const signIn = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${apiBase}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await response.json()
      if (!response.ok) return { ok: false, message: data.message || 'Signup failed.' }
      persistUser(data.user)
      return { ok: true }
    } catch {
      const user = { id: `local-${Date.now()}`, name, email, password }
      persistUser(user)
      return { ok: true }
    }
  }

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      if (!response.ok) return { ok: false, message: data.message || 'Invalid credentials.' }
      persistUser(data.user)
      return { ok: true }
    } catch {
      const savedUser = parseLocal(userKey, null)
      if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
        return { ok: false, message: 'Invalid credentials.' }
      }
      setCurrentUser(savedUser)
      return { ok: true }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem(userKey)
  }

  useEffect(() => {
    if (!currentUser?.id) return

    const syncCart = async () => {
      try {
        const response = await fetch(`${apiBase}/cart/${currentUser.id}`)
        const data = await response.json()
        persistCart(data.items || [])
      } catch {
        // keep local cache if api unavailable
      }
    }

    syncCart()
  }, [currentUser?.id])

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems])

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0),
    [cartItems],
  )

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        currentUser,
        signIn,
        login,
        logout,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
