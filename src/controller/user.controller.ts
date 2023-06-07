import express from "express";

import { body } from 'express-validator';
import { authorization } from "../middleware/dealer";
import {resetPassword, getUserParents, createUser, getUser,  loginUser, updateUser } from "../services/user.service";

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
createUser);

router.get("/get", authorization,
   getUser);
router.get("/getusers", authorization,
getUserParents);

router.post("/updatepassword", authorization,
body("_id").isLength({min: 6}),
resetPassword);


router.post("/login",
  body('password').isLength({ min: 5 }), 
  body('email').isEmail(), 
loginUser);





router.post("/updatedealer",
  body('id').isLength({min:  0}), 
  body('ragioneSociale').isLength({min:  0}), 
  body('tipoAzienda').isLength({min: 0}),
  body('email').isEmail(),
  body('usurname').isLength({min: 0}), 
  body('indirizzo').isLength({min: 0}),
  body('comune').isLength({min: 0}),  
  body('provincia').isLength({min: 0}),
  body('cap').isLength({min: 0}),
  body('pIva').isLength({min: 0}),
updateUser);

export default router;