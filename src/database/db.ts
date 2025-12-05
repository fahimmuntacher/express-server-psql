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
      role VARCHAR(20) NOT NULL,
      password TEXT NOT NULL,
      phone VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
      id SERIAL PRIMARY KEY,
      vehicle_name VARCHAR(100) NOT NULL,
      type VARCHAR(20) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
      registration_number VARCHAR(50) NOT NULL UNIQUE,
      daily_rent_price NUMERIC NOT NULL CHECK (daily_rent_price > 0),
      availability_status VARCHAR(20) DEFAULT 'available'
      CHECK (availability_status IN ('available','booked')),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};