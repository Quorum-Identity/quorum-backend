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





router.post("/update", authorization, updateUser);

export default router;