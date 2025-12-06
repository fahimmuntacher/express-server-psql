import { Request, Response } from "express";
import { pool } from "../../database/db";
import { bookingsService } from "./bookings.services";

const createBookings = async (req: Request, res: Response) => {
  try {
    const { vehicle_id, rent_start_date, rent_end_date } = req.body;
    const user = req.user;
    const customerId = user!.id;

    // date validation

    if (new Date(rent_end_date) < new Date(rent_start_date)) {
      return res.status(400).json({
        success: false,
        message: "rent end date will be after the rent start date",
      });
    }

    const vehicle = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
      vehicle_id,
    ]);
    if (vehicle.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    if (vehicle.rows[0].availability_status !== "available") {
      return res.status(400).json({
        success: false,
        message: "Vehicle is not available",
      });
    }

    const start = new Date(rent_start_date);
    const end = new Date(rent_end_date);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = days * Number(vehicle.rows[0].daily_rent_price);
    const booking = await bookingsService.createBookings(
      customerId,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice
    );

    await pool.query(
      `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
      [vehicle_id]
    );

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const bookingControllers = {
    createBookings
}