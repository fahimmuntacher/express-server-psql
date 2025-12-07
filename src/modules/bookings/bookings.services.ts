import { Result } from "pg";
import { pool } from "../../database/db";

// create bookings
const createBookings = async (
  customerId: number,
  vehicleId: number,
  rentStart: string,
  rentEnd: string,
  totalPrice: number
) => {
  const result = await pool.query(
    ` INSERT INTO bookings 
    (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
    VALUES ($1, $2, $3, $4, $5, 'active')
    RETURNING *
        `,
    [customerId, vehicleId, rentStart, rentEnd, totalPrice]
  );
  return result;
};

// get bookings

const getBookings = async (currentUser: any) => {
  if (currentUser!.role === "customer") {
    const result = await pool.query(
      `SELECT * FROM bookings WHERE customer_id= $1 `,
      [currentUser.id]
    );
    return result;
  } else {
    const result = await pool.query(`
        SELECT * FROM bookings 
        `);
    return result;
  }
};

// update bookings

const updateBookingService = async (bookingId: number, currentUser: any) => {
  // 1. Fetch booking
  const bookingData = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);

  if (bookingData.rows.length === 0) {
    return {
      statusCode: 404,
      success: false,
      message: "Booking not found",
    };
  }

  const booking = bookingData.rows[0];
  //   console.log(booking);
  const vehicleId = booking.vehicle_id;

  // console.log(currentUser.id);
  // console.log(currentUser.role);
  // console.log(booking.customer_id);

  // CASE 1: CUSTOMER CANCEL BOOKING

  if (currentUser.role === "customer") {
    if (currentUser.id !== booking.customer_id) {
      return {
        statusCode: 403,
        success: false,
        message: "You are not allowed to cancel this booking",
      };
    }

    const now = new Date();
    const startDate = new Date(booking.rent_start_date);

    const nowDate = new Date(now.toISOString().split("T")[0]!);
    const startOnlyDate = new Date(startDate.toISOString().split("T")[0]!);
    if (nowDate > startOnlyDate) {
      return {
        statusCode: 400,
        success: false,
        message: "Booking cannot be cancelled after the start date",
      };
    }

    await pool.query(`UPDATE bookings SET status='cancelled' WHERE id=$1`, [
      bookingId,
    ]);
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [vehicleId]
    );
  const updatedBooking = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);

    return {
      statusCode: 200,
      success: true,
      data: updatedBooking.rows[0],
    };
  }

  // CASE 2: ADMIN MARK AS RETURNED

  if (currentUser.role === "admin") {
    await pool.query(`UPDATE bookings SET status='returned' WHERE id=$1`, [
      bookingId,
    ]);

    // vehicle now available
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [vehicleId]
    );

    return {
      statusCode: 200,
      success: true,
      data: booking,
    };
  }

  return {
    statusCode: 403,
    success: false,
    message: "You are not allowed to update bookings",
  };
};

export const bookingsService = {
  createBookings,
  getBookings,
  updateBookingService,
};
