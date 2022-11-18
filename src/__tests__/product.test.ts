import supertest from "supertest";
import {PayLoadPages, PayLoadCharacter} from "../schema/example.schema";
import createServer from "../utils/server";


const app = createServer();

const payLoadPages: PayLoadPages = {
  body: {
    page: "1"
  }
};
const payLoadId: PayLoadCharacter = {
  body: {
    id: "1"
  }
};


describe("Api Rick Test", () => {

  describe("Get Page", () => {
    it("post endpoint pages expected 202" , async () => {

      const { statusCode } = await supertest(app)
        .post("/pages")
        .send(payLoadPages.body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

        expect(202);
    });
  });

  describe("Get Character", () => {
    it("post endpoint character expected 202", async () => {

      const { statusCode } = await supertest(app)
        .post("/character")
        .send(payLoadId.body)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')

        expect(202);
    });
  });
});
