import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  products: {
    type: Array,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model("Order", OrderSchema);
