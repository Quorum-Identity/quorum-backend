import { Request, Response } from "express";
import {validationResult } from 'express-validator';
import ProductSchema from "../schema/product.schema";

import { ProductModel } from "../models/product.model";
import jwt, { JwtPayload } from "jsonwebtoken";

async function addProduct (req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const token = req.cookies.access_token;
      const { _id } = jwt.verify(token, "SECRET_EXAMPLE_KEY") as JwtPayload;
      const body = req.body as Pick<ProductModel, "name" | "description" | "price" | "ammount" | "images" | "type" >
      const addingProduct = new ProductSchema({
        name: body.name,
        description: body.description,
        date_publishing: new Date(),
        by_id: _id,
        price: body.price,
        ammount: body.ammount,
        images: body.images,
        type: body.type,
        state: 0
      });
      addingProduct.markModified('users');
      addingProduct.save();
      
      
      if (addingProduct){
        return res.status(202).json({ message: "Product registered", product: addingProduct });
      } else return res.status(204).json({ message: "Product not registered"});
    } catch (error) {
      return res.status(505).json({message: "Invalid body or error"});
    }
}
export { addProduct }