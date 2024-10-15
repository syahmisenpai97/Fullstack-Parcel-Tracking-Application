import React, { useState, useEffect } from "react";
import axios from "axios";
import apiConfig from "../config/config";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";
import { CheckCircleFill, ClockFill } from "react-bootstrap-icons";
import "./ParcelList.css";

const ParcelList = () => {
  const [parcels, setParcel] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [parcelsPerPage] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getAllParcel();
  }, []);

  const getAllParcel = async () => {
    try {
      const response = await axios.get(
        `${apiConfig.baseUrl}:${apiConfig.basePort}/parcel`
      );
      setParcel(response.data);
      setErrorMessage("");
    } catch (error) {
      handleError(error);
    }
  };

  const deleteParcel = async (trackingNumber) => {
    try {
      await axios.delete(
        `${apiConfig.baseUrl}:${apiConfig.basePort}/parcel/${trackingNumber}`
      );
      getAllParcel();
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      setErrorMessage(
        `Error: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      setErrorMessage("Network error: Please check your internet connection.");
    } else {
      setErrorMessage(`Error: ${error.message}`);
    }
    console.error("Error:", error);
  };

  // Handle page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  // Get parcels for the current page
  const offset = currentPage * parcelsPerPage;
  const currentParcels = parcels.slice(offset, offset + parcelsPerPage);
  const pageCount = Math.ceil(parcels.length / parcelsPerPage);

  return (
    <div className="container mt-5">
      {/* Error message display */}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="d-flex justify-content-end mb-3">
        <Link to={`add`} className="btn btn-success">
          Add Tracking
        </Link>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Tracking Number</th>
            <th>Sender Name</th>
            <th>Receiver Name</th>
            <th>Receiver Address</th>
            <th>Shipping Method</th>
            <th>Last Updated</th>
            <th>Delivery Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentParcels.map((parcel, index) => (
            <tr key={parcel.id}>
              <td>{offset + index + 1}</td>
              <td>{parcel.tracking_number}</td>
              <td>{parcel.sender_name}</td>
              <td>{parcel.receiver_name}</td>
              <td>{parcel.receiver_address}</td>
              <td>{parcel.shipping_method}</td>
              <td>
                {new Date(parcel.last_updated).toLocaleDateString("en-GB")}
              </td>
              <td>
                <div className="d-flex flex-column align-items-center">
                  {parcel.delivery_status === "Delivered" ? (
                    <>
                      <CheckCircleFill
                        className="text-success me-2"
                        size={20}
                      />
                      <span>Delivered</span>
                    </>
                  ) : (
                    <>
                      <ClockFill className="text-warning me-2" size={20} />
                      <span>{parcel.delivery_status}</span>
                    </>
                  )}
                </div>
              </td>
              <td>
                <div className="table-actions">
                  <Link to={`parcel/${parcel.tracking_number}`}>
                    <button className="btn btn-info">Read</button>
                  </Link>
                  <Link to={`edit/${parcel.tracking_number}`}>
                    <button className="btn btn-warning">Update</button>
                  </Link>

                  <button
                    onClick={() => deleteParcel(parcel.tracking_number)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination Component */}
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ParcelList;
