import { Router } from "express";
import { vehiclesControoler } from "./vehicles.controller";
import { auth } from "../../middleware/auth";


 const router = Router()

//  vehicle post
   router.post("/", auth(), vehiclesControoler.createVehicle);
   router.get("/", vehiclesControoler.getVehicles);

 export const vehiclesRouter = router; 
