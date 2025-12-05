import { Request, Response } from "express";
import { authService } from "./auth.service";
import bcrypt from "bcryptjs";

// user signup
const signUp = async (req: Request, res: Response) => {
  const { name, email, role, password, phone } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const result = await authService.signUpService(
      name,
      email,
      role,
      hashedPassword,
      phone
    );
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User not signup",
    });
  }
};

// user signin
const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await authService.signIn(email, password);
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authControllers = {
  signUp,
  signIn,
};
