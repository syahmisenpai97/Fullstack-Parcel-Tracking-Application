import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Parcel = db.define(
  "Parcel",
  {
    tracking_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sender_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parcel_description: {
      type: DataTypes.TEXT,
    },
    shipment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estimated_delivery_date: {
      type: DataTypes.DATE,
    },
    current_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shipping_method: {
      type: DataTypes.ENUM("Standard", "Express"),
      allowNull: false,
    },
    delivery_status: {
      type: DataTypes.ENUM(
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Delayed"
      ),
      defaultValue: "In Transit",
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
    },
    shipping_cost: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    timestamps: true,
    updatedAt: "last_updated",
  }
);

export default Parcel;

Parcel.sync()
  .then(() => {
    console.log("Parcel table has been created.");
  })
  .catch((err) => {
    console.error("Error creating Parcel table:", err);
  });
