import { model, Schema } from "mongoose";
import { User } from "../models/user";





const userSchema = new Schema({
  
  password:{
    type: String,
    require: true,
  },
  
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    require: true,
  },
  type: {
    type: Number,
    require: true,
  },
  birth: {
    type: String,
    require: true,
  },
  placebirth: {
    type: String,
    require: true,
  },
  company: {
    type: String,
    require: true
  },
  identification_number: {
    type: String,
    require: true
  },
  votations: {
    type: Array<Object>,
    require: true
  }
},
  { timestamps: true }
);


export default model<User>("users", userSchema);
