import { pool } from "../../database/db";

const signUp = async (name : string, email :string, password : string, phone : string) => {
    const result = await pool.query(
        `INSERT INTO users(name, email, password, phone) VALUES($1, $2, $3, $4) RETURNING *`,
        [name, email, password, phone]
      );
      return result
}

export const authService = {
    signUp
}