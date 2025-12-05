import { Router } from "express";
import { usersControllers } from "./user.controllers";
import { auth } from "../../middleware/auth";

const router = Router()

// get all user
router.get("/", auth(), usersControllers.getAllUsers)
router.put("/:userId", usersControllers.updateUser)
router.delete("/:userId", usersControllers.deleteUser)

export const userRoute = router 