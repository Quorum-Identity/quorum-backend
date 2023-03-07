export interface Dealer extends Document{
    _id: String,
from_id: String,
tipologia: String;
ragioneSociale: String;
tipoAzienda: String;
email: String;
password: String;
username: String;
indirizzo: String;
comune: String;
provincia: String;
cap: String;
pIva: String;
cFiscale: String;
sdi: Number;
pec: String;
referente: String;
telefono: String;
emailRef: String;
ruole: String;
dominio: String;
credito: Number;
sim: Number;
}