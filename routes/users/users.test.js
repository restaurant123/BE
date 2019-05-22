const request = require("supertest");
const router = require("./users.js");
const db = require("./users-models.js");
const server = require("../../api/server.js");
const faker = require("faker");

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

describe("server", () => {
  describe("GET / request ", () => {
    it("should return 200 that able to get data", () => {
      return request(server)
        .get("/users")
        .expect(200);
    });

    it("get user by id", () => {
      return request(server)
        .get("/users/1")
        .set("Authorization", `${token}`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });

    it("should return 401 to those not authorized", () => {
      return request(server)
        .get("/users/1")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it("checking if database is using the async and await", async () => {
      const res = await request(server).get("/users");
      expect(res.status).toBe(200);
    });

    it("should return JSON using done callback", done => {
      request(server)
        .get("/users")
        .then(res => {
          expect(res.type).toBe("application/json");
          done();
        });
    });
  });

  describe("POST / request", () => {
    it("able to register", () => {
      return request(server)
        .post("/users/register")
        .send({
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: "password",
          address: faker.address.streetAddress(),
          city: "Manhattan",
          state: "New York",
          zipCode: 14025
        })
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
    it("able to login with token", () => {
      return request(server)
        .post("/users/login")
        .send({
          email: "sam_doe@gmail.com",
          password: "password"
        })
        .set("Authorization", `${token}`)
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("Put /", () => {
    it("should return 204 No Content, when deleting data", async () => {
      let res = await request(server)
        .put("/users/3")
        .set("Authorization", `${token}`)
        .send({
          name: "Sammie Davis"
        });

      expect(res.status).toBe(200);
    });

    it("should return 404 if users does not exist", async () => {
      let res = await request(server)
        .put("/users/100")
        .set("Authorization", `${token}`)
        .send({
          name: "Sammie Davis"
        });

      expect(res.status).toBe(404);
    });
  });
});
