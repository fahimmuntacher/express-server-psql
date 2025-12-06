import { pool } from "../../database/db";

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
    [customerId,vehicleId, rentStart, rentEnd, totalPrice]
  );
  return result;
};


export const bookingsService = {
    createBookings
}