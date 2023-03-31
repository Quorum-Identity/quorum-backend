import { Request, Response } from "express";
import {validationResult } from 'express-validator';
import { UserModel } from "../models/user.model"
import UserSchema from "../schema/user.schema"
import jwt, { JwtPayload } from "jsonwebtoken";


async function registerUser (req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const body = req.body as Pick<UserModel, | "nome_completo" | "provincia_residenza" | "indirizzo_residenza" | "comune_residenza" | "telefono" | "codice_fiscale" | "cap_residenza" | "codice_sdi" | "partita_iva" | "ragione_sociale" | "pec_email" | "privato">
    const addingUser = new UserSchema({
      ...body
    });
    addingUser.markModified('users');
    addingUser.save();

    if (addingUser){
      return res.status(202).json({ message: "User registered", user: addingUser });
    } else return res.status(204).json({ message: "User not registered"});
  } catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
}
  
async function getUserByCodice (req: Request, res: Response) {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req?.body;
    const account = await UserSchema.findOne({ codice_fiscale: body?.codice_fiscale});
    if(account){
      return res.status(202).json({message: "User data", user: account});
    } else return res.status(404).json({message: "Invalid account"});
  }
  catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
}
async function getUserById (req: Request, res: Response) {
  try{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const token = req.cookies.access_token;
    const { _id } = jwt.verify(token, "SECRET_EXAMPLE_KEY") as JwtPayload;
    const account = await UserSchema.findOne({ _id});
    if(account){
      return res.status(202).json({message: "User data", user: account});
    } else return res.status(404).json({message: "Invalid account"});
  }
  catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
}
async function getUser (req: Request, res: Response) {
  try{
    const token = req.cookies.access_token;
    const { _id } = jwt.verify(token, "SECRET_EXAMPLE_KEY") as JwtPayload;
    const account = await UserSchema.findOne({ _id});
    if(account){
      return res.status(202).json({message: "User data", user: account});
    } else return res.status(404).json({message: "Invalid account"});
  }
  catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
}

async function updateUser (req: Request, res: Response ){
  try{
    const token = req.cookies.access_token;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { _id } = jwt.verify(token, "SECRET_EXAMPLE_KEY") as JwtPayload;
    const body = req.body as Pick<UserModel, | "nome_completo" | "provincia_residenza" | "indirizzo_residenza" | "comune_residenza"  | "telefono" | "codice_fiscale" | "cap_residenza" | "codice_sdi" | "partita_iva" | "ragione_sociale" | "pec_email" | "privato">
    UserSchema.findOneAndUpdate({ _id }, body, {upsert: true}, function(err, doc) {
      if (err) return res.status(404).json({message: "Invalid account"});
      return res.status(202).json({message: "Account updated"});
    });
  }
  catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
    
}



  
export {registerUser, getUser, updateUser, getUserById, getUserByCodice};
  