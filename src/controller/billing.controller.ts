import express from "express";
import { body } from "express-validator";
import { createBilling, getBilling } from "../services/billing.service";


var router = express.Router();
router.post("/create",
createBilling );

router.post("/get", 
body('id').isLength({ min: 1 }),
getBilling);
export default router;
