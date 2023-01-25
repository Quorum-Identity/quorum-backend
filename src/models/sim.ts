import { Document } from "mongoose";

export interface SimModel extends Document {
formato: String,
anno: Date,
fornitore: String,
pin: String,
offerta: Object
};


