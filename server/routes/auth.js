import express from 'express'
import User from '../models/User.js'

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(409).json({ message: 'Email already exists.' })
    }

    const user = await User.create({ name, email, password })
    return res.status(201).json({ user: { id: user._id.toString(), name: user.name, email: user.email } })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || user.password != password) {
      return res.status(401).json({ message: 'Invalid credentials.' })
    }

    return res.json({ user: { id: user._id.toString(), name: user.name, email: user.email } })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

export default router
