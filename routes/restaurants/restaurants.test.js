const request = require("supertest");
const db = require("./restaurants-models.js");
const server = require("../../api/server.js");

// create token for tests
let token;
beforeAll(done => {
  request(server)
    .post("/users/login")
    .send({
      email: "sam_doe@gmail.com",
      password: "password"
    })
    .end((err, res) => {
      token = res.body.token; // save the token!
      done();
    });
});

describe("restaurant router tests", () => {
  describe("GET /restaurants request ", () => {
    it("we have token", () => {
      return request(server)
        .get("/restaurants")
        .set("Authorization", `${token}`)
        .then(res => {
          expect(token).toBe(token);
        });
    });
    it("should return 200 that able to get data", () => {
      return request(server)
        .get("/restaurants")
        .set("Authorization", `${token}`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return 401 to those not authorized", () => {
      return request(server)
        .get("/restaurants")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it("should return JSON using done callback", done => {
      request(server)
        .get("/restaurants")
        .then(res => {
          expect(res.type).toBe("application/json");
          done();
        });
    });
  });

  describe("Delete /", () => {
    it("should return 204 No Content, when deleting data", async () => {
      let res = await request(server)
        .delete("/restaurants/3")
        .set("Authorization", `${token}`);
      expect(res.status).toBe(204);
    });

    it("should return 404 if it does not exist, when deleting data", async () => {
      let res = await request(server)
        .delete("/restaurants/190")
        .set("Authorization", `${token}`);
      expect(res.status).toBe(404);
    });
  });
});
