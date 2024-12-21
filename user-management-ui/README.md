# User Management App

A full-stack application for managing users, locations, and schedules, developed with a .NET Core backend and a React frontend. MongoDB serves as the database backend.

## Repository

[User Management App Repository](https://github.com/javieraugustoalba/userManagementApp.git)

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Backend Installation](#backend-installation)
  - [Frontend Installation](#frontend-installation)
- [Usage](#usage)
  - [Run Locally](#run-locally)
  - [API Documentation](#api-documentation)
- [API Endpoints](#api-endpoints)
  - [User Endpoints](#user-endpoints)
  - [Location Endpoints](#location-endpoints)
  - [Schedule Endpoints](#schedule-endpoints)
- [Deployment](#deployment)
  - [Deploy Backend](#deploy-backend)
  - [Deploy Frontend](#deploy-frontend)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Follow these instructions to set up the project on your local machine.

## Prerequisites

Make sure you have the following installed:

- [.NET Core SDK 6.0 or later](https://dotnet.microsoft.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally or accessible via URI)
- [Node.js](https://nodejs.org/) and npm (for the frontend)
- [Git](https://git-scm.com/)

## Installation

### Backend Installation

1. Navigate to the backend folder:

   ```bash
   cd userManagementApp//user-management-backend/UserManagementWebApi
   ```

2. Restore NuGet packages:

   ```bash
   dotnet restore
   ```

3. Set up the MongoDB connection:
   - Open `appsettings.json` and update the `ConnectionStrings` section with your MongoDB connection details:

     ```json
     {
       "ConnectionStrings": {
         "MongoDb": "mongodb://localhost:27017/UserManagementDb"
       },
       "DatabaseName": "UserManagementDb"
     }
     ```

4. Build the project:

   ```bash
   dotnet build
   ```

### Frontend Installation

1. Navigate to the frontend folder:

   ```bash
   cd userManagementApp/user-management-ui
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the API base URL:
   - Open the `src/api.js` file and ensure the base URL matches your backend's URL:

     ```javascript
     import axios from "axios";

     const api = axios.create({
       baseURL: "http://localhost:5124/",
     });

     export default api;
     ```

## Usage

### Run Locally

#### Backend

1. Start the MongoDB server:

   ```bash
   mongod
   ```

2. Run the backend application:

   ```bash
   cd userManagementApp/user-management-backend/UserManagementWebApi
   dotnet run
   ```

3. The backend API will be accessible at:
   - `http://localhost:5124`

#### Frontend

1. Start the frontend application:

   ```bash
   cd userManagementApp/user-management-ui
   npm start
   ```

2. The frontend will be accessible at:
   - `http://localhost:3000`

### API Documentation

Swagger UI is included for testing the backend API.

- Open your browser and navigate to:
  - `http://localhost:5124/swagger`

## API Endpoints

### User Endpoints

- **GET** `/api/User`
  - Retrieve all users.
- **GET** `/api/User/{id}`
  - Retrieve a single user by ID.
- **POST** `/api/User`
  - Create a new user.
  - Example Request:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "userType": "Administrator"
    }
    ```
- **PUT** `/api/User/{id}`
  - Update an existing user.
- **DELETE** `/api/User/{id}`
  - Delete a user by ID.

### Location Endpoints

- **GET** `/api/Location`
  - Retrieve all locations.
- **GET** `/api/Location/{id}`
  - Retrieve a single location by ID.
- **POST** `/api/Location`
  - Create a new location.
  - Example Request:
    ```json
    {
      "name": "Office A",
      "address": "123 Main Street",
      "status": "Active",
      "accessSchedules": []
    }
    ```
- **PUT** `/api/Location/{id}`
  - Update an existing location.
- **DELETE** `/api/Location/{id}`
  - Delete a location by ID.

### Schedule Endpoints

- **POST** `/api/Location/{id}/schedule`
  - Add an access schedule to a location.
  - Example Request:
    ```json
    {
      "userId": "user123",
      "locationId": "location456",
      "startTime": "2024-12-22T10:00:00Z",
      "endTime": "2024-12-22T12:00:00Z"
    }
    ```
- **DELETE** `/api/Location/{id}/schedule/{userId}`
  - Remove an access schedule for a user.

## Deployment

### Deploy Backend

1. Publish the backend application:

   ```bash
   cd userManagementApp/user-management-backend/UserManagementWebApi
   dotnet publish -c Release -o ./publish
   ```

2. Deploy the contents of the `publish` folder to your production server.
3. Configure the environment variables for MongoDB connection and other settings.

### Deploy Frontend

1. Build the frontend for production:

   ```bash
   cd userManagementApp/user-management-ui
   npm run build
   ```

2. Deploy the contents of the `build` folder to your web server or hosting service.

## Contributing

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature-name
   ```

3. Make your changes and commit them:

   ```bash
   git commit -m "Add new feature"
   ```

4. Push your branch:

   ```bash
   git push origin feature-name
   ```

5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

