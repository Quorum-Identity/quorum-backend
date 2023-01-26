import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { SocietyModel } from "../models/society";
import societySchema from "../schema/society";

export function createSociety(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body as Pick<
      SocietyModel,
      "partitaIva" |
      "nomeDitta" |
      "tipoAzienda" |     
      "comuneAzienda" |  
      "provinciaAzienda" |
      "indirizzo" |
      "civico" |
      "cap" |
      "telefono" |
      "cellulare" |
      "pEc" |
      "email" |
      "rappresentanteLegale" |
      "delegato" 
    >;
    const addingSociety = new societySchema({
        partitaIva: body.partitaIva,
        nomeDitta: body.nomeDitta,
        tipoAzienda: body.tipoAzienda,
        comuneAzienda: body.comuneAzienda,
        provinciaAzienda: body.provinciaAzienda,
        indirizzo: body.indirizzo,
        civico: body.civico,
        cap: body.cap,
        telefono: body.telefono,
        cellulare: body.cellulare,
        pRc: body.pEc,
        email: body.email,
        rappresentanteLegale: body.rappresentanteLegale,
        delegato: body.delegato,
    });
    addingSociety.markModified("society");
    addingSociety.save();

    if (addingSociety) {
      return res
        .status(202)
        .json({ message: "Society registered", user: addingSociety });
    } else return res.status(204).json({ message: "Private no register" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}


