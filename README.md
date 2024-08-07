# **Country Visit Tracker**

## **Overview**

The Country Visit Tracker is a web application that tracks the number of visits to various countries. The application provides a REST API backend, a frontend interface, and uses Redis for data storage. Users can select a country from a dropdown menu and update the visit count, which is then displayed on a map and as a bar chart. The application is designed to handle a high load of 1,000 requests per second, making it robust for real-world usage.

## **Features**

-   **REST API** for updating and retrieving visit statistics.
-   **Frontend Interface** built with Next.js, allowing users to interact with the application.
-   **Redis Database** for fast, in-memory data storage and retrieval.
-   **Data Visualization** using a Choropleth map and a bar chart to represent visit statistics.
-   **High Load Handling**: Designed to support up to 1,000 requests per second.

## **Table of Contents**

-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Project Structure](#project-structure)
-   [API Endpoints](#api-endpoints)
-   [Frontend Interface](#frontend-interface)
-   [Testing](#testing)
-   [Performance Testing](#performance-testing)
-   [Deployment](#deployment)
-   [License](#license)

## **Getting Started**

### **Prerequisites**

Before you begin, ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v14 or later)
-   [npm](https://www.npmjs.com/) (v6 or later)
-   [Docker](https://www.docker.com/) (for running Redis if not installed locally)

### **Installation**

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/mbidnyj/country-visit-tracker
    cd country-visit-tracker
    ```

### **Installation**

2. **Install Backend and Frontend Dependencies:**

    - For the backend:

        ```bash
        cd www
        npm install
        ```

    - For the frontend:

        ```bash
        cd app
        npm install
        ```

3. **Start Redis:**

    If you have Docker installed, you can start a Redis instance using Docker:

    ```bash
    docker run --name redis -p 6379:6379 -d redis
    ```

4. **Seed the Database:**

    Go to the `www` directory and run the seed script to populate Redis with initial data:

    ```bash
    cd www
    node seed.js
    ```

### **Running the Application**

1.  **Start the Backend Server:**

    From the `www` directory:

    ```bash
    npm run start
    ```

    The backend server will start on `http://localhost:3000`

2.  **Start the Frontend (Next.js):**

    In a separate terminal, go to the `app` directory:

    ```bash
    cd app
    PORT=3001 npm run dev
    ```

    The frontend will be available on `http://localhost:3001`

## **Project Structure**

-   **/app**: Contains the frontend code (Next.js).
-   **/www**: Contains the backend code (Node.js/Express).
-   **/tests**: Contains unit and integration tests.
-   **/performance-tests**: Contains performance tests (run separately).
-   **/www/seed.js**: Script for seeding the Redis database with initial data.
-   **/app/pages.js**: Main frontend page implementation.

## **API Endpoints**

### **1. Update Visit Statistics**

-   **Endpoint**: `/update-statistics`
-   **Method**: `POST`
-   **Description**: Updates the visit count for a specified country.
-   **Request Body**: `{ "countryCode": "us" }`
-   **Response**: `200 OK` on success.

### **2. Get Visit Statistics**

-   **Endpoint**: `/statistics`
-   **Method**: `GET`
-   **Description**: Retrieves the visit statistics for all countries.
-   **Response**: `200 OK` with a JSON object containing country codes and visit counts.

## **Frontend Interface**

The frontend is built using Next.js and provides a user-friendly interface to:

-   Select a country and update its visit count.
-   View visit statistics in a tabular format.
-   Visualize visit distribution on a world map (Choropleth map).
-   Display visit counts in a bar chart.

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
