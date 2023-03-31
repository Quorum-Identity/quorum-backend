import { UserModel } from "./../models/user.model"
import { model, Schema } from "mongoose"
import { DocumentDataModel } from "./../models/user.model";


const userSchema: Schema = new Schema(
    {
        nome_completo: {
            type: String,
            required: true
        },
        provincia_residenza: {
            type: String,
            required: true
        },
        indirizzo_residenza: {
            type: String,
            required: true
        },
        comune_residenza: {
            type: String,
            required: true
        },
        codice_fiscale: {
            type: String,
            required: true
        },
        telefono: {
            type: String,
            required: true
        },
        cap_residenza: {
            type: String,
            required: true
        },
        partita_iva: {
            type: String,
            required: true
        },
        codice_sdi: {
            type: String,
            required: true
        },
        ragione_sociale: {
            type: String,
            required: true
        },
        pec_email: {
            type: String,
            required: true
        },
        privato: {
            type: Object,
            required: true
        },
        
    },
    
    { timestamps: true }
)

export default model<UserModel>("users", userSchema);