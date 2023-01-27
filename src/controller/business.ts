import express from "express";
import {createBusiness, getBusiness } from "../services/businessMan";
import { body } from 'express-validator';
import { authorization } from "../middleware/user.midd";

var router = express.Router();

router.post("/post",
  body('partitaIva').isLength({min: 3}),
  body('nome').isLength({min: 3}), 
  body('cognome').isLength({min: 3}),
  body('codiceFiscale').isLength({min: 3}),
  body('dataDiNascita'), 
  body('comuneDiNascita').isLength({min: 3}),
  body('provinciaDiNascita').isLength({min: 3}),    
  body('email').isEmail(),
  body('telefono').isLength({min: 3}),
  body('cellulare').isLength({min: 3}),
  body('comuneDiResidenza').isLength({min: 3}),
  body('provinciaDiResidenza').isLength({min: 3}), 
  body('indirizzo').isLength({min: 3}), 
  body('nCivico').isNumeric(),
  body('cap').isNumeric(), 
  body("tipoDocumento").isLength({min: 3}),
  body("dataDiScadenza"),
  body("dataDiRilascio"),
  body("rilasciato").isLength({min: 3}),
  body("delegato").isLength({min: 3}),
createBusiness);

router.get("/get", 
   getBusiness);

export default router;