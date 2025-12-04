import { Request, Response } from "express";
import { authService } from "./auth.service";



// user signup
const signUp = async (req: Request, res: Response) => {
  const { name, email, password, phone } = req.body;
  try {
    const result = await authService.signUp(name, email, password, phone);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success : false, 
      message : "User not signup"
    })
  }
}

export const authControllers = {
    signUp
}