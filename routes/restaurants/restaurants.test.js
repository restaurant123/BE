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
  describe("POST /restaurants request ", () => {
    it("should return 201 when new restaurant added", () => {
      return request(server)
        .post("/restaurants")
        .send({
          name: "The Place Restaurant",
	address: "1234 Street",
    city: "Manhattan",
    state: "New York",
    zipCode: 14025,
	description: "This is one of the cities best places to go! If you havent been you are missing out.",
	image_url: "https://source.unsplash.com/900x990/?dinner"
        })
        .set("Authorization", `${token}`)
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
  })

  it("should return 400 if restaurant name exsists", () => {
    return request(server)
      .post("/restaurants")
      .send({
        name: "The Place Restaurant",
address: "1234 Street",
  city: "Manhattan",
  state: "New York",
  zipCode: 14025,
description: "This is one of the cities best places to go! If you havent been you are missing out.",
image_url: "https://source.unsplash.com/900x990/?dinner"
      })
      .set("Authorization", `${token}`)
      .then(res => {
        expect(res.status).toBe(400);
      });
  });
})
  describe("GET /restaurants request ", () => {
    it("should return 200 that able to get data", () => {
      return request(server)
        .get("/restaurants")
        .then(res => {
          expect(res.body).toHaveLength(45);
        });
    });

    it("should return array of restaurants", () => {
      return request(server)
        .get("/restaurants/")
        .then(res => {
          expect(res.status).toBe(500);
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

  describe("Put /", () => {
    it("should return 200 when successful edit", async () => {
      let res = await request(server)
        .put("/restaurants/3")
        .set("Authorization", `${token}`)
        .send({
          name: "New Name"
        });

      expect(res.status).toBe(204);
    });

    it("should return 404 if it does not exist, when deleting data", async () => {
      let res = await request(server)
        .put("/restaurants/190")
        .set("Authorization", `${token}`)
        .send({
          name: "New Name"
        });
      expect(res.status).toBe(404);
    });
  });
});
