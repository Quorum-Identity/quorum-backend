import { UserModel } from "./../models/user.model"
import { model, Schema } from "mongoose"

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
        type: String,
        required: true,
      },
    date_birth: {
        type: Date,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    country: {
        type: Number,
        required: true,
    },
    province: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    type: {
        type: Number,
        required: true,
    },
    image_profile: {
        type: String,
        required: false,
    },
    image_banner: {
        type: String,
        required: false,
    },
    stars: {
        type: Array,
        required: false,
    },

    
  },
  { timestamps: true }
)

export default model<UserModel>("users", userSchema);