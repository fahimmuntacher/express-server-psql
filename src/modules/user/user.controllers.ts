import { Request, Response } from "express";
import { usersService } from "./user.services";

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
    const result = await usersService.updateUser(
      name,
      email,
      phone,
      role,
      req.params.userId!
    );

    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: "user not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
    console.log(result.rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching User",
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
  } catch (error : any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const usersControllers = {
  getAllUsers,
  updateUser,
  deleteUser
};
