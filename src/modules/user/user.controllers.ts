import { Request, Response } from "express";
import { usersService } from "./user.services";
import { JwtPayload } from "jsonwebtoken";

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await usersService.getAllUsers();
    res.status(201).json({
      success: true,
      message: "Users retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Usrs not posted",
    });
  }
};

// user update
const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, role } = req.body;
    const userId = req.params.userId as string;
    const currentUser = req.user;

    // --- AUTHORIZATION CHECK ---
    // Customers can update ONLY themselves
    if (currentUser!.role === "customer") {
      if (Number(currentUser!.id) !== Number(userId)) {
        return res.status(403).json({
          success: false,
          message: "Customers can only update their own profile",
        });
      }
    }

    // Admin can update anyone → NO restriction

    // --- UPDATE USER ---
    const result = await usersService.updateUser(
      name,
      email,
      phone,
      role,
      userId
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await usersService.deleteUser(req.params.userId!);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const usersControllers = {
  getAllUsers,
  updateUser,
  deleteUser,
};
