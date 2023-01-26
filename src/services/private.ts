import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Private } from "../models/private";
import privateSchema from "../schema/private";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import userSchema from "../schema/user.schema";
import bodyParser from "body-parser";

export function createPrivate(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body as Pick<
      Private,
      | "codiceFiscale"
      | "nome"
      | "cognome"
      | "dataDiNascita"
      | "comuneDiNascita"
      | "nazioneDiNascita"
      | "provinciaDiNascita"
      | "email"
      | "telefono"
      | "cellulare"
      | "comuneDiResidenza"
      | "provinciaDiResidenza"
      | "indirizzo"
      | "nCivico"
      | "cap"
      | "tipoDocumento"
      | "numeroDocumento"
      | "dataScadenza"
      | "dataRilascio"
      | "rilasciato"
    >;
    const addingPrivate = new privateSchema({
      codiceFiscale: body.codiceFiscale,
      nome: body.nome,
      cognome: body.cognome,
      dataDiNascita: body.dataDiNascita,
      comuneDiNascita: body.comuneDiNascita,
      nazioneDiNascita: body.nazioneDiNascita,
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
      numeroDocumento: body.numeroDocumento,
      rilasciato: body.rilasciato,
    });
    addingPrivate.markModified("private");
    addingPrivate.save();

    if (addingPrivate) {
      return res
        .status(202)
        .json({ message: "Private registered", user: addingPrivate });
    } else return res.status(204).json({ message: "Private no register" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

/*export  function getPrivate(req: Request, res: Response) {
  try {
    const token = req.cookies.access_token;
    const { codiceFiscale } = jwt.verify(token, "SECRET_EXAMPLE_KEY") as JwtPayload;
    const account = privateSchema.findOne({ codiceFiscale});
    if(account){
      return res.status(202).json({message: "User data", user: account});
    } else return res.status(404).json({message: "Invalid account"});
   
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}
*/
