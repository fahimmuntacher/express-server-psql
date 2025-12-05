import { Router } from "express";
import { vehiclesControoler } from "./vehicles.controller";


 const router = Router()

//  vehicle post
   router.post("/", vehiclesControoler.createVehicle);

 export const vehiclesRouter = router; 
