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

## **Testing**

### **Unit and Integration Tests**

To run unit and integration tests:

1. **Go to the `www` directory**:

    ```bash
    cd www
    ```

2. **Run the tests**:

    ```bash
    npm test
    ```

### **Performance Testing**

Performance testing is handled using `k6`. To run a performance test:

1. **Navigate to the `performance-tests` directory**:

    ```bash
    cd performance-tests
    ```

2. **Run the test using `k6`**:

    ```bash
    k6 run performance.test.js
    ```
