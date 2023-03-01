"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upDateBusiness = exports.getBusiness = exports.createBusiness = void 0;
const express_validator_1 = require("express-validator");
const businessMan_1 = __importDefault(require("../schema/businessMan"));
function createBusiness(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const body = req.body;
        const addingBusiness = new businessMan_1.default({
            partitaIva: body.partitaIva,
            nome: body.nome,
            cognome: body.cognome,
            dataDiNascita: body.dataDiNascita,
            numeroDocumento: body.numeroDocumento,
            nazioneDiNascita: body.nazioneDiNascita,
            codiceFiscale: body.codiceFiscale,
            comuneDiNascita: body.comuneDiNascita,
            provinciaDiNascita: body.provinciaDiNascita,
            email: body.email,
            telefono: body.telefono,
            cellulare: body.cellulare,
            comuneDiResidenza: body.comuneDiResidenza,
            provinciaDiResidenza: body.provinciaDiResidenza,
            indirizzo: body.indirizzo,
            nCivico: body.nCivico,
            cap: body.cap,
            tipoDocumento: body.tipoDocumento,
            dataScadenza: body.dataScadenza,
            dataRilascio: body.dataRilascio,
            rilasciato: body.rilasciato,
            delegato: body.delegato,
        });
        addingBusiness.markModified('business');
        addingBusiness.save();
        if (addingBusiness) {
            return res.status(202).json({ message: "User registered", user: addingBusiness });
        }
        else
            return res.status(204).json({ message: "User not registered" });
    }
    catch (errors) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.createBusiness = createBusiness;
function getBusiness(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { partitaIva } = req.body;
        businessMan_1.default.findOne({ partitaIva }, function (err, doc) {
            if (err)
                return res.status(404).json({ message: "Invalid account" });
            return res.status(202).json({ message: "Account ", business: doc });
        });
    }
    catch (error) {
        return res.status(505).json({ message: "Invalid body or error" });
    }
}
exports.getBusiness = getBusiness;
function upDateBusiness(req, res) {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { partitaIva } = req.body;
        businessMan_1.default.findOneAndUpdate({ partitaIva }, function (err, doc) {
            if (err)
                return res.status(404).json({ message: "invalid Account" });
            return res.status(202).json({ message: "invalid body or error" });
        });
    }
    catch (error) {
        return res.status(505).json({ message: "invalid body" });
    }
}
exports.upDateBusiness = upDateBusiness;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVzaW5lc3NNYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYnVzaW5lc3NNYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseURBQW9EO0FBQ3BELHdFQUFzRDtBQUd0RCxTQUFnQixjQUFjLENBQUUsR0FBWSxFQUFFLEdBQWE7SUFDdkQsSUFBRztRQUNDLE1BQU0sTUFBTSxHQUFHLElBQUEsb0NBQWdCLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsSUFBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBQztZQUNqQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBQyxDQUFDLENBQUM7U0FDekQ7UUFDRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUF1QmQsQ0FBQTtRQUNGLE1BQU0sY0FBYyxHQUFHLElBQUkscUJBQWlCLENBQUM7WUFDMUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWE7WUFDakMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDdkMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO1lBQ2pDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsa0JBQWtCO1lBQzNDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3pCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxpQkFB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