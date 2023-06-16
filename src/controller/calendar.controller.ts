import express from "express";
import { body } from "express-validator";
import { createCalendar, getCalendars } from "../services/calendar.service";


var router = express.Router();
router.post("/create",
createCalendar );

router.post("/get", 
body('id').isLength({ min: 1 }),
getCalendars);
export default router;
