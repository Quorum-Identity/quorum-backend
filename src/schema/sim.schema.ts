import { model,Schema } from "mongoose";
import { SimModel } from "../models/sim";

const simSchema: Schema = new Schema (
    {
        formato :{
            type: String,
            required: true
        },
        anno : {
            type: Date,
            required: true
        },
        fornitore: {
            type: String,
            required: true,
        },
        pin: {
            type:String,
            required:true,
        },
        offerta: {
            type: Object,
            required: true,
        }
    },
    { timestamps: true }
)
export default model<SimModel>("sim", simSchema);
