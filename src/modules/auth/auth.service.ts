import bcrypt from "bcryptjs";
import { pool } from "../../database/db";
import jwt from "jsonwebtoken";

// signUp services
const signUpService = async (
  name: string,
  email: string,
  role: string,
  password: string,
  phone: string
) => {
  const result = await pool.query(
    `INSERT INTO users(name, email, role, password, phone)
     VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [name, email, role, password, phone]
  );

  return result;
};

// signIn service
const signIn = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  //   console.log(result);
  if (result.rows.length === 0) {
    return null;
  }

  const user = result.rows[0];
  //   console.log(user);
  const matchedPass = await bcrypt.compare(password, user.password);
  // console.log(matchedPass);
  if (!matchedPass) {
    return false;
  }

  const jwt_secret = `${process.env.JWT_SECRET}`;
  const token = jwt.sign(
    {id: user.id, name: user.name, email: user.email, role: user.role },
    jwt_secret as string,
    {
      expiresIn: "1d",
    }
  );
  //   console.log(user);
  return { token, user };
};

export const authService = {
  signUpService,
  signIn,
};
