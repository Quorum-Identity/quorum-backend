import { Request, Response } from "express";
import { validationResult } from "express-validator";
import dealerSchema from "../schema/dealerSchema";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";
import { Dealer } from "../models/dealer";
import historySchema from '../schema/history';

const statictoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZHV0ZW50ZSI6IjQ1IiwiaWRhcHBsaWNhemlvbmUiOiIyIiwiaWRjb250ZXN0byI6IjAiLCJub21lIjoiRU1PQklMRTI0IiwiY29nbm9tZSI6IkVNT0JJTEUyNCIsIm5iZiI6MTY3OTA1OTQ1NiwiZXhwIjoxNzEwNTk1NDU2LCJpYXQiOjE2NzkwNTk0NTZ9.wsdwUoTivWI3tyK5diDI63_IFXOQ5wEnlww_9DTDYLM';


export function createUser(req: Request | any, res: Response) {
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
      | "sim" | "from_id"
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
      sim: body.sim,
      from_id: body.from_id
    });
    addingDealer.markModified("dealers");
    addingDealer.save()
    if (addingDealer) {
      return res
        .status(202)
        .json({ message: "Dealer/Master Dealer registered", user: addingDealer, password: randPassword });
    } else return res.status(204).json({ message: "Dealer/Master Dealer not registered" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export function getUserParents(req: Request | any, res: Response) {
  try {
    
    
    dealerSchema.find({ from_id: req._id }, function (err, doc) {
      if (err) return res.status(404).json({ message: "Dealers don't found" });
      
      return res.status(202).json({ message: "Dealer found", dealers: doc });
    });
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}


export function resetPassword(req: Request | any, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { _id } = req.body as Pick<Dealer, "_id">;
    const c = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randPassword = [...Array(8)].map(_ => c[~~(Math.random()*c.length)]).join('');
    let encryptedrandPassword = bcrypt.hashSync(randPassword.toString(), 10);
    dealerSchema.findOneAndUpdate({_id}, { password: encryptedrandPassword }, function (err, doc) {
      if (err) return res.status(404).json({ message: "invalid body or error" });
      return res.status(202).json({ message: "Password Updated", password: randPassword });
    });
    
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export function getUser( req: Request | any, res: Response ) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    dealerSchema.findOne({_id: req._id}, function (err, doc) {
      if (err) return res.status(404).json({ message: "Dealer don't found" });
      return res.status(202).json({ message: "Dealer found", dealers: doc , external_token: statictoken});
    });
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

 export async function loginUser (req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body as Pick<Dealer, "email" | "password">
    const account = await dealerSchema.findOne({ email: body.email });
    if(account){
      if (bcrypt.compareSync(body.password.toString(), account.password.toString())) {
        const token = jwt.sign({ _id: account._id.toString() }, "SECRET_EXAMPLE_KEY", {
          expiresIn: '2 days',
        });
        return res.status(202).json({message: "Account loggin", user: account, token, external_token: statictoken});
      } else return res.status(404).json({message: "Invalid password"});
    } else return res.status(404).json({message: "Account not found"})
  } catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
}


export function updateUser(req: Request | any, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    dealerSchema.findOneAndUpdate({_id: req.body?.id}, { ...req.body! }, function (err, doc) {
      if (err) return res.status(404).json({ message: "invalid Account"});
      return res.status(202).json({ message: "Updated", user: doc});
    });
  } catch (error) {
    return res.status(505).json({ message: "invalid body" });
  }
}


