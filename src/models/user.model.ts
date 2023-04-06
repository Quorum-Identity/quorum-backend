import { Document } from "mongoose"

export type DocumentDataModel = {
    tipologia: String,
    numero: String,
    data_scadenza: String,
    data_rilascio: String,
    rilasciato_da: String
}
export interface UserModel extends Document {
  nome_completo: string,
  provincia_residenza: string,
  indirizzo_residenza: string,
  comune_residenza: string,
  codice_fiscale: string,
  telefono: string,
  cap_residenza: string,
  partita_iva: string,
  codice_sdi: string,
  ragione_sociale: string,
  pec_email: string,
  iccid: string,
  email: string,
  privato: DocumentDataModel,
  codice: string

}
