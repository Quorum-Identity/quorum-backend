import { ProductModel } from "./../models/product.model"
import { model, Schema } from "mongoose"

const productSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
        type: String,
        required: true,
      },
    date_publishing: {
        type: Date,
        required: true,
    },
    by_id: {
        type: String,
        required: true,
    },
    to_id: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    ammount: {
        type: Number,
        required: true,
    },
    images: {
        type: [String],
        required: false,
    },
    state: {
        type: Number,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    likes: {
        type: [String],
        required: false,
    },
    stars: {
        type: Array,
        required: false,
    },

    
  },
  { timestamps: true }
)

export default model<ProductModel>("products", productSchema);