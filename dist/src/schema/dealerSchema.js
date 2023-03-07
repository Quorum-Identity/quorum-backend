"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dealerSchema = new mongoose_1.Schema({
    from_id: {
        type: String,
    },
    tipologia: {
        type: String,
        require: true,
    },
    ragioneSociale: {
        type: String,
        require: true,
    },
    password: {
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
    sdi: {
        type: Number,
        require: true
    },
    pec: {
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
    credito: {
        type: Number,
        require: true
    },
    sim: {
        type: Number,
        require: true
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("dealers", dealerSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVhbGVyU2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NjaGVtYS9kZWFsZXJTY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBeUM7QUFPekMsTUFBTSxZQUFZLEdBQUcsSUFBSSxpQkFBTSxDQUFDO0lBQzlCLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxNQUFNO0tBQ2I7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxjQUFjLEVBQUU7UUFDZCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxRQUFRLEVBQUM7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxHQUFHLEVBQUc7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxHQUFHLEVBQUc7UUFDSixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsTUFBTTtRQUNaLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7Q0FDRixFQUNDLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxDQUNyQixDQUFDO0FBR0Ysa0JBQWUsSUFBQSxnQkFBSyxFQUFVLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyJ9