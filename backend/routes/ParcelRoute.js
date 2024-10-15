import express from "express";
import {
  createParcel,
  deleteParcel,
  getAllParcel,
  getParcelByTrackingNumber,
  updateParcel,
} from "../controllers/ParcelController.js";

const router = express.Router();

router.get("/parcel", getAllParcel);
router.get("/parcel/:trackingNumber", getParcelByTrackingNumber);
router.post("/parcel/", createParcel);
router.patch("/parcel/:trackingNumber", updateParcel);
router.delete("/parcel/:trackingNumber", deleteParcel);

export default router;
