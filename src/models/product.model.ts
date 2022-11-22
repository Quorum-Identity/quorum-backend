import { Document } from "mongoose"

export interface ProductModel extends Document {
    name: String,
    description: String,
    date_publishing: Date,
    by_id: String,
    to_id: String,
    price: Number,
    ammount: Number,
    images: [String],
    state: Number,
    type: Number,
    likes: [String],
    stars: []
}