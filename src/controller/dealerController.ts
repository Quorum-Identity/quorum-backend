import express from "express";

import { body } from 'express-validator';
import { authorization } from "../middleware/dealer";
import { resetPassword, getUserDealers, getDealerByCodice, createDealer, getDealer,  loginDealer, updateDealer } from "../services/dealerService";

var router = express.Router();

router.post("/post",
  body('tipologia').isLength({min: 1}),
  body('ragioneSociale').isLength({min: 1}), 
  body('tipoAzienda').isLength({min: 1}),
  body('email').isEmail(),
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
  body("credito").isNumeric(),
  body("sim").isNumeric(),
createDealer);

router.get("/get", authorization,
   getDealer);
router.get("/getdealers", authorization,
getUserDealers);

router.post("/updatepassword", authorization,
body("_id").isLength({min: 6}),
resetPassword);

router.post("/login",
  body('password').isLength({ min: 5 }), 
  body('email').isEmail(), 
loginDealer);

router.post("/getbycodice",
  body('cFiscale').isLength({ min: 2 }), 
getDealerByCodice);

router.post("/updatedealer", authorization,
  body("_id").isLength({min: 6}),
updateDealer);

export default router;