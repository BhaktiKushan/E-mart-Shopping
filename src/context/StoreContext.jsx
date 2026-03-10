import { createContext, useContext, useMemo, useState } from 'react'

const StoreContext = createContext(null)

const cartKey = 'e-mart-cart'
const userKey = 'e-mart-user'

const parseLocal = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => parseLocal(cartKey, []))
  const [currentUser, setCurrentUser] = useState(() => parseLocal(userKey, null))

  const persistCart = (items) => {
    setCartItems(items)
    localStorage.setItem(cartKey, JSON.stringify(items))
  }

  const addToCart = (product) => {
    const key = `${product.type || product.product}-${product.id}`
    const existing = cartItems.find((item) => item.key === key)
    if (existing) {
      persistCart(
        cartItems.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      )
      return
    }

    persistCart([
      ...cartItems,
      {
        key,
        product,
        quantity: 1,
      },
    ])
  }

  const updateQuantity = (key, quantity) => {
    if (quantity <= 0) {
      persistCart(cartItems.filter((item) => item.key !== key))
      return
    }
    persistCart(cartItems.map((item) => (item.key === key ? { ...item, quantity } : item)))
  }

  const removeFromCart = (key) => {
    persistCart(cartItems.filter((item) => item.key !== key))
  }

  const clearCart = () => persistCart([])

  const signIn = ({ name, email, password }) => {
    const user = { name, email, password }
    setCurrentUser(user)
    localStorage.setItem(userKey, JSON.stringify(user))
  }

  const login = ({ email, password }) => {
    const savedUser = parseLocal(userKey, null)
    if (!savedUser || savedUser.email !== email || savedUser.password !== password) {
      return false
    }
    setCurrentUser(savedUser)
    return true
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem(userKey)
  }

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
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => useContext(StoreContext)
