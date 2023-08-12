import { Request, Response } from "express";
import { validationResult } from "express-validator";

import calendarSchema from '../schema/calendar';

export function createCalendar(req: Request | any, res: Response) {
  try {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const body = req.body;
    const addingCalendar = new calendarSchema(body);
    addingCalendar.markModified("calendar");
    addingCalendar.save()
    console.log(addingCalendar);
    if (addingCalendar) {
      return res
        .status(202)
        .json({ message: "Calendar registered", calendar: addingCalendar });
    } else return res.status(204).json({ message: "Calendar not registered" });
  } catch (errors) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}

export async function getCalendars(req: Request | any, res: Response) {
  try {
    const body = req.body;
    var responseFrom: any = undefined;
    responseFrom = await calendarSchema.find({from_id: body.id }, function (err, doc) { 
      return doc;
    }).clone();

    var responseTo: any = [];
    responseTo = await calendarSchema.find({to_id: body.id }, function (err, doc) {
        return [...doc];
     }).clone();

    var medical = await calendarSchema.find({to_medical: body.id }, function (err, doc) {
        return doc;
    }).clone();
   
    return res.status(202).json({ message: "Clients found", from: responseFrom, to: responseTo, medical: medical ?? []});
  } catch (error) {
    console.log(error);
    return res.status(505).json({ message: "Invalid body or error" });
  }
}
