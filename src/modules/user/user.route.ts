import { Router } from "express";
import { usersControllers } from "./user.controllers";
import { auth } from "../../middleware/auth";

const router = Router();

// get all user
router.get("/", auth("admin"), usersControllers.getAllUsers);
router.put("/:userId", auth("admin", "customer"), usersControllers.updateUser);
router.delete("/:userId", auth("admin"), usersControllers.deleteUser);

export const userRoute = router;
