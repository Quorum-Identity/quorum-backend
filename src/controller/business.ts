import express from "express";
import {createBusiness } from "../services/businessMan";
import { body } from 'express-validator';
import { authorization } from "../middleware/user.midd";

var router = express.Router();

router.post("/create-business",
  body('partitaIva').isLength({ min: 3 }),
  body('nome').isLength({ min: 3 }), 
  body('cognome').isLength({ min: 5 }),
  body('codiceFiscale').isLength({ min: 3 }),
  body('dataDiNascita').isEmail(), 
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
  body("comuneDiResidenza").isLength({min:8}),
  body("provinciaDiResidenza").isLength({min:8}),
  body("indirizzo").isLength({min:8}),
  body("cap").isLength({min:8}),
  body("delegato").isObject,
createBusiness);

export default router;