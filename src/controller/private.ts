import express from "express";
import {loginUser, registerUser, getUser, updateUser, updatePassword} from "../services/user.service";
import { body } from 'express-validator';
import { authorization } from "../middleware/user.midd";

var router = express.Router();

router.post("/createPrivate",
  body('codiceFiscale').isLength({ min: 3 }),
  body('nome').isLength({ min: 3 }), 
  body('cognome').isLength({ min: 5 }),
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
registerUser);

export default router;