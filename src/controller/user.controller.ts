import express from "express";
import {loginUser, registerUser, getUser} from "../services/user.service";
import { body } from 'express-validator';
import { authorization } from "../middleware/user.midd";

var router = express.Router();

router.post("/user/register",
  body('name').isLength({ min: 3 }),
  body('lastname').isLength({ min: 3 }), 
  body('password').isLength({ min: 5 }),
  body('email').isEmail(), 
  body('date_birth').isLength({ min: 5 }),
  body('phone').isLength({ min: 5}),  
  body('type').isNumeric(), 
  body('country').isNumeric(), 
  body('province').isNumeric(), 
registerUser);

router.post("/login",
  body('password').isLength({ min: 5 }), 
  body('email').isEmail(), 
loginUser);

router.get("/data", authorization, getUser);

export default router;