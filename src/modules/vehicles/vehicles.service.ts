import { pool } from "../../database/db";

// create vehicle
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

// get all vehicles
const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result.rows;
};

// const get single vehicle
const getSingleVehicle = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM vehicles WHERE id=$1
    `,
    [id]
  );
  return result
};
export const vehiclesServices = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle
};
