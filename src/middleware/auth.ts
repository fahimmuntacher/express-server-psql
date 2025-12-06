import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { pool } from "../database/db";

export const auth = (...roles : string[]) => {
    // console.log(roles);
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("You're not authorized");
    }

    const jwt_secret = `${process.env.JWT_SECRET}`;
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;
    // console.log(decoded);
    const user = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      decoded.email,
    ]);

    if (user.rows.length === 0) {
      throw new Error("Users not found");
    }
    req.user = decoded;

    if(roles.length && !roles.includes(decoded.role)){
        throw new Error("not authorized");
    }
    next();
  };
};
