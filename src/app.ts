import createServer from "./utils/server";
import {registerUser} from "./controller/user.controller";
import mongoose from "mongoose"

const port = 3001;

export const app = createServer();


mongoose.connect('mongodb+srv://nickname:uF07PaNHQh79tpO5@cluster0.bpdzobz.mongodb.net/vediloo?retryWrites=true&w=majority',
  err => {
      if(err) throw err;
      console.log('connected to MongoDB')
});




import { body } from 'express-validator';

app.post("/user/register", 
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

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
});

