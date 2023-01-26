import express from "express";
import { body } from "express-validator";
import { createSociety, getSociety } from "../services/society";
import { isNumber } from "lodash";

var router = express.Router();
router.post("/post",
body('partitaIva').isLength({ min: 3 }),
body('nomeDitta').isLength({ min: 3 }), 
body('tipoAzienda').isLength({ min: 3 }),
body('codiceSdi').isNumeric(),
body('comuneAzienda').isLength({ min: 3 }), 
body('provinciaAzienda').isLength({ min: 3 }),
body('indirizzo').isLength({ min: 3 }),    
body('civico').isNumeric(),
body('cap').isNumeric(),
body('telefono').isLength({ min: 3 }),
body('cellulare').isLength({ min: 3 }),
body('pEc').isLength({ min: 3 }), 
body('email').isLength({ min: 3 }), 
body('rappresentanteLegale').isLength({ min: 3 }),
body("delegato").isLength({ min: 3 }),
  createSociety );

  router.get("/get", 
   getSociety);
export default router; 