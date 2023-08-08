import { model, Schema } from "mongoose"
import { CalendarModel } from "../models/calendar";

const calendarSchema: Schema = new Schema(
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
      start: {
        type: String,
        required: true,
      },
      end: {
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
      to_medical: {
        type: String,
        required: true
      },
      to_medicalname: {
        type: String,
        required: true
      }
    
  },
  { timestamps: true }
)

export default model<CalendarModel>("calendars", calendarSchema);