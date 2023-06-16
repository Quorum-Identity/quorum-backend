import express from "express";
import { body } from "express-validator";
import { createHistory, getHistories } from "../services/history.service";


var router = express.Router();
router.post("/create",
createHistory );

router.post("/get",   body('id').isLength({ min: 1 }),
getHistories);
export default router;