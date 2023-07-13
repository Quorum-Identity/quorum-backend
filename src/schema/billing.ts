import { model, Schema } from "mongoose"
import { BillingModel } from "../models/billing";

const billingSchema: Schema = new Schema(
  {
      from_id: {
        type: String,
        required: true,
      },
      to_id: {
        type: String,
        required: false,
      },
      
      from_name: {
        type: String,
        required: true
      },
      to_name: {
        type: String,
        required: true
      },
      to_lastname: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      iva: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      specialization: {
        type: String,
        required: true
      },
      instagram: {
        type: String,
        required: true
      }

    
  },
  { timestamps: true }
)

export default model<BillingModel>("billing", billingSchema);