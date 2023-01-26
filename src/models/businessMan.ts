import { Document } from "mongoose";
import { Private } from "./private";

export interface BusinessMan extends Document {
  partitaIva: String;
  nome: String;
  cognome: String;
  codiceFiscale: String;
  dataDiNascita: Date;
  comuneDiNascita: String;
  provinciaDiNascita: String;
  email: String;
  telefono: String;
  cellulare: String;
  comuneDiResidenza: String;
  provinciaDiResidenza: String;
  indirizzo: String;
  nCivico: Number;
  cap: Number;
  tipoDocumento: String;
  dataScadenza: Date;
  dataRilascio: Date;
  rilasciato: String;
  delegato: String;
}
