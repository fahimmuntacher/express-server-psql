import { pool } from "../../database/db";

const createVehicle = async (
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: number
) => {
  const result = await pool.query(
    `
    INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [vehicle_name, type, registration_number, daily_rent_price]
  );
  return result;
};

export const vehiclesServices = {
  createVehicle,
};
