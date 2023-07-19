import express from "express"
import * as ParkingController from "../controllers/parking"


const router = express.Router();

router
    .route("/parking")
    .post(ParkingController.postParking)

router
    .route("/parking/:id/out")
    .put(ParkingController.putParkingOut)

router
    .route("/parking/:id/pay")
    .put(ParkingController.putParkingPay)

router
    .route("/parking/:plate")
    .get(ParkingController.getByPlate)
