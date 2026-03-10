import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import cartRoutes from './routes/cart.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/emart'

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
