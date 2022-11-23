import express from "express";
import { body } from 'express-validator';
import { addProduct, getAllProducts, getProduct, getProductById, updateProductState} from "../services/product.service";
import { authorization } from "../middleware/user.midd";

var router = express.Router();

router.post("/add",
  body('name').isLength({ min: 3 }),
  body('description').isLength({ min: 3 }), 
  body('price').isNumeric(),
  body('ammount').isNumeric(),
  body('images').isArray(),
  body('type').isNumeric(),
addProduct);

router.get("/data", authorization, getProduct);

router.post("/getbyid",
  body('id').isLength({ min: 5 }),
getProductById);

router.get("/getall", getAllProducts);
router.post("/update/state", 
  body('state').isNumeric(),
  body('id').isLength({ min: 3 }), 
updateProductState);

export default router;