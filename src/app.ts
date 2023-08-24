import createServer from "./utils/server";
import mongoose from "mongoose"
import { globalAuthorization } from "./middleware/auth.midd";
import UserRouter from './controller/user.controller';


const port = 3001;
export const app = createServer();
mongoose.connect('mongodb://canitrotbartolome:juInQ2XWJkOIWiqa@ac-29lwldj-shard-00-00.x5zoaac.mongodb.net:27017,ac-29lwldj-shard-00-01.x5zoaac.mongodb.net:27017,ac-29lwldj-shard-00-02.x5zoaac.mongodb.net:27017/quorum?ssl=true&replicaSet=atlas-tbn2ge-shard-0&authSource=admin&retryWrites=true&w=majority',
  err => {
      if(err) throw err;
      console.log('connected to MongoDB');
});

app.use("/user", globalAuthorization, UserRouter);


app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
});

