import { Document } from "mongoose"

export interface UserModel extends Document {
  name: String,
  lastname: String,
  date_birth: Date,
  password: String,
  country: Number,
  province: Number,
  email: String,
  phone: String,
  type: Number,
  image_profile: String,
  image_banner: String,
  stars: []
}
