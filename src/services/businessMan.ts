import { Request, Response } from "express";
import {validationResult } from 'express-validator';
import businessManSchema from "../schema/businessMan";
import { BusinessMan } from "../models/businessMan";

export function createBusiness (req: Request, res: Response) {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const body = req.body as Pick<BusinessMan,
         "partitaIva" | 
         "nome" | 
         "cognome" | 
         "codiceFiscale" |
         "dataDiNascita" | 
         "comuneDiNascita" | 
         "provinciaDiNascita" |
         "nazioneDiNascita" |
         "numeroDocumento" |
         "email" |
         "telefono" |
         "cellulare" |
         "comuneDiResidenza" |
         "provinciaDiResidenza" |
         "indirizzo" |
         "nCivico" |
         "cap" |
         "tipoDocumento" |
         "dataScadenza" |
         "dataRilascio" |
         "rilasciato" |
         "delegato"
          >
         const addingBusiness = new businessManSchema({
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
         })
         addingBusiness.markModified('business');
         addingBusiness.save();
         
    if (addingBusiness){
        return res.status(202).json({ message: "User registered", user: addingBusiness });
      } else return res.status(204).json({ message: "User not registered"});
    }catch(errors){
        return res.status(505).json({message: "Invalid body or error"});
    }
}

export function getBusiness(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {partitaIva} = req.body as Pick<BusinessMan, "partitaIva">
      businessManSchema.findOne({ partitaIva }, 
        function(err, doc) {
        if (err) return res.status(404).json({message: "Invalid account"});
        return res.status(202).json({message: "Account ", business: doc});
      });
    } catch (error) {
      return res.status(505).json({ message: "Invalid body or error" });
    }
  }
  