import express from "express";
import {createPrivate } from "../services/private";
import { body } from 'express-validator';
import { authorization } from "../middleware/user.midd";

var router = express.Router();

router.post("/createPrivate",
  body('codiceFiscale').isLength({ min: 3 }),
  body('nome').isLength({ min: 3 }), 
  body('cognome').isLength({ min: 5 }),
  body('dataDiNascita').isDate, 
  body('comuneDiNascita').isLength({ min: 5 }),
  body('provinciaDiNascita').isLength({ min: 3}),  
  body('email').isEmail(),
  body('telefono').isLength({min:8}),
  body('cellulare').isLength({min:8}),
  body('comuneDiResidenza').isLength({min:8}),
  body('provinciaDiResidenza').isLength({min:8}), 
  body('indirizzo').isLength({min:8}), 
  body('nCivico').isNumeric(),
  body('cap').isNumeric(), 
  body("tipoDocumento").isLength({min:8}),
  body("dataScadenza").isDate,
  body("dataRilascio").isDate,
  body("rilasciato").isLength({min:8}),
  createPrivate );

export default router;