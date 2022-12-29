import createServer from "./utils/server";
import mongoose from "mongoose"
import { globalAuthorization } from "./middleware/auth.midd";
import UserRouter from './controller/user.controller'
import ProductRouter from './controller/product.controller'

const port = 3001;
export const app = createServer();


mongoose.connect('mongodb+srv://nickname:uF07PaNHQh79tpO5@cluster0.bpdzobz.mongodb.net/vediloo?retryWrites=true&w=majority',
  err => {
      if(err) throw err;
      console.log('connected to MongoDB');
});





app.use("/user", globalAuthorization, UserRouter);
app.use("/product", globalAuthorization, ProductRouter);



app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
});

