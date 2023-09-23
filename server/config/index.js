require("dotenv").config();
const { Pool, Client } = require("pg");

const isProduction = process.env.NODE_ENV === "production";
const database =
  process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_DB_TEST
    : process.env.POSTGRES_DB;

const connectionString = `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${database}`;

const pool = new Pool({
  connectionString,
  /*
    SSL is not supported in development
    */
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

const client = new Client({
  connectionString,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

// export const query = async (text, params) => pool.query(text, params);
// export const getClient = () => pool.connect();

module.exports = {
  query: (text, params) => pool.query(text, params),
  connect: () => pool.connect(),
  end: () => pool.end(),
};
