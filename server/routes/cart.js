import express from 'express'
import Cart from '../models/Cart.js'

const router = express.Router()

router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const cart = await Cart.findOne({ userId })
    res.json({ items: cart?.items || [] })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/:userId/add', async (req, res) => {
  try {
    const { userId } = req.params
    const { product } = req.body
    const key = `${product.type || product.product}-${product.id}`

    let cart = await Cart.findOne({ userId })
    if (!cart) cart = await Cart.create({ userId, items: [] })

    const existing = cart.items.find((item) => item.key === key)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.items.push({ key, product, quantity: 1 })
    }

    await cart.save()
    res.json({ items: cart.items })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:userId/quantity', async (req, res) => {
  try {
    const { userId } = req.params
    const { key, quantity } = req.body
    const cart = await Cart.findOne({ userId })
    if (!cart) return res.json({ items: [] })

    if (quantity <= 0) {
      cart.items = cart.items.filter((item) => item.key !== key)
    } else {
      const found = cart.items.find((item) => item.key === key)
      if (found) found.quantity = quantity
    }

    await cart.save()
    res.json({ items: cart.items })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:userId/item/:key', async (req, res) => {
  try {
    const { userId, key } = req.params
    const cart = await Cart.findOne({ userId })
    if (!cart) return res.json({ items: [] })

    cart.items = cart.items.filter((item) => item.key !== key)
    await cart.save()
    res.json({ items: cart.items })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:userId/clear', async (req, res) => {
  try {
    const { userId } = req.params
    const cart = await Cart.findOne({ userId })
    if (!cart) return res.json({ items: [] })

    cart.items = []
    await cart.save()
    res.json({ items: [] })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
