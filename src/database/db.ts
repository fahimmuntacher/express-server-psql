import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config()

export const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

export const initDb = async () => {
  await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
      name VARCHAR(250) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phone VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
      )
    `);
};