import { model, Schema } from "mongoose";
import { FreeWorks } from "../models/freeWorks";

const freeWorkSchema = new Schema(
  {
    partitaIva: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
    cognome: {
      type: String,
      required: true,
    },
    codiceFiscale: {
      type: String,
      required: true,
    },
    dataDiNascita: {
      type: Date,
      required: true,
    },
    comuneDiNascita: {
      type: String,
      required: true,
    },
    provinciaDiNascita: {
      type: String,
      required: true,
    },
    nazioneDiNascita: {
      type: String,
      required: true,
    },
    email: {
      type: String,
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
    comuneDiResidenza: {
      type: String,
      required: true,
    },
    indirizzo: {
      type: String,
      required: true,
    },
    nCivico: {
      type: Number,
      required: true,
    },
    cap: {
      type: Number,
      required: true,
    },
    tipoDocumento: {
      type: String,
      required: true,
    },
    numeroDocumento: {
      type: String,
      required: true,
    },
    dataRilascio: {
      type: Date,
      required: true,
    },
    dataScadenza: {
      type: Date,
      required: true,
    },
    rilasciato: {
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

export default model<FreeWorks>("freework", freeWorkSchema);