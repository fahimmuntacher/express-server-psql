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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
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

// get single vehicle
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getSingleVehicle(req.params.vehicleId!);
    if (result.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: "Vehicle not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle fetched successfully",
        data: result.rows[0],
      });
    }
    console.log(result.rows);
  } catch (error : any) {
     res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const vehiclesControoler = {
  createVehicle,
  getVehicles,
  getSingleVehicle
};
