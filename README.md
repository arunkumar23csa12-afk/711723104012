# React Logging Middleware

A React application with a reusable logging middleware that sends structured logs to a Test Server API.

## Overview

This project demonstrates:
- ✅ Reusable `Log()` function for consistent logging
- ✅ Input validation with allowed values for `stack`, `level`, and `package`
- ✅ JWT authentication with Bearer token
- ✅ Structured logging with descriptive context
- ✅ Built with React + Vite

## Features

### Log Function
The `Log()` function sends logs to the evaluation service with the following structure:

```javascript
Log(stack, level, packageName, message, token)
```

**Parameters:**
- `stack` (string): `frontend` or `backend`
- `level` (string): `debug`, `info`, `warning`, `error`, or `fatal`
- `packageName` (string): `api`, `hook`, `page`, `state`, or `style`
- `message` (string): Descriptive log message
- `token` (string): JWT Bearer token for authentication

**Response:**
```json
{
  "logid": "unique-log-id",
  "message": "Log entry created successfully"
}
```

### Example Usage

```javascript
import { Log } from "./loggingmiddleware";

// Authenticate first
const authResponse = await fetch("http://4.224.186.213/evaluation-service/auth", {
  method: "POST",
  body: JSON.stringify({
    email: "your-email@example.com",
    name: "Your Name",
    rollNo: "your-roll-number",
    accessCode: "your-access-code",
    clientId: "your-client-id",
    clientSecret: "your-client-secret"
  })
});

const { access_token } = await authResponse.json();

// Send a log
const logResponse = await Log(
  "frontend",
  "error",
  "handler",
  "received string, expected bool",
  access_token
);

console.log(logResponse);
// Output: { logid: "...", message: "..." }
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/arunkumar23csa12-afk/711723104012.git
cd 711723104012
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5174/
```

## Project Structure

```
src/
├── App.jsx                    # Main app component with Send Log button
├── loggingmiddleware.jsx     # Logging middleware with validation
├── main.jsx                  # Entry point
├── App.css                   # App styles
└── index.css                 # Global styles
```

## API Endpoints

### Authentication
- **URL**: `http://4.224.186.213/evaluation-service/auth`
- **Method**: POST
- **Body**: JSON with credentials
- **Returns**: `{ access_token: "..." }`

### Logging
- **URL**: `http://4.224.186.213/evaluation-service/logs`
- **Method**: POST
- **Headers**: 
  - `Authorization: Bearer {token}`
  - `Content-Type: application/json`
- **Body**: `{ stack, level, package, message }`
- **Returns**: `{ logid: "...", message: "..." }`

## Validation Rules

The logging middleware enforces strict validation:

| Parameter | Allowed Values | Validation |
|-----------|----------------|-----------|
| stack | `frontend`, `backend` | Lowercase, must match |
| level | `debug`, `info`, `warning`, `error`, `fatal` | Lowercase, must match |
| package | `api`, `hook`, `page`, `state`, `style` | Lowercase, must match |
| message | Any string | Non-empty, required |

## Build

To build for production:
```bash
npm run build
```

## Technology Stack

- **React**: UI library
- **Vite**: Build tool and dev server
- **JavaScript (ES6+)**: Programming language

## Author

Arun Kumar P  
Roll No: 711723104012  
Email: arunkumar_23csa12@kgkite.ac.in

## License
