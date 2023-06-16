import { model, Schema } from "mongoose"
import { TreatmentModel } from "../models/treatment";

const treatmentSchema: Schema = new Schema(
  {
      from_id: {
        type: String,
        required: true,
      },
      to_id: {
        type: String,
        required: true,
      },
      note: {
        type: String,
        required: true,
      },
      from_name: {
        type: String,
        required: true
      },
      to_name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }

    
  },
  { timestamps: true }
)

export default model<TreatmentModel>("treatments", treatmentSchema);