import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiConfig from "../config/config";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const ReadParcel = () => {
  const { trackingNum } = useParams(); // Get tracking number from route params
  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getParcelDetails = async () => {
      try {
        const response = await axios.get(
          `${apiConfig.baseUrl}:${apiConfig.basePort}/parcel/${trackingNum}`
        );
        setParcel(response.data);
      } catch (error) {
        setError("Error fetching parcel details");
      } finally {
        setLoading(false);
      }
    };

    getParcelDetails();
  }, [trackingNum]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container className="mt-5">
      <Card className="text-center">
        <Card.Header>Parcel Details</Card.Header>
        <Card.Body>
          <Card.Title>Tracking Number: {parcel.tracking_number}</Card.Title>
          <Table striped bordered hover responsive>
            <tbody>
              <tr>
                <td>
                  <strong>Sender Name:</strong>
                </td>
                <td>{parcel.sender_name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Receiver Name:</strong>
                </td>
                <td>{parcel.receiver_name}</td>
              </tr>
              <tr>
                <td>
                  <strong>Receiver Address:</strong>
                </td>
                <td>{parcel.receiver_address}</td>
              </tr>
              <tr>
                <td>
                  <strong>Parcel Description:</strong>
                </td>
                <td>{parcel.parcel_description}</td>
              </tr>
              <tr>
                <td>
                  <strong>Shipment Date:</strong>
                </td>
                <td>
                  {new Date(parcel.shipment_date).toLocaleDateString("en-GB")}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Estimated Delivery Date:</strong>
                </td>
                <td>
                  {new Date(parcel.estimated_delivery_date).toLocaleDateString(
                    "en-GB"
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Current Location:</strong>
                </td>
                <td>{parcel.current_location}</td>
              </tr>
              <tr>
                <td>
                  <strong>Shipping Method:</strong>
                </td>
                <td>{parcel.shipping_method}</td>
              </tr>
              <tr>
                <td>
                  <strong>Delivery Status:</strong>
                </td>
                <td>{parcel.delivery_status}</td>
              </tr>
              <tr>
                <td>
                  <strong>Weight:</strong>
                </td>
                <td>{parcel.weight} kg</td>
              </tr>
              <tr>
                <td>
                  <strong>Shipping Cost:</strong>
                </td>
                <td>RM {parcel.shipping_cost}</td>
              </tr>
              <tr>
                <td>
                  <strong>Created At:</strong>
                </td>
                <td>{new Date(parcel.createdAt).toLocaleString("en-GB")}</td>
              </tr>
              <tr>
                <td>
                  <strong>Last Updated:</strong>
                </td>
                <td>{new Date(parcel.last_updated).toLocaleString("en-GB")}</td>
              </tr>
            </tbody>
          </Table>
          <Button variant="primary" onClick={() => window.history.back()}>
            Back
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReadParcel;
