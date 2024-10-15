import React, { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import apiConfig from "../config/config";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { locations } from "../const/locations";

const ParcelForm = ({ isEdit }) => {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [parcelDescription, setParcelDescription] = useState("");
  const [shipmentDate, setShipmentDate] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [weight, setWeight] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { trackingNumber: trackingNumParam } = useParams();

  useEffect(() => {
    if (isEdit && trackingNumParam) {
      getParcelByTrackingNumber(trackingNumParam);
    }
  }, [isEdit, trackingNumParam]);

  const getParcelByTrackingNumber = async (trackingNum) => {
    try {
      const response = await axios.get(
        `${apiConfig.baseUrl}:${apiConfig.basePort}/parcel/${trackingNum}`
      );
      const parcel = response.data;

      const formatISOToYYYYMMDD = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      setTrackingNumber(parcel.tracking_number);
      setSenderName(parcel.sender_name);
      setReceiverName(parcel.receiver_name);
      setReceiverAddress(parcel.receiver_address);
      setParcelDescription(parcel.parcel_description);
      setShipmentDate(formatISOToYYYYMMDD(parcel.shipment_date));
      setWeight(parcel.weight);
      setShippingCost(parcel.shipping_cost);
      setShippingMethod(parcel.shipping_method);
      setEstimatedDeliveryDate(
        formatISOToYYYYMMDD(parcel.estimated_delivery_date)
      );
      setCurrentLocation(parcel.current_location);
      setDeliveryStatus(parcel.delivery_status);
    } catch (error) {
      console.error("Error fetching parcel:", error);
    }
  };

  const saveParcel = async (e) => {
    e.preventDefault();

    if (!/^MYS/.test(trackingNumber)) {
      setErrorMessage("Tracking number must start with 'MYS'.");
      return;
    }

    try {
      if (isEdit) {
        await axios.patch(
          `${apiConfig.baseUrl}:${apiConfig.basePort}/parcel/${trackingNumber}`,
          {
            tracking_number: trackingNumber,
            sender_name: senderName,
            receiver_name: receiverName,
            receiver_address: receiverAddress,
            parcel_description: parcelDescription,
            shipment_date: shipmentDate,
            current_location: currentLocation,
            shipping_method: shippingMethod,
            estimated_delivery_date: estimatedDeliveryDate,
            weight: weight,
            shipping_cost: shippingCost,
            delivery_status: deliveryStatus,
          }
        );
      } else {
        await axios.post(`${apiConfig.baseUrl}:${apiConfig.basePort}/parcel`, {
          tracking_number: trackingNumber,
          sender_name: senderName,
          receiver_name: receiverName,
          receiver_address: receiverAddress,
          parcel_description: parcelDescription,
          shipment_date: shipmentDate,
          current_location: currentLocation,
          shipping_method: shippingMethod,
          estimated_delivery_date: estimatedDeliveryDate,
          weight: weight,
          shipping_cost: shippingCost,
          delivery_status: deliveryStatus,
        });
      }
      navigate("/");
    } catch (error) {
      console.error(`Error ${isEdit ? "updating" : "adding"} parcel:`, error);
    }
  };

  return (
    <Container>
      <h1>{isEdit ? "Edit Parcel" : "Add New Parcel"}</h1>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={saveParcel}>
        <Form.Group className="mb-3">
          <Form.Label>Tracking Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter tracking number (MYSXXXXX)"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            required
            readOnly={isEdit}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Sender Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter sender's name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Receiver Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter receiver's name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Receiver Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter receiver's address"
            value={receiverAddress}
            onChange={(e) => setReceiverAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Current Location</Form.Label>
          <Form.Select
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)}
            required
          >
            <option value="">Select Current Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Shipping Method</Form.Label>
          <Form.Select
            value={shippingMethod}
            onChange={(e) => setShippingMethod(e.target.value)}
            required
          >
            <option value="">Select Method</option>
            <option value="Standard">Standard</option>
            <option value="Express">Express</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Weight (kg)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Shipping Cost (MYR)</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter shipping cost"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Shipment Date</Form.Label>
          <Form.Control
            type="date"
            value={shipmentDate}
            onChange={(e) => setShipmentDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Estimated Delivery Date</Form.Label>
          <Form.Control
            type="date"
            value={estimatedDeliveryDate}
            onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Delivery Status</Form.Label>
          <Form.Select
            value={deliveryStatus}
            onChange={(e) => setDeliveryStatus(e.target.value)}
            required
          >
            <option value="">Select status</option>
            <option value="In Transit">In Transit</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delayed">Delayed</option>
            <option value="Delivered">Delivered</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Parcel Description</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Enter parcel description"
            style={{ height: "100px" }}
            value={parcelDescription}
            onChange={(e) => setParcelDescription(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3 text-end">
          <Button variant={isEdit ? "success" : "primary"} type="submit">
            {isEdit ? "Update Parcel" : "Add Parcel"}
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default ParcelForm;
