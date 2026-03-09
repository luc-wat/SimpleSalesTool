# Simple Sales Tool

A full-stack web application for managing sales and customer data, built with React and Node.js.

## Features

- Customer management (add, edit, delete)
- Sales management (add, edit, delete, fetch)
- User authentication (login/register)
- Responsive UI with Tailwind CSS
- RESTful API with validation

## Next steps not reached in this iteration

- MPAN viewing with a many-to-many relationship between sales and MPANs
- Unique customer, user, and sale details
- Distinct status values
- Completion toggling
- Cleaner form input (for instance, a customer dropdown)
- More robust backend authentication with PassportJS
- Frontend password hashing
- Complete, thorough testing
- Session and cookie handling
- Searching, sorting, and pagination

## Design choices

Some details were left purposefully vague to accomodate minimal domain knowledge, with the intention that these could be easily rectified once more detail is available. This includes sale status simply being a text string, rather than from a set of specific values, and there being no relationship between customer and user. Depending on the purpose of the application, it could be that every use will belong to a customer, or there may be third parties. 

The application architecture involves a NodeJS backend server, React frontend client, and a PostgreSQL database. The server defines routes for auth ('/register' and '/login'), customers ('/customers') and sales ('/sales). The frontend has separate pages for landing, register, login, and sales. 

## Testing

Happy path integration tests have been completed for the backend. The rest still need to be completed, due to time constraints. This includes:

- Backend validation integration tests
- Backend unit tests
- Frontend unit tests
- Full frontend integration tests
- Thorough E2E tests

Further, the available tests currently use the same database as the application. This needs to be separated out into a mock, test database to preserve the cleanliness and security of customer data.

## Tech Stack

### Frontend
- React 19
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Validator for form validation

### Backend
- Node.js with Express
- PostgreSQL database
- Express Validator for request validation
- CORS support
- JWT authentication (planned)

### Development Tools
- Vite for frontend build
- Nodemon for backend development
- Jest for testing
- Docker for database

## Prerequisites

The following should be installed prior to running this application:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://docs.docker.com/) (for PostgreSQL database)
- [npm](https://www.npmjs.com/)

## Installation

### Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd simple-sales-tool
   ```

### Install dependencies:

#### Client dependencies:
   ```bash
   cd client
   npm install
   cd ..
   ```

#### Server dependencies:
   ```bash
   cd server
   npm install
   cd ..
   ```

## Database Setup

### Option 1: Use Docker Compose
```bash
docker-compose up -d
```

To stop the database:
```bash
docker-compose down
```

### Option 2: Use Docker directly (if Docker Compose fails)
```bash
docker run --name postgres-sales-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=simple-sales-tool -p 5432:5432 -d postgres
```

#### Connect to the database
```bash
docker exec -it postgres-sales-db psql -U postgres -d simple-sales-tool
```

#### Enable pgcrypto extension for password hashing
```bash
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

#### Create customers table for sale ownership
```bash
CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(160) NOT NULL
);
```

#### Create sales table
```bash
CREATE TABLE sales (
    sale_id SERIAL PRIMARY KEY,
    created_date DATE DEFAULT CURRENT_DATE,
    contract_start_date DATE NOT NULL,
    contract_end_date DATE NOT NULL,
    status VARCHAR(80),
    customer_id INTEGER REFERENCES customers(customer_id)
);
```

#### Create users table for authentication (the user may be distinct from a company)
```bash
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(160) NOT NULL,
    password VARCHAR(160) NOT NULL
);
```

### Populate the database
This can be done manually or through the application.

## Environment Configuration

Create a .env file in server and set the environment variables as follows:

```env
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=simple-sales-tool
POSTGRES_PORT=5432
NODE_ENV=development
```

## Running the Application

### Start the backend server:
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:8080`

### Start the frontend (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```
   The client will start on `http://localhost:5173`

### Access the application:
   Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /register` - Register a new user
- `POST /login` - Login user

### Customers
- `GET /customers` - Get all customers
- `POST /customers` - Create a new customer
- `PATCH /customers/:id` - Update a customer
- `DELETE /customers/:id` - Delete a customer

### Sales
- `GET /sales` - Get the full information for all sales
- `POST /sales` - Create a new sale
- `PATCH /sales/:id` - Update a sale
- `DELETE /sales/:id` - Delete a sale
- `GET /sales/:id` - Get the full information for a specific sale

## Running the tests

### End-to-End Tests
```bash
cd server
npm run test:e2e
```