import express from "express";
import {updateNumberSim, registerUser, getUser, updateUser, getUserById, getUserByCodice} from "../services/user.service";
import { authorization } from "../middleware/user.midd";
import { UserModel } from "../models/user.model";
import { body } from "express-validator";

var router = express.Router();

router.post("/register",
  body('nome_completo').isLength({ min: 1}),
  body('provincia_residenza').isLength({ min: 1 }), 
  body('indirizzo_residenza').isLength({ min: 1 }),
  body('comune_residenza').isLength({ min: 1 }), 
  body('codice_fiscale').isLength({ min: 1 }),
  body('telefono').isLength({ min: 1 }),  
  body('cap_residenza').isLength({ min: 1 }), 
  body('codice_sdi').isLength({ min: 1 }),
  body('partita_iva').isLength({ min: 1 }), 
  body('ragione_sociale').isLength({ min: 1 }),
  body('email').isLength({ min: 1 }),
  body('iccid').isLength({ min: 1 }),
  body('pec_email').isLength({ min: 1 }), 
  body('privato').isObject(), 

registerUser);

router.get("/data", authorization, getUser);
router.post("/update", authorization,
  body('name').isLength({ min: 3 }), 
  body('lastname').isLength({ min: 3 }), 
  body('image_profile').isLength({ min: 13 }), 
  body('image_banner').isLength({ min: 13 }), 

  updateUser);
router.post("/updatetelefono", authorization,
  body('id').isLength({ min: 3 }), 
  body('telefono').isLength({ min: 3 }), 
  body('codice').isLength({ min: 3 }), 
updateNumberSim);

router.post("/getbyid", authorization,
  body('id').isLength({ min: 3 }), 
  getUserById);
router.post("/getbycodice", authorization,
  body('codice_fiscale').isLength({ min: 1 }), 
  getUserByCodice);
export default router;