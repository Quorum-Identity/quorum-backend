import createServer from "./utils/server";
import {getCharacterFromId, getDataFromPages} from "./controller/character.controller";
import mongoose from "mongoose";
const port = 3001;

export const app = createServer();


async function createConnection (){
  await mongoose.connect('mongodb+srv://nickname:uF07PaNHQh79tpO5@cluster0.bpdzobz.mongodb.net/vediloo');
}

createConnection();

app.post("/pages",  getDataFromPages);


app.post("/character", getCharacterFromId);

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);
});

