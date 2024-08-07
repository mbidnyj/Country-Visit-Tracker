# **Country Visit Tracker**

## **Overview**

Country Visit Tracker is a web application for tracking the number of visits to various countries. It consists of a REST API backend built with Node.js/Express, a frontend built with Next.js, and uses Redis for data storage. The application supports high-load scenarios and visualizes data using a Choropleth map and a bar chart.

## **Prerequisites**

Ensure you have the following installed:

-   [Docker](https://www.docker.com/) (for running the application)

## **Installation**

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/mbidnyj/country-visit-tracker
    cd country-visit-tracker
    ```

2. **Build and Start the Containers:**

    Use Docker Compose to build and start the backend, frontend, and Redis services:

    ```bash
    docker-compose up --build
    ```

    This command builds the Docker images and starts the containers. The backend will automatically seed the Redis database after connecting.

3. **Access the Application:**

    - **Frontend:** `http://localhost:3001`
    - **Backend:** `http://localhost:3000`

4. **Stop the Application:**

    To stop the running containers, use:

    ```bash
    docker-compose down
    ```

## **Project Structure**

-   **/app**: Frontend code (Next.js).
-   **/www**: Backend code (Node.js/Express).
-   **/tests**: Unit and integration tests.
-   **/performance-tests**: Performance tests (run separately).
-   **/www/seed.js**: Script for seeding the Redis database with initial data.

## **API Endpoints**

### **1. Update Visit Statistics**

-   **Endpoint**: `/statistics`
-   **Method**: `POST`
-   **Request Body**: `{ "countryCode": "us" }`
-   **Response**: `200 OK`

### **2. Get Visit Statistics**

-   **Endpoint**: `/statistics`
-   **Method**: `GET`
-   **Response**: `200 OK` with a JSON object containing country codes and visit counts.

### Testing

Tests are automatically run as part of the Docker Compose process.

#### To Run Tests:

1. Build and Start All Services:

    ```bash
    docker-compose up --build
    ```

    This command will automatically run all tests after the services are up.

2. View Test Results:

    Monitor the Docker Compose logs to see the test results.

3. Clean Up:

    ```bash
    docker-compose down
    ```
