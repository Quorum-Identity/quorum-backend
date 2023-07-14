import { model, Schema } from "mongoose"
import { spesseModel } from "../models/spesse";

const spesseSchema: Schema = new Schema(
  {
      from_id: {
        type: String,
        required: true,
      },
      to_id: {
        type: String,
        required: false,
      },
      
     
      data: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: String,
        required: true
      },
      

    
  },
  { timestamps: true }
)

export default model<spesseModel>("spesse", spesseSchema);