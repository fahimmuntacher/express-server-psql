import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

// create vehicle
const createVehicle = async (req: Request, res: Response) => {
  const { vehicle_name, type, registration_number, daily_rent_price } =
    req.body;
  try {
    const result = await vehiclesServices.createVehicle(
      vehicle_name,
      type,
      registration_number,
      daily_rent_price
    );
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vehicle not posted",
    });
  }
};

// get all vehicle
const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getAllVehicles();
    res.status(201).json({
      success: true,
      message: "Vehicles retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Vehicle not posted",
    });
  }
};

export const vehiclesControoler = {
  createVehicle,
  getVehicles
};
