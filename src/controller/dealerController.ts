import express from "express";

import { body } from 'express-validator';
import { authorization } from "../middleware/user.midd";
import { createDealer, getDealer, loginDealer, upDateDealer } from "../services/dealerService";
var router = express.Router();

router.post("/post",
  body('tipologia').isLength({min: 1}),
  body('ragioneSociale').isLength({min: 1}), 
  body('tipoAzienda').isLength({min: 1}),
  body('email').isLength({min: 1}),
  body('usurname').isLength({min: 1}), 
  body('indirizzo').isLength({min: 1}),
  body('comune').isLength({min: 1}),  
  body('provincia').isLength({min: 1}),
  body('cap').isLength({min: 1}),
  body('pIva').isLength({min: 1}),
  body('cFiscale').isLength({min: 1}),
  body('sdi').isNumeric(),
  body('pec').isLength({min: 1}),
  body('referente').isLength({min: 1}),
  body('telefono').isLength({min: 1}),
  body('emailRef').isLength({min: 1}),
  body('ruole').isLength({min: 1}),
  body('dominio').isLength({min: 1}),
  body('logo').isLength({min: 1}),
  body('colore1').isLength({min: 1}),
  body('colore2').isLength({min: 1}),
  body('colore3').isLength({min: 1}),
createDealer);

router.get("/get", 
   getDealer);

   router.post("/login",
  body('password').isLength({ min: 5 }), 
  body('email').isEmail(), 
loginDealer);

router.put("/put", 
   upDateDealer);

export default router;