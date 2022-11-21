import bodyParser from "body-parser";
import express from "express";
import cookieParser from "cookie-parser";

function createServer() {
  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  return app;
}

export default createServer;
