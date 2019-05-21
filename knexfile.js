require("dotenv").config();
const pg = require("pg");

module.exports = {
  development: {
    client: "sqlite3",
    connection: { filename: "./database/restaurant-passport.db3" },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: { directory: "./database/seeds" },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done); // enforce FK
      }
    }
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./database/test.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: { directory: "./database/seeds" }
  }
};
