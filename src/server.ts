import express, { Request, Response } from "express";

import { initDb } from "./database/db";
import { authRouter } from "./modules/auth/auth.routes";
import { vehiclesRouter } from "./modules/vehicles/vehicles.routes";
import { userRoute } from "./modules/user/user.route";
import { bookingsRoute } from "./modules/bookings/bookings.route";

const app = express();
const port = 5000;

// middlewear
app.use(express.json());

initDb();

// auth CRUD
app.use("/api/v1/auth", authRouter);

// users CRUD
app.use("/api/v1/users", userRoute)

// vehicle CRUD 
app.use("/api/v1/vehicles", vehiclesRouter);


// bookings CRUD
app.use("/api/v1/bookings", bookingsRoute)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "This is the root",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
