import { Request, Response } from "express";
import { pool } from "../../database/db";
import { bookingsService } from "./bookings.services";
import { JwtPayload } from "jsonwebtoken";

// create bookings
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

    const vehicleDetail = vehicle.rows[0];

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
    const result = await bookingsService.createBookings(
      customerId,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice
    );

    const bookingDetail = result.rows[0];
    console.log(bookingDetail);

    await pool.query(
      `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
      [vehicle_id]
    );

    const responseBooking = {
      ...bookingDetail,
      vehicle: {
        vehicle_name: vehicleDetail.vehicle_name,
        daily_rent_price: vehicleDetail.daily_rent_price,
      },
    };

    return res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: responseBooking,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get bookings
const getBookings = async (req: Request, res: Response) => {
  try {
    const currentUser = req.user;
    const result = await bookingsService.getBookings(currentUser as JwtPayload);

    const bookings = result.rows;

    if (bookings.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No bookings found",
        data: [],
      });
    }

    const finalData = [];

    for (const booking of bookings) {
      // vehicle info
      const vehicleResult = await pool.query(
        `
          SELECT 
            vehicle_name, 
            registration_number,
            type,
            daily_rent_price
          FROM vehicles 
          WHERE id=$1
        `,
        [booking.vehicle_id]
      );

      const vehicle = vehicleResult.rows[0];

      let customerInfo = null;

      if (currentUser!.role === "admin") {
        const userResult = await pool.query(
          `SELECT name, email FROM users WHERE id=$1`,
          [booking.customer_id]
        );
        customerInfo = userResult.rows[0] || null;
      }

      finalData.push({
        id: booking.id,
        vehicle_id: booking.vehicle_id,
        rent_start_date: booking.rent_start_date,
        rent_end_date: booking.rent_end_date,
        total_price: booking.total_price,
        status: booking.status,

        vehicle: vehicle
          ? {
              vehicle_name: vehicle.vehicle_name,
              registration_number: vehicle.registration_number,
              type: vehicle.type,
            }
          : null,
        customer: customerInfo,
      });
    }

    res.status(200).json({
      success: true,
      message: "Bookings retirived successfully",
      data: finalData,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// update bookings
const updateBooking = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const currentUser = req.user;

    // Call service
    const result = await bookingsService.updateBookingService(
      Number(bookingId),
      currentUser
    );
    console.log(result);

 
    return res.status(result.statusCode).json({
      success: result.success,
      message: result.message,
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const bookingControllers = {
  createBookings,
  getBookings,
  updateBooking,
};
