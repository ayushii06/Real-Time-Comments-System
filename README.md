

# Real-Time Comments System

This is a simple real-time comments application built with Next.js, Node.js, and MySQL. It allows users to log in with a username, post comments, and view new comments in real time, using Socket.IO. The front-end is styled with Material UI, and Axios is used for HTTP requests. This repository contains both the front-end and back-end code for the application.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Database Setup](#database-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Project Structure

```
real-time-comments/
├── frontend/                 # Next.js application with Material UI
└── backend/                  # Node.js server with Socket.IO and MySQL
```
Fronted folder here is named as realtime
---

### Frontend
Located in the `realtime/` folder, the front-end is built with Next.js and styled using Material UI (MUI). It includes pages for logging in, posting comments, and displaying comments in real time.

### Backend
Located in the `backend/` folder, the back-end is a Node.js server that uses MySQL for data storage and Socket.IO for real-time updates.

---

## Features

- **User Login**: Log in with a simple username (no password required).
- **Post Comments**: Submit comments that display in real-time.
- **Real-Time Updates**: View new comments immediately as they are added.
- **Responsive Design**: Front-end uses Material UI for a mobile-friendly layout.

---

## Technologies Used

- **Front-End**: Next.js, Material UI, Axios
- **Back-End**: Node.js, Express.js, Socket.IO, MySQL
- **Database**: MySQL

---

## Setup

### Prerequisites

Ensure you have the following installed:
- Node.js
- MySQL
- Git

### Clone the Repository

```bash
git clone https://github.com/ayushii06/Real-Time-Comments-System.git
cd real-time-comments
```

### Frontend Setup

1. Navigate to the `realtime` folder:
    ```bash
    cd realtime
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

### Backend Setup

1. Navigate to the `backend` folder:
    ```bash
    cd ../backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
   - Create a `.env` file in the `backend` folder with the following variables:
     ```
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=yourpassword
     DB_NAME=commentsdb
     PORT=3001
     ```
4. Start the server:
    ```bash
    npm start
    ```

### Database Setup

1. Open your MySQL client and create a new database:
    ```sql
    CREATE DATABASE commentsdb;
    ```
2. Create the `comments` table:
    ```sql
    USE commentsdb;
    CREATE TABLE comments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255),
        comment TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    ```

---

## Usage

1. Start both the front-end and back-end servers.
2. Visit `http://localhost:3000` in your browser to use the application.
3. Enter a username, post comments, and see new comments appear in real-time!

---

## API Endpoints

- **POST** `/api/login`
   - Payload: `{ "username": "example_user" }`
   - Response: `session ID`

- **GET** `/api/comments`
   - Fetch all comments.

- **POST** `/api/comments`
   - Payload: `{ "username": "example_user", "comment": "This is a comment" }`
   - Stores a comment in the MySQL database and broadcasts it via Socket.IO.

---

## License

This project is licensed under the MIT License.

--- 

Feel free to update this README with any additional details or customization specific to your project!
