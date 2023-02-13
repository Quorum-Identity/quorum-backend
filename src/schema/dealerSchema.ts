import { model, Schema } from "mongoose";
import { Dealer } from "../models/dealer";





const dealerSchema = new Schema({
  tipologia: {
    type: String,
    require: true,
  },
  ragioneSociale: {
    type: String,
    require: true,
  },
  password:{
    type: String,
    require: true,
  },
  tipoAzienda: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  usurname: {
    type: String,
    require: true,
  },
  indirizzo: {
    type: String,
    require: true,
  },
  comune: {
    type: String,
    require: true,
  },
  provincia: {
    type: String,
    require: true,
  },
  cap: {
    type: String,
    require: true,
  },
  pIva: {
    type: String,
    require: true,
  },
  cFiscale: {
    type: String,
    require: true,
  },
  sdi : {
    type: Number,
    require: true
  },
  pec : {
    type: String,
    require: true,
  },
  referente: {
    type: String,
    require: true
  },
  telefono: {
    type: String,
    require: true,
  },
  emailRef: {
    type: String,
    require: true,
  },
  ruole: {
    type: String,
    require: true
  },
  dominio: {
    type: String,
    require: true
  },
  logo: {
    type: String,
    require: true
  },
  colore1: {
    type: String,
    require: true
  },
  color2: {
    type: String,
    require: true
  },
  color3: {
    type: String,
    require: true
  }
},
  { timestamps: true }
);


export default model< Dealer>("dealers", dealerSchema);
