import { Router } from "express";
import { vehiclesControoler } from "./vehicles.controller";
import { auth } from "../../middleware/auth";



 const router = Router()

//  vehicle post
   router.post("/", auth("admin"), vehiclesControoler.createVehicle);
   router.get("/", vehiclesControoler.getVehicles);
  router.get("/:vehicleId", vehiclesControoler.getSingleVehicle)
  router.put("/:vehicleId", auth("admin"), vehiclesControoler.updateVehicle)
 export const vehiclesRouter = router; 
