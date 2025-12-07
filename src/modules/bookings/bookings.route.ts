import { Router } from "express";
import { auth } from "../../middleware/auth";
import { bookingControllers } from "./bookings.controller";
const router = Router()

// create booking
router.post("/", auth("customer", "admin") , bookingControllers.createBookings)
router.get("/", auth("customer", "admin") , bookingControllers.getBookings)
router.put("/:bookingId", auth("customer", "admin") , bookingControllers.updateBooking)


export const bookingsRoute = router;