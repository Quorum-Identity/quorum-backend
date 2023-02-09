import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Dealer } from "../models/dealer";
import dealerSchema from "../schema/dealerSchema";

export function createDealer(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body as Pick<
      Dealer,
      | "tipologia"
      | "ragioneSociale"
      | "tipoAzienda"
      | "email"
      | "username"
      | "indirizzo"
      | "comune"
      | "provincia"
      | "cap"
      | "pIva"
      | "cFiscale"
      | "sdi"
      | "pec"
      | "referente"
      | "telefono"
      | "emailRef"
      | "ruole"
    >;
    const addingDealer = new dealerSchema({
      tipologia: body.tipologia,
      ragioneSociale: body.ragioneSociale,
      tipoAzienda: body.tipoAzienda,
      email: body.email,
      username: body.username,
      indirizzo: body.indirizzo,
      comune: body.comune,
      provincia: body.provincia,
      cap: body.cap,
      pIva: body.pIva,
      cFiscale: body.cFiscale,
      sdi: body.sdi,
      pec: body.pec,
      referente: body.referente,
      telefono: body.telefono,
      emailRef: body.emailRef,
      ruole: body.ruole,
    });
    addingDealer.markModified("dealers");
    addingDealer.save();

    if (addingDealer) {
      return res
        .status(202)
        .json({ message: "Company registered", user: addingDealer });
    } else return res.status(204).json({ message: "Company not registered" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export function getDealer(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { cFiscale } = req.body as Pick<Dealer, "cFiscale">;
    dealerSchema.findOne({ cFiscale }, function (err, doc) {
      if (err) return res.status(404).json({ message: "Company don't found" });
      return res.status(202).json({ message: "Company found", dealers: doc });
    });
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export function upDateDealer(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { cFiscale } = req.body as Pick<Dealer, "cFiscale">;
    dealerSchema.findOneAndUpdate({ cFiscale }, function (err, doc) {
      if (err) return res.status(404).json({ message: "invalid Account" });
      return res.status(202).json({ message: "invalid body or error" });
    });
  } catch (error) {
    return res.status(505).json({ message: "invalid body" });
  }
}
