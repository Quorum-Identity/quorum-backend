import { Request, Response } from "express";
import { validationResult } from "express-validator";
import dealerSchema from "../schema/user";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import calendarSchema from '../schema/calendar';

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

export function getClients(req: Request | any, res: Response) {
  try {
    const body = req.body;
    
    dealerSchema.find({type: 0, from_id: body.id }, function (err, doc) {
      if (err) return res.status(404).json({ message: "Clients don't found" });
      
      return res.status(202).json({ message: "Clients found", clients: doc });
    });
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}
export function getMedicals(req: Request | any, res: Response) {
  try {
    const body = req.body;
    
    dealerSchema.find({type: 2, from_id: body.id }, function (err, doc) {
      if (err) return res.status(404).json({ message: "Medicals don't found" });
      
      return res.status(202).json({ message: "Medicals found", medical: doc });
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

export async function getUser( req: Request | any, res: Response ) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log('1');
    var responseUser = await dealerSchema.findOne({_id: req._id}, function (err, doc) {
      return doc;
    }).clone();
    console.log('2');
    var calendars: any[];

    calendarSchema.findOne({from_id: req._id}, function (err, doc) {
      calendars = doc;
    }).limit(1).clone();
    console.log('3');

    calendarSchema.findOne({to_id: req._id}, function (err, doc) {
      calendars += doc;
    }).limit(1).clone();
    
    var calendar;
    if(calendars! !== undefined){
      if(calendars!.length > 0){
        if(calendars!.length === 1){
          calendar = calendars![0];
        }else {
          console.log(calendars![0]);
          if(calendars![0]!.createdAt.getTime > calendars![1]!.createdAt.getTime){
            calendar = calendars![1];
          } else calendar = calendars![0];
        }
      }
    }

    return res.status(202).json({ message: "User found", user: responseUser , calendar});
  } catch (error) {
    console.log(error);
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
        return res.status(202).json({message: "Account loggin", user: account, token, external_token: statictoken});
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


