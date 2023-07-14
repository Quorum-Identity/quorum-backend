import { Request, Response } from "express";
import { validationResult } from "express-validator";

import spesseSchema from '../schema/spesse';

export function createSpesse(req: Request | any, res: Response) {
  try {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const body = req.body;
    const addingSpesse = new spesseSchema(body);
    addingSpesse.markModified("spesse");
    addingSpesse.save()
    console.log(addingSpesse);
    if (addingSpesse) {
      return res
        .status(202)
        .json({ message: "Spesse registered", spesse: addingSpesse });
    } else return res.status(204).json({ message: "Spesse not registered" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export async function getSpesse(req: Request | any, res: Response) {
  try {
    const body = req.body;
    var responseFrom: any = undefined;
    await spesseSchema.find({from_id: body.id }, function (err, doc) { 
      responseFrom = doc;
    }).clone();
    var responseTo: any = undefined;
    await spesseSchema.find({to_id: body.id }, function (err, doc) {
        responseTo = doc;
      }).clone();
    var calendars;
    if(responseFrom !== undefined){
        calendars = [...responseFrom];
    }
    if(responseTo !== undefined){
        calendars = [...calendars, ...responseTo];
    }
    return res.status(202).json({ message: "Spesse found", from: responseFrom, to: responseTo });
  } catch (error) {
    console.log(error);
    return res.status(505).json({ message: "Invalid body or error" });
  }
}
