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

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }
  return data
}

const getFriendlyErrorMessage = (error, fallbackMessage) => {
  const raw = (error?.message || '').toLowerCase()
  if (raw.includes('failed to fetch') || raw.includes('networkerror') || raw.includes('load failed')) {
    return `Backend API not reachable. Set VITE_API_URL correctly and ensure backend is running. Current API: ${apiBase}`
  }
  return error?.message || fallbackMessage
}

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
      persistCart(
        cartItems.map((cartItem) =>
          cartItem.key === item.key ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        ),
      )
      return
    }
    persistCart([...cartItems, item])
  }

  const addToCart = async (product) => {
    if (!currentUser?.id) {
      addToCartLocal(product)
      return { ok: true }
    }

    try {
      const response = await fetch(`${apiBase}/cart/${currentUser.id}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      })
      const data = await parseResponse(response)
      persistCart(data.items || [])
      return { ok: true }
    } catch (error) {
      return { ok: false, message: getFriendlyErrorMessage(error, 'Unable to add cart item on server.') }
    }
  }

  const updateQuantity = async (key, quantity) => {
    if (!currentUser?.id) {
      if (quantity <= 0) {
        persistCart(cartItems.filter((item) => item.key !== key))
      } else {
        persistCart(cartItems.map((item) => (item.key === key ? { ...item, quantity } : item)))
      }
      return { ok: true }
    }

    try {
      const response = await fetch(`${apiBase}/cart/${currentUser.id}/quantity`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, quantity }),
      })
      const data = await parseResponse(response)
      persistCart(data.items || [])
      return { ok: true }
    } catch (error) {
      return { ok: false, message: getFriendlyErrorMessage(error, 'Unable to update cart on server.') }
    }
  }

  const removeFromCart = async (key) => {
    if (!currentUser?.id) {
      persistCart(cartItems.filter((item) => item.key !== key))
      return { ok: true }
    }

    try {
      const response = await fetch(`${apiBase}/cart/${currentUser.id}/item/${encodeURIComponent(key)}`, {
        method: 'DELETE',
      })
      const data = await parseResponse(response)
      persistCart(data.items || [])
      return { ok: true }
    } catch (error) {
      return { ok: false, message: getFriendlyErrorMessage(error, 'Unable to remove cart item on server.') }
    }
  }

  const clearCart = async () => {
    if (!currentUser?.id) {
      persistCart([])
      return { ok: true }
    }

    try {
      const response = await fetch(`${apiBase}/cart/${currentUser.id}/clear`, { method: 'DELETE' })
      await parseResponse(response)
      persistCart([])
      return { ok: true }
    } catch (error) {
      return { ok: false, message: getFriendlyErrorMessage(error, 'Unable to clear cart on server.') }
    }
  }

  const signIn = async ({ name, email, password }) => {
    try {
      const response = await fetch(`${apiBase}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await parseResponse(response)
      persistUser(data.user)
      return { ok: true }
    } catch (error) {
      return {
        ok: false,
        message: getFriendlyErrorMessage(error, 'Signup failed. Check backend URL and MongoDB connection.'),
      }
    }
  }

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await parseResponse(response)
      persistUser(data.user)
      return { ok: true }
    } catch (error) {
      return {
        ok: false,
        message: getFriendlyErrorMessage(error, 'Login failed. Check backend URL and MongoDB connection.'),
      }
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem(userKey)
  }

  useEffect(() => {
    // remove pre-Mongo local users that do not have persistent DB id
    if (currentUser && !currentUser.id) {
      localStorage.removeItem(userKey)
      setCurrentUser(null)
    }
  }, [currentUser])

  useEffect(() => {
    if (!currentUser?.id) return

    const syncCart = async () => {
      try {
        const response = await fetch(`${apiBase}/cart/${currentUser.id}`)
        const data = await parseResponse(response)
        persistCart(data.items || [])
      } catch {
        // keep current cart UI, but do not fake a successful sync
      }
    }

    syncCart()
  }, [currentUser?.id])

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  )

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
        apiBase,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
