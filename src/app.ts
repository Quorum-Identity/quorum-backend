import createServer from "./utils/server";
import mongoose from "mongoose"
import { globalAuthorization } from "./middleware/auth.midd";
import UserRouter from './controller/user.controller';
import HistoryRouter from './controller/history.controller';
import CalendarRouter from "./controller/calendar.controller";
import TreatmentRouter from './controller/treatment.controller';

const port = 3001;
export const app = createServer();

mongoose.connect('mongodb://canitrotbartolome:juInQ2XWJkOIWiqa@cluster0.x5zoaac.mongodb.net/valeriani?retryWrites=true&w=majority',
  err => {
      if(err) throw err;
      console.log('connected to MongoDB');
});
app.use("/treatment", globalAuthorization, TreatmentRouter);
app.use("/calendar", globalAuthorization, CalendarRouter);
app.use("/user", globalAuthorization, UserRouter);
app.use("/history", globalAuthorization, HistoryRouter);

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
});

