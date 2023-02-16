import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UserModel } from "../models/user.model";
import UserSchema from "../schema/user.schema";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

function createSim(req: Request, res: Response) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const body = req.body as Pick<
      UserModel,
      | "gender"
      | "name"
      | "lastname"
      | "password"
      | "email"
      | "date_birth"
      | "phone"
      | "type"
      | "province"
      | "country"
    >;
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
      gender: body.gender,
    });
    addingUser.markModified("sim");
    addingUser.save();

    if (addingUser) {
      return res
        .status(202)
        .json({ message: "User registered", user: addingUser });
    } else return res.status(204).json({ message: "User not registered" });
  } catch (error) {
    return res.status(505).json({ message: "Invalid body or error" });
  }
}
