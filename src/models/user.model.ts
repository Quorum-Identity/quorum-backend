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
  provincia_residenza: String,
  indirizzo_residenza: String,
  comune_residenza: String,
  codice_fiscale: String,
  telefono: String,
  cap_residenza: String,
  partita_iva: String,
  codice_sdi: String,
  ragione_sociale: String,
  pec_email: String,
  privato: DocumentDataModel
}
