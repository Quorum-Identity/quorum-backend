import express from "express";
import { body } from "express-validator";
import { createSpesse, getSpesse } from "../services/spesse.service";


var router = express.Router();
router.post("/create",
createSpesse);

router.post("/get",   body('id').isLength({ min: 1 }),
getSpesse);


export default router;