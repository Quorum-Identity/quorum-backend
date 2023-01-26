import express from "express";
import { body } from "express-validator";
import { createSociety } from "../services/society";

var router = express.Router();
router.post("/post",
body('partitaIva'),
body('nomeDitta'), 
body('tipoAzienda'),
body('codiceSdi'),
body('comuneAzienda'), 
body('provinciaAzienda'),
body('indirizzo'),    
body('civico'),
body('cap'),
body('telefono'),
body('cellulare'),
body('pEc'), 
body('email'), 
body('rappresentanteLegale'),
body("delegato"),
  createSociety );

export default router; 