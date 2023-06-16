import express from "express";
import { body } from "express-validator";
import { createTreatment, getTreatments } from "../services/treatment.service";


var router = express.Router();
router.post("/create",
createTreatment);

router.post("/get",   body('id').isLength({ min: 1 }),
getTreatments);


export default router;