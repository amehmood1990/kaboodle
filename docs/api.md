# Event Ticketing Application API Documentation

Welcome to the Event Ticketing Application API documentation. This guide will take you through the steps to set up the project, run the API, and explain the available endpoints.

## Setup

1. Clone the repository from GitHub.

```bash
cd packages/api
```

2. Install dependencies.

```bash
npm install
```

3. Set up environment variables.

Create a `.env` file in the root of the project and define the following environment variables:

```plaintext
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_NAME=your_database_name
DB_USER=your_database_username
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret_key
```

Replace `your_database_host`, `your_database_port`, `your_database_name`, `your_database_username`, and `your_database_password` with your actual database configurations. Also, generate a secure random string for `your_jwt_secret_key` to use for JWT token encryption.

## Running the API

To run the API in development mode with automatic server restarts (using `nodemon`):

```bash
npm run dev
```

To build the TypeScript files and run the compiled JavaScript in production mode:

```bash
npm run build
npm start
```

## Endpoints

### Events

#### Get All Events

- **Route**: GET `/api/events`
- **Description**: Get a list of all events.
- **Response**: An array of event objects, each containing event details such as name, date, description, and associated tickets.
- **Status Codes**:
    - 200: Events fetched successfully.

#### Get Event by ID

- **Route**: GET `/api/events/:id`
- **Description**: Get a specific event by its ID.
- **Response**: An event object containing event details and associated tickets.
- **Status Codes**:
    - 200: Event fetched successfully.
    - 404: Event not found.

#### Create Event

- **Route**: POST `/api/events`
- **Description**: Create a new event.
- **Request Body**: Event details like name, date, description, and associated user ID.
- **Response**: Created event object with details.
- **Status Codes**:
    - 201: Event created successfully.
    - 400: Invalid request body (missing required fields).

#### Update Event

- **Route**: PUT `/api/events/:id`
- **Description**: Update event details by its ID.
- **Request Body**: Updated event details like name, date, and description.
- **Response**: Updated event object with new details.
- **Status Codes**:
    - 200: Event updated successfully.
    - 400: Invalid request body (missing required fields).
    - 404: Event not found.

#### Delete Event

- **Route**: DELETE `/api/events/:id`
- **Description**: Delete an event by its ID.
- **Response**: Success message: "Event deleted successfully."
- **Status Codes**:
    - 200: Event deleted successfully.
    - 404: Event not found.

### Tickets

#### Get All Tickets for an Event

- **Route**: GET `/api/tickets/:eventId`
- **Description**: Get a list of all tickets for a specific event.
- **Response**: An array of ticket objects with details.
- **Status Codes**:
    - 200: Tickets fetched successfully.
    - 404: Event not found.

#### Get Ticket by ID

- **Route**: GET `/api/tickets/single/:id`
- **Description**: Get a specific ticket by its ID.
- **Response**: Ticket object containing ticket details and associated event ID.
- **Status Codes**:
    - 200: Ticket fetched successfully.
    - 404: Ticket not found.

#### Create Ticket

- **Route**: POST `/api/tickets`
- **Description**: Create a new ticket for an event.
- **Request Body**: Ticket details like name, type, price, booking fee, availability, and associated event ID.
- **Response**: Created ticket object with details.
- **Status Codes**:
    - 201: Ticket created successfully.
    - 400: Invalid request body (missing required fields).
    - 404: Event not found.

#### Update Ticket

- **Route**: PUT `/api/tickets/:id`
- **Description**: Update ticket details by its ID.
- **Request Body**: Updated ticket details like name, type, price, booking fee, and availability.
- **Response**: Updated ticket object with new details.
- **Status Codes**:
    - 200: Ticket updated successfully.
    - 400: Invalid request body (missing required fields).
    - 404: Ticket not found.

#### Delete Ticket

- **Route**: DELETE `/api/tickets/:id`
- **Description**: Delete a ticket by its ID.
- **Response**: Success message: "Ticket deleted successfully."
- **Status Codes**:
    - 200: Ticket deleted successfully.
    - 404: Ticket not found.

