import { Request, Response } from "express";
import {PayLoadPages, PayLoadCharacter} from "../schema/example.schema";
import fetch from "node-fetch-commonjs";

export async function getDataFromPages( req: Request<PayLoadPages>, res: Response) {
  const {page} = req.body;
  if(page){
    fetch('https://rickandmortyapi.com/api/character?page=' + page, {
      method: 'GET'
    })
    .then((ress: any) => ress.json())
    .then((jsonn: any) => {
      return res.status(202).json({data: jsonn});
    })
  } else return res.status(404).json({message: "Expected page number"});
}
export async function getCharacterFromId( req: Request<PayLoadCharacter>, res: Response) {
  const {id} = req.body;
  if(id){
    fetch('https://rickandmortyapi.com/api/character/' + id, {
      method: 'GET'
    })
    .then((ress: any) => ress.json())
    .then((jsonn: any) => {
      return res.status(202).json({data: jsonn});
    })
  } else return res.status(404).json({message: "Expected id number"});
}

