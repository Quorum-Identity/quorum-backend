import { model, Schema } from "mongoose"
import { HistoryModel } from "../models/history";

const historySchema: Schema = new Schema(
  {
    from_id: {
      type: String,
      required: true,
    },
    to_id: {
        type: String,
        required: true,
      },
    to_name: {
        type: String,
        required: true,
    },
    ammount: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    from_name: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: true
    }

    
  },
  { timestamps: true }
)

export default model<HistoryModel>("histories", historySchema);