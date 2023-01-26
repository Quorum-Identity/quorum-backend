import express from "express";
import {createBusiness, getBusiness } from "../services/businessMan";
import { body } from 'express-validator';
import { authorization } from "../middleware/user.midd";

var router = express.Router();

router.post("/post",
  body('partitaIva'),
  body('nome'), 
  body('cognome'),
  body('codiceFiscale'),
  body('dataDiNascita'), 
  body('comuneDiNascita'),
  body('provinciaDiNascita'),    
  body('email').isEmail(),
  body('telefono'),
  body('cellulare'),
  body('comuneDiResidenza'),
  body('provinciaDiResidenza'), 
  body('indirizzo'), 
  body('nCivico').isNumeric(),
  body('cap').isNumeric(), 
  body("comuneDiResidenza"),
  body("provinciaDiResidenza"),
  body("indirizzo"),
  body("cap"),
  body("delegato"),
createBusiness);

router.get("/get", 
   getBusiness);

export default router;