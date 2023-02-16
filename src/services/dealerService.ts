import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Dealer } from "../models/dealer";
import dealerSchema from "../schema/dealerSchema";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";




export function createDealer(req: Request, res: Response) {
  try {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randPassword = [...Array(8)].map(_ => c[~~(Math.random()*c.length)]).join('');
    let encryptedrandPassword = bcrypt.hashSync(randPassword.toString(), 10);
    
    const body = req.body as Pick<
      Dealer,
      | "tipologia"
      | "ragioneSociale"
      | "tipoAzienda"
      | "email"
      | "password"
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
      |"dominio"
      | "credito"
      | "sim"
    >;
    const addingDealer = new dealerSchema({
      tipologia: body.tipologia,
      ragioneSociale: body.ragioneSociale,
      tipoAzienda: body.tipoAzienda,
      email: body.email,
      password:  encryptedrandPassword,
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
      dominio: body.dominio,
      credito : body.credito,
      sim: body.sim
    });
    addingDealer.markModified("dealers");
    addingDealer.save();

    if (addingDealer) {
      return res
        .status(202)
        .json({ message: "Dealer/Master Dealer registered", user: addingDealer, password: randPassword });
    } else return res.status(204).json({ message: "Dealer/Master Dealer not registered" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export function getDealer1(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { cFiscale } = req.body as Pick<Dealer, "cFiscale">;
    dealerSchema.findOne({ cFiscale }, function (err, doc) {
      if (err) return res.status(404).json({ message: "Dealer don't found" });
      console.log(res.status);
      
      return res.status(202).json({ message: "Dealer found", dealers: doc });
    });
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}




export function getDealer( req: Request | any, res: Response ) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    dealerSchema.findOne({_id: req._id}, function (err, doc) {
      if (err) return res.status(404).json({ message: "Dealer don't found" });
      return res.status(202).json({ message: "Dealer found", dealers: doc });
    });
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

 export async function loginDealer (req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body as Pick<Dealer, "email" | "password">
    const account = await dealerSchema.findOne({ email: body.email });
    if(account){
      if (bcrypt.compareSync(body.password.toString(), account.password.toString())) {
        const token = jwt.sign({ _id: account._id?.toString() }, "SECRET_EXAMPLE_KEY", {
          expiresIn: '2 days',
        });
        return res.status(202).json({message: "Account loggin", user: account, token});
      } else return res.status(404).json({message: "Invalid password"});
    } else return res.status(404).json({message: "Account not found"})
  } catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
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
