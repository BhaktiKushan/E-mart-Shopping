import mongoose from 'mongoose'

const cartItemSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    product: {
      id: String,
      type: String,
      product: String,
      company: String,
      brand: String,
      model: String,
      image: String,
      price: String,
      description: String,
    },
  },
  { _id: false },
)

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
  },
  { timestamps: true },
)

const Cart = mongoose.model('Cart', cartSchema)

export default Cart
