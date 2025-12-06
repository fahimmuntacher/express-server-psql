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
  return result;
};


// delete vehicle
const deleteVehicle = async (id : string) => {
  const result = await pool.query(`DELETE FROM vehicles WHERE id=$1 RETURNING *`, [id])
  return result;
} 

// update vehicle
const vehicleUpdate = async (
  id: string,
  vehicle_name: string,
  type: string,
  registration_number: string,
  daily_rent_price: number,
  availability_status: string
) => {
  const result = await pool.query(
    `
    UPDATE vehicles 
    SET vehicle_name=$1, type=$2, registration_number=$3, daily_rent_price=$4, availability_status=$5 
    WHERE id=$6 
    RETURNING *
    `,
    [vehicle_name, type, registration_number, daily_rent_price, availability_status, id]
  );

  return result;
};


export const vehiclesServices = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  vehicleUpdate,
  deleteVehicle
};
