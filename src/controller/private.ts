import express from "express";
import {createPrivate, getPrivate } from "../services/private";
import { body } from 'express-validator';
import { authorization } from "../middleware/user.midd";

var router = express.Router();

router.post("/create",
  body('codiceFiscale').isLength({ min: 3 }),
  body('nome').isLength({ min: 3 }), 
  body('cognome').isLength({ min: 5 }),
  body('dataDiNascita').isLength({min:10}),
  body('comuneDiNascita').isLength({ min: 2 }),
  body('nazioneDiNascita').isLength({ min: 2 }),
  body('provinciaDiNascita').isLength({ min: 3}),  
  body('email').isEmail(),
  body('telefono').isLength({min:3}),
  body('cellulare').isLength({min:3}),
  body('comuneDiResidenza').isLength({min:3}),
  body('provinciaDiResidenza').isLength({min:3}), 
  body('indirizzo').isLength({min:3}), 
  body('nCivico').isNumeric(),
  body('cap').isNumeric(), 
  body("tipoDocumento").isLength({min:2}),
  body("dataScadenza"),
  body("dataRilascio"),
  body("numeroDocumento"),
  body("rilasciato").isLength({min:1}),
  createPrivate );

  router.post("/get", 
   getPrivate);
export default router;