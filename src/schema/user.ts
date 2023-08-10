import { model, Schema } from "mongoose";
import { User } from "../models/user";





const userSchema = new Schema({
  from_id: {
    type: String,
  },
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
  cap: {
    type: String,
    require: true,
  },
  telefono: {
    type: String,
    require: true,
  },
  cellulare: {
    type: String,
    require: true,
  },
  direction: {
    type: String,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  prov: {
    type: String,
    require: true,
  },
  note: {
    type: String,
    require: true,
  },
  prima: {
    type: String,
    require: true,
  },
  intervento: {
    type: String,
    require: true,
  },
  post: {
    type: String,
    require: true,
  },
},
  { timestamps: true }
);


export default model<User>("users", userSchema);
