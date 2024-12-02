# Simple Backend

## Description

This project is a backend application built with **Node.js**, **Express**, **MongoDB**, and **Redis**. It includes features such as authentication, rate limiting, and validation middleware.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
5. [Versions](#versions)
6. [License](#license)
7. [Contact](#contact)

---

## Installation

To install the Simple Backend, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/yourusername/simple-backend.git
cd simple-backend
npm install
```

### Configuration

The application uses environment variables for configuration. An Example for the environment variables can be found in `.env.example`.

## Usage

To start the server, run the following command:

```bash
npm start
```

## API Endpoints

- `GET /v1/notifications` - Query a list of notifications
- `POST /v1/notifications` - Create a new notification
- `GET /v1/notifications/:id` - Retrieve a specific notification by ID
- `PUT /v1/notifications/:id` - Mark a specific notification as **Read** by ID
- `DELETE /v1/notifications/:id` - Delete a specific notification by ID

## Versions

Node.js: 20.x or higher
MongoDB: 6.x or higher
Redis: 6.x or higher

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or inquiries, please contact [pierreadelkamel@gmail.com](mailto:pierreadelkamel@gmail.com).
