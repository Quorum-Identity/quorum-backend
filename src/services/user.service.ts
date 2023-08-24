import { Request, Response } from "express";
import { validationResult } from "express-validator";
import dealerSchema from "../schema/user";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import user from "../schema/user";
import { ObjectId } from "mongoose";

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
    
    const body = req.body;
    const addingDealer = new dealerSchema({
      password:  encryptedrandPassword,
      ...body
    });
    addingDealer.markModified("users");
    addingDealer.save()
    if (addingDealer) {
      return res
        .status(202)
        .json({ message: "User registered", user: addingDealer, password: randPassword });
    } else return res.status(204).json({ message: "User not registered" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}



export function resetPassword(req: Request | any, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { _id } = req.body as Pick<User, "_id">;
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
export async function getUserById( req: Request | any, res: Response ) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var responseUser = await dealerSchema.findOne({_id: req.body.id}, function (err, doc) {
      return doc;
    }).clone();

   
    return res.status(202).json({ message: "User found", user: responseUser});
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export async function getUser( req: Request | any, res: Response ) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    var responseUser = await dealerSchema.findOne({_id: req._id}, function (err, doc) {
      return doc;
    }).clone();
    var calendars: any[];


    return res.status(202).json({ message: "User found", user: responseUser});
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
    const body = req.body as Pick<User, "email" | "password">
    const account = await dealerSchema.findOne({ email: body.email });
    if(account){
      if (bcrypt.compareSync(body.password.toString(), account.password.toString())) {
        const token = jwt.sign({ _id: account._id.toString() }, "SECRET_EXAMPLE_KEY", {
          expiresIn: '2 days',
        });
        return res.status(202).json({message: "Account loggin", user: account, token});
      } else return res.status(404).json({message: "Invalid password"});
    } else return res.status(404).json({message: "Account not found", account})
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


