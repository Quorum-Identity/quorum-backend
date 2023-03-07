import createServer from "./utils/server";
import mongoose from "mongoose"
import { globalAuthorization } from "./middleware/auth.midd";
import UserRouter from './controller/user.controller';
import PrivateRouter from './controller/private';
import BusinesRouter from "./controller/business";
import SocietyRouter from "./controller/society";
import DealerRouter from "./controller/dealerController";
const port = 3001;
export const app = createServer();

mongoose.connect('mongodb+srv://canitrotbartolome:juInQ2XWJkOIWiqa@cluster0.x5zoaac.mongodb.net/edesk?retryWrites=true&w=majority',
  err => {
      if(err) throw err;
      console.log('connected to MongoDB');
});

app.use("/user", globalAuthorization, UserRouter);
app.use("/private", PrivateRouter)
app.use("/business", BusinesRouter)
app.use("/society", SocietyRouter)
app.use("/dealers", DealerRouter)
app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
});

