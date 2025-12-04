import { Router } from "express";
import { authControllers } from "./auth.controller";

const router = Router();

// singup
router.post("/signup", authControllers.signUp);

// signIn

export const authRouter = router;
