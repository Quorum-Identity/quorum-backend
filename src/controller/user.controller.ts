import express from "express";

import { body } from 'express-validator';
import { authorization } from "../middleware/dealer";
import {resetPassword, getClients, createUser, getUser,  loginUser, updateUser, getMedicals } from "../services/user.service";

var router = express.Router();

router.post("/create", createUser);

router.get("/get", authorization,
   getUser);
router.post("/getclients", authorization,
getClients);
router.post("/getmedicals", authorization,
getMedicals);
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