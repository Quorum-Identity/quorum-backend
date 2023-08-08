import { Request, Response } from "express";
import { validationResult } from "express-validator";

import billingSchema from '../schema/billing';

export function createBilling(req: Request | any, res: Response) {
  try {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const body = req.body;
    const addingBilling = new billingSchema(body);
    addingBilling.markModified("billing");
    addingBilling.save()
    console.log(addingBilling);
    if (addingBilling) {
      return res
        .status(202)
        .json({ message: "Billing registered", billing: addingBilling });
    } else return res.status(204).json({ message: "Billing not registered" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export async function getBilling(req: Request | any, res: Response) {
  try {
    const body = req.body;
    var responseFrom: any = undefined;
    await billingSchema.find({from_id: body.id }, function (err, doc) { 
      responseFrom = doc;
    }).clone();
    var responseTo: any = undefined;
    await billingSchema.find({to_id: body.id }, function (err, doc) {
        responseTo = doc;
      }).clone();
    var calendars;
    if(responseFrom !== undefined){
        calendars = [...responseFrom];
    }
    if(responseTo !== undefined){
        calendars = [...calendars, ...responseTo];
    }
    return res.status(202).json({ message: "Billings found", from: responseFrom, to: responseTo });
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}
