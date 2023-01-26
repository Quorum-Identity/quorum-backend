import { model, Schema } from "mongoose";
import { SocietyModel } from "../models/society";

const societySchema = new Schema(
  {
    partitaIva: {
      type: String,
      required: true,
    },

    nomeDitta: {
      type: String,
      required: true,
    },
    tipoAzienda: {
      type: String,
      required: true,
    },
    codiceSdi: {
      type: Number,
      required: true,
    },
    comuneAzienda: {
      type: String,
      required: true,
    },
    provinciaAzienda: {
      type: String,
      required: true,
    },
    indirizzo: {
      type: String,
      required: true,
    },
    civico: {
      type: Number,
      required: true,
    },
    cap: {
      type: Number,
      required: true,
    },
    telefono: {
      type: String,
      required: true,
    },
    cellulare: {
      type: String,
      required: true,
    },
    pEc: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rappresentanteLegale: {
      type: String,
      required: true,
    },
    delegato: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model<SocietyModel>("societies", societySchema);
