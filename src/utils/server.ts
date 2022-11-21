import bodyParser from "body-parser";
import express from "express";
function createServer() {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  return app;
}

export default createServer;
