import { Request, Response } from "express";
import {validationResult } from 'express-validator';
import { UserModel } from "../models/user.model"
import UserSchema from "../schema/user.schema"
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";


async function registerUser (req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body as Pick<UserModel, "gender" | "name" | "lastname" | "password" | "email" | "date_birth" | "phone" | "type" | "province" | "country">
    const addingUser = new UserSchema({
      name: body.name,
      lastname: body.lastname,
      password: bcrypt.hashSync(body.password.toString(), 10),
      email: body.email,
      date_birth: new Date(body.date_birth),
      phone: body.phone,
      type: body.type,
      country: body.country,
      province: body.province,
      gender: body.gender
    });
    addingUser.markModified('users');
    addingUser.save();

    if (addingUser){
      return res.status(202).json({ message: "User registered", user: addingUser });
    } else return res.status(204).json({ message: "User not registered"});
  } catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
}
  
async function loginUser (req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body as Pick<UserModel, "email" | "password">
    const account = await UserSchema.findOne({ email: body.email });
    if(account){
      if (bcrypt.compareSync(body.password.toString(), account.password.toString())) {
        const token = jwt.sign({ _id: account._id?.toString(), name: account.name }, "SECRET_EXAMPLE_KEY", {
          expiresIn: '2 days',
        });
        return res.status(202).json({message: "Account loggin", user: account, token});
      } else return res.status(404).json({message: "Invalid password"});
    } else return res.status(404).json({message: "Account not found"})
  } catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
}
  
async function getUser (req: Request, res: Response) {
  try{
    const token = req.cookies.access_token;
    const { _id } = jwt.verify(token, "SECRET_EXAMPLE_KEY") as JwtPayload;
    const account = await UserSchema.findOne({ _id});
    if(account){
      return res.status(202).json({message: "User data", user: account});
    } else return res.status(404).json({message: "Invalid account"});
  }
  catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
}

async function updateUser (req: Request, res: Response ){
  try{
    const token = req.cookies.access_token;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { _id } = jwt.verify(token, "SECRET_EXAMPLE_KEY") as JwtPayload;
    const body = req.body as Pick<UserModel, "name" | "lastname" | "image_profile" | "image_banner">
    UserSchema.findOneAndUpdate({ _id }, body, {upsert: true}, function(err, doc) {
      if (err) return res.status(404).json({message: "Invalid account"});
      return res.status(202).json({message: "Account updated"});
    });
  }
  catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }
    
}

async function updatePassword (req: Request, res: Response ){
  try{
    const token = req.cookies.access_token;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { _id } = jwt.verify(token, "SECRET_EXAMPLE_KEY") as JwtPayload;
    const { password, oldpassword } = req.body;
    const account = await UserSchema.findOne({ _id});
    
    if(account){
      if (bcrypt.compareSync(oldpassword.toString(), account.password.toString())) {
        UserSchema.findOneAndUpdate({ _id }, { password: bcrypt.hashSync(password.toString(), 10) }, {upsert: true}, function(err, doc) {
          if (err) return res.status(404).json({message: "Invalid account"});
          return res.status(202).json({message: "Password updated"});
        });      
      } else return res.status(404).json({message: "Invalid password"});
    }
  }
  catch (error) {
    return res.status(505).json({message: "Invalid body or error"});
  }   
}

  
export {registerUser, loginUser, getUser, updateUser, updatePassword};
  