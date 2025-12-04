import express, { Request, Response } from "express";
import { Pool } from "pg";
const app = express();
const port = 5000;

// middlewear
app.use(express.json());

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_kix1GRjry6ph@ep-sweet-frog-a830txyw-pooler.eastus2.azure.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDb = async () => {
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

initDb();

app.post("/users", async (req, res) => {
  const { name, email, password, phone } = req.body;
  const result = await pool.query(
    `INSERT INTO users(name, email, password, phone) VALUES($1, $2, $3, $4) RETURNING *`,
    [name, email, password, phone]
  );
  res.status(201).json({
    success: true,
    message: "User created",
    data: result.rows[0],
  });
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
