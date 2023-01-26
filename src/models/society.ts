import { Private } from "./private";

export interface SocietyModel extends Document{
    partitaIva: String,
    nomeDitta: String,
    tipoAzienda: String,
    codiceSdi: Number,
    comuneAzienda: String,
    provinciaAzienda: String,
    indirizzo: String,
    civico: Number,
    cap: Number,
    telefono: String,
    cellulare: String,
    pEc: String,
    email: String,
    rappresentanteLegale: String,
    delegato: String,
}