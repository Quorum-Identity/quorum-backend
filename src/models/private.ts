import { Date, Document } from "mongoose";

export interface Private extends Document {
  codiceFiscale: String;
  nome: String;
  cognome: String;
  dataDiNascita: Date;
  comuneDiNascita: String;
  nazioneDiNascita: String;
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
  numeroDocumento: Number;
  dataScadenza: Date;
  dataRilascio: Date;
  rilasciato: String;
}
