import { body, param, validationResult } from "express-validator";
import Parcel from "../models/ParcelModel.js";

const handleError = (error, res, message = "Internal server error") => {
  console.error(error.message);
  res.status(500).json({ error: message });
};

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const getAllParcel = async (req, res) => {
  try {
    const response = await Parcel.findAll();
    res.status(200).json(response);
  } catch (error) {
    handleError(error, res);
  }
};

export const getParcelByTrackingNumber = [
  param("trackingNumber")
    .isAlphanumeric()
    .withMessage("Tracking number must be alphanumeric"),
  validateRequest,
  async (req, res) => {
    try {
      const response = await Parcel.findOne({
        where: { tracking_number: req.params.trackingNumber },
      });

      if (!response) {
        return res.status(404).json({ message: "Parcel not found" });
      }

      res.status(200).json(response);
    } catch (error) {
      handleError(error, res);
    }
  },
];

export const createParcel = [
  body("tracking_number")
    .matches(/^MY[a-zA-Z0-9]*$/)
    .withMessage("Tracking number must start with 'MY' and be alphanumeric"),
  body("current_location")
    .optional()
    .isString()
    .trim()
    .escape()
    .withMessage("Location must be valid"),
  validateRequest,
  async (req, res) => {
    try {
      await Parcel.create(req.body);
      res.status(201).json({ msg: "Parcel Created" });
    } catch (error) {
      handleError(error, res, "Failed to create parcel");
    }
  },
];

export const updateParcel = [
  param("trackingNumber")
    .matches(/^MY[a-zA-Z0-9]*$/)
    .withMessage("Tracking number must start with 'MY' and be alphanumeric"),
  body("current_location")
    .optional()
    .isString()
    .trim()
    .escape()
    .withMessage("Location must be valid"),
  validateRequest,
  async (req, res) => {
    try {
      const result = await Parcel.update(req.body, {
        where: { tracking_number: req.params.trackingNumber },
      });

      if (result[0] === 0) {
        return res.status(404).json({ message: "Parcel not found" });
      }

      res.status(200).json({ msg: "Parcel updated successfully" });
    } catch (error) {
      handleError(error, res, "Failed to update parcel");
    }
  },
];

export const deleteParcel = [
  param("trackingNumber")
    .isAlphanumeric()
    .withMessage("Tracking number must be alphanumeric"),
  validateRequest,
  async (req, res) => {
    try {
      const result = await Parcel.destroy({
        where: { tracking_number: req.params.trackingNumber },
      });

      if (result === 0) {
        return res.status(404).json({ message: "Parcel not found" });
      }

      res.status(200).json({ msg: "Parcel Deleted" });
    } catch (error) {
      handleError(error, res, "Failed to delete parcel");
    }
  },
];
