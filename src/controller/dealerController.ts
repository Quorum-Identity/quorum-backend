import express from "express";

import { body } from 'express-validator';
import { authorization } from "../middleware/user.midd";
import { createDealer, getDealer, upDateDealer } from "../services/dealerService";
var router = express.Router();

router.post("/post",
  body('tipologia').isLength({min: 3}),
  body('ragioneSociale').isLength({min: 3}), 
  body('tipoAzienda').isLength({min: 3}),
  body('email').isEmail(),
  body('usurname').isEmail(), 
  body('indirizzo').isLength({min: 3}),
  body('comune').isNumeric(),  
  body('provincia').isLength({min: 3}),
  body('cap').isLength({min: 3}),
  body('pIva').isLength({min: 3}),
  body('cFiscale').isLength({min: 3}),
  body('sdi').isLength({min: 3}),
  body('pec').isLength({min: 3}),
  body('referente').isLength({min: 3}),
  body('telefono').isLength({min: 3}),
  body('emailRef').isLength({min: 3}),
  body('ruole').isLength({min: 3}),
createDealer);

router.get("/get", 
   getDealer);

router.put("/put", 
   upDateDealer);

export default router;