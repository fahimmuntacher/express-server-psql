import { Router } from "express";
import { auth } from "../../middleware/auth";
import { bookingControllers } from "./bookings.controller";
const router = Router()

// create booking
router.post("/", auth("customer", "admin") , bookingControllers.createBookings)


export const bookingsRoute = router;