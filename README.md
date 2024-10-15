# Fullstack Parcel Tracking Application

This is a full-stack Parcel Tracking Application with a **React frontend** and a **Node.js/Express backend**. The app allows users to track parcels, update parcel information, and view delivery statuses.

## Features

- **Frontend**: Built with React, Bootstrap, and Axios for API calls.
- **Backend**: Built with Node.js, Express, and Sequelize (MySQL) for managing the database.
- **Parcel Management**: Track parcels, update statuses, and view details.
- **Pagination**: Supports paginated views of the parcel list.
- **Icons**: Uses Bootstrap icons for status indicators.
- **Rate Limiting**: Limits the number of API requests to prevent abuse.
- **Error Handling**: Proper error handling for all API routes to ensure smooth functionality.
- **Input Validation and Sanitization**: Protects against invalid or malicious input.

## Technologies Used

- **Frontend**:
  - React
  - Axios
  - Bootstrap
  - React Router
  - React Paginate
  - React Bootstrap Icons

- **Backend**:
  - Node.js
  - Express
  - Sequelize (ORM)
  - MySQL
  - **Rate Limiting**: Implemented using `express-rate-limit`.
  - **Input Validation and Sanitization**: Implemented using `express-validator` to validate and sanitize input.
  
## Prerequisites

Before running the application, make sure you have the following installed:

- **Node.js** (v20.18.0)
- **MySQL** 
- **npm** (Node.js command)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/syahmisenpai97/Fullstack-Parcel-Tracking-Application.git
```

### 2. Backend Setup (Node.js/Express)

- Navigate to the backend folder:

```bash
cd FULLSTACK/backend
```

- Install backend dependencies:

```bash
npm install
```

- Edit a `.env` file in the `backend` directory and configure your environment variables (e.g., for database connection):

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=parcel_db
PORT=5000
```

- Run database migrations and seeders (if any) using Sequelize.

- Start the backend server:

```bash
nodemon index
```

The backend server will be running on `http://localhost:5000`.

### 3. Frontend Setup (React)

- Navigate to the frontend folder:

```bash
cd ../frontend
```

- Install frontend dependencies:

```bash
npm install
```

- Start the frontend server:

```bash
npm start
```

The frontend app will be running on `http://localhost:3000`.

### 4. Optionally, Running Both Frontend and Backend Concurrently 
You can directly start both the backend and frontend with one command after setting up the .env file

To run both the backend and frontend simultaneously, navigate to the root project directory (`FULLSTACK`) and run:

```bash
npm start
```

This will start both the backend and frontend using `concurrently`.

### 5. Database Setup

Ensure that you have MySQL installed and configured. You can create the `parcel_db` database using:

```sql
CREATE DATABASE parcel_db;
```

The Sequelize models will automatically sync the database structure when the backend server starts.

## Parcel Model

| Field                       | Type           | Required | Unique | Default Value       | Description                                       | Acceptable Values                          |
|-----------------------------|----------------|----------|--------|---------------------|---------------------------------------------------|--------------------------------------------|
| tracking_number              | STRING         | Yes      | Yes    |                     | The unique tracking number for the parcel.       |                                            |
| sender_name                  | STRING         | Yes      | No     |                     | The name of the sender.                           |                                            |
| receiver_name                | STRING         | Yes      | No     |                     | The name of the receiver.                         |                                            |
| receiver_address             | STRING         | Yes      | No     |                     | The address of the receiver.                      |                                            |
| parcel_description           | TEXT           | No       | No     |                     | A description of the parcel.                     |                                            |
| shipment_date                | DATE           | Yes      | No     |                     | The date the parcel was shipped.                  |                                            |
| estimated_delivery_date      | DATE           | No       | No     |                     | The estimated delivery date of the parcel.       |                                            |
| current_location             | STRING         | Yes      | No     |                     | The current location of the parcel.              |                                            |
| shipping_method              | ENUM           | Yes      | No     |                     | The shipping method (Standard or Express).       | "Standard", "Express" |
| delivery_status              | ENUM           | No       | No     | In Transit          | The current delivery status of the parcel.       | "In Transit", "Out for Delivery", "Delivered", "Delayed".|
| weight                       | DECIMAL(10, 2) | No       | No     |                     | The weight of the parcel.                         |                                            |
| shipping_cost                | DECIMAL(10, 2) | No       | No     |                     | The cost of shipping the parcel.                  |                                            |
| last_updated                 | TIMESTAMP      | No       | No     |                     | The timestamp of when the parcel record was last updated. |                                            |

 **For shipping_method and delivery_status only Acceptable Values accepted, if other value the API will return an error.**



## API Endpoints

| Method | Endpoint                    | Description                             |
|--------|-----------------------------|-----------------------------------------|
| GET    | `/parcel`                   | Retrieve all parcels                    |
| GET    | `/parcel/:tracking_number`  | Retrieve a parcel by tracking number    |
| POST   | `/parcel`                   | Create a new parcel                     |
| PATCH  | `/parcel/:tracking_number`  | Update an existing parcel               |
| DELETE | `/parcel/:tracking_number`  | Delete a parcel by tracking number      |

## Example Requests

### Retrieve All Parcels
```http
GET /parcel
```

### Create a New Parcel
```http
POST /parcel
Content-Type: application/json

{
  "tracking_number": "MYS246810",
  "sender_name": "Zulhilmi Bin Musa",
  "receiver_name": "Noraini Binti Zahari",
  "receiver_address": "123 Jalan Raja, Kampung Baru, 50300 Kuala Lumpur, Malaysia",
  "parcel_description": "Electronics - Laptop",
  "shipment_date": "2024-10-11",
  "estimated_delivery_date": "2024-10-17",
  "current_location": "Kuala Lumpur Sorting Center",
  "shipping_method": "Standard",
  "delivery_status": "Out for Delivery",
  "weight": 2.5,
  "shipping_cost": 40.00
}
```

### Update a Parcel
```http
PATCH /parcel/MYS246810
Content-Type: application/json

{
  "delivery_status": "Delivered"
}
```

### Delete a Parcel
```http
DELETE /parcel/MYS246810
```

### Security Features

| Feature                         | Description                                                                                  |
|---------------------------------|----------------------------------------------------------------------------------------------|
| Rate Limiting                   | Limits the number of requests a user can make to prevent abuse and denial-of-service attacks. |
| Error Handling                  | Implements structured error responses to ensure sensitive information is not leaked.         |
| Input Validation and Sanitization| Ensures that user inputs are validated and sanitized to prevent SQL injection and XSS attacks. |
| HTTPS                           | Uses HTTPS for secure communication between the client and server to protect data in transit. |

## Contribution

Feel free to submit a pull request to contribute to this project. Any feedback is appreciated!

