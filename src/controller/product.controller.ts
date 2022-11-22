import express from "express";
import { body } from 'express-validator';
import { addProduct } from "../services/product.service";

var router = express.Router();

router.post("/add",
  body('name').isLength({ min: 3 }),
  body('description').isLength({ min: 3 }), 
  body('price').isNumeric(),
  body('ammount').isNumeric(),
  body('images').isArray(),
  body('type').isNumeric(),
addProduct);


export default router;