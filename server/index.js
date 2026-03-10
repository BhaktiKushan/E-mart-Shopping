import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import cartRoutes from './routes/cart.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const getMongoUri = () => {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI

  const username = process.env.MONGODB_USERNAME
  const password = process.env.MONGODB_PASSWORD
  const cluster = process.env.MONGODB_CLUSTER
  const dbName = process.env.MONGODB_DB_NAME || 'emart'
  const options = process.env.MONGODB_OPTIONS || 'retryWrites=true&w=majority&appName=Cluster0'

  if (username && password && cluster) {
    const encodedUser = encodeURIComponent(username)
    const encodedPass = encodeURIComponent(password)
    return `mongodb+srv://${encodedUser}:${encodedPass}@${cluster}/${dbName}?${options}`
  }

  return 'mongodb://127.0.0.1:27017/emart'
}

const MONGODB_URI = getMongoUri()
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'emart'

app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/auth', authRoutes)
app.use('/api/cart', cartRoutes)

mongoose
  .connect(MONGODB_URI, { dbName: MONGODB_DB_NAME })
  .then(() => {
    console.log(`MongoDB connected (db: ${MONGODB_DB_NAME})`)
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  })
