import { Router } from "express";
import { vehiclesControoler } from "./vehicles.controller";
import { auth } from "../../middleware/auth";



 const router = Router()

//  vehicle post
   router.post("/", auth("admin"), vehiclesControoler.createVehicle);
   router.get("/", vehiclesControoler.getVehicles);
  router.get("/:vehicleId", vehiclesControoler.getSingleVehicle)
  router.put("/:vehicleId", auth("admin"), vehiclesControoler.updateVehicle)
  router.delete("/:vehicleId", auth("admin"), vehiclesControoler.delteVehicel)
 export const vehiclesRouter = router; 
