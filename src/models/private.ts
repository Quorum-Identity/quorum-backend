import { Document } from "mongoose"

export interface Private extends Document {
  codiceFiscale: String;
  nome: String;
  cognome: String;
  dataDiNascita: Date;
  comuneDiNascita: String;
  provinciaDiNascita: String;
  nazioneDiNasita: String;
  email: String;
  telefono: String;
  cellulare: String;
  comuneDiResidenza: String;
  provinciaDiResidenza: String;
  indirizzo: String;
  nCivico: Number;
  cap: Number;
}



