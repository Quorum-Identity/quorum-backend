import { Request, Response } from "express";
import { validationResult } from "express-validator";

import treatmentSchema from '../schema/treatment';

export function createTreatment(req: Request | any, res: Response) {
  try {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const body = req.body;
    const addingTreatment = new treatmentSchema(body);
    addingTreatment.markModified("calendar");
    addingTreatment.save()
    console.log(addingTreatment);
    if (addingTreatment) {
      return res
        .status(202)
        .json({ message: "Treatment registered", treatment: addingTreatment });
    } else return res.status(204).json({ message: "Treatment not registered" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export async function getTreatments(req: Request | any, res: Response) {
  try {
    const body = req.body;
    var responseFrom: any = undefined;
    await treatmentSchema.find({from_id: body.id }, function (err, doc) { 
      responseFrom = doc;
    }).clone();
    var responseTo: any = undefined;
    await treatmentSchema.find({to_id: body.id }, function (err, doc) {
        responseTo = doc;
      }).clone();
    var calendars;
    if(responseFrom !== undefined){
        calendars = [...responseFrom];
    }
    if(responseTo !== undefined){
        calendars = [...calendars, ...responseTo];
    }
    var treatmentsUnique;
    if(calendars?.lenght > 0){
         treatmentsUnique = calendars.filter(
            (obj, index) =>
              calendars.findIndex((item) => item._id === obj._id) === index
        );
    }
      
    return res.status(202).json({ message: "Treatments found", treatments: treatmentsUnique });
  } catch (error) {
    console.log(error);
    return res.status(505).json({ message: "Invalid body or error" });
  }
}
