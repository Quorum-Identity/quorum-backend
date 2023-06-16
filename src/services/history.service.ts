import { Request, Response } from "express";
import { validationResult } from "express-validator";

import historySchema from '../schema/history';

export function createHistory(req: Request | any, res: Response) {
  try {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const body = req.body;
    const addingHistory = new historySchema(body);
    addingHistory.markModified("histories");
    addingHistory.save()
    console.log(addingHistory);
    if (addingHistory) {
      return res
        .status(202)
        .json({ message: "History registered", history: addingHistory });
    } else return res.status(204).json({ message: "History not registered" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export function getHistories(req: Request | any, res: Response) {
  try {
    const body = req.body;
  
    historySchema.find({from_id: body.id }, function (err, doc) {
      if (err) return res.status(404).json({ message: "Clients don't found" });
      
      return res.status(202).json({ message: "Clients found", history: doc });
    });
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}
/*export function getMedicals(req: Request | any, res: Response) {
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

export function getUser( req: Request | any, res: Response ) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    dealerSchema.findOne({_id: req._id}, function (err, doc) {
      if (err) return res.status(404).json({ message: "Dealer don't found" });
      return res.status(202).json({ message: "Dealer found", user: doc , external_token: statictoken});
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
    const body = req.body as Pick<User, "email" | "password">
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
}*/


