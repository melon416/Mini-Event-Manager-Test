# Mini Event Manager - Backend

Backend RESTful API for the Mini Event Manager application, built with NestJS, PostgreSQL, and Prisma.

## Prerequisites

- Node.js (v20 or higher)
- PostgreSQL (v15 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/event_manager?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="24h"
PORT=5000
CORS_ORIGIN="http://localhost:3000"
```

**Important:** Update the `DATABASE_URL` with your PostgreSQL credentials.

### 3. Set Up Database

Make sure PostgreSQL is running, then run the Prisma migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 4. Run the Application

#### Development Mode

```bash
npm run start:dev
```

The API will be available at `http://localhost:5000`

#### Production Mode

```bash
npm run build
npm run start:prod
```

## Docker Setup (Alternative)

### Using Docker Compose

```bash
docker-compose up -d
```

This will:
- Start a PostgreSQL container
- Build and start the backend API container
- Automatically run database migrations

The API will be available at `http://localhost:5000`

### Using Docker Only

```bash
# Build the image
docker build -t event-manager-backend .

# Run the container (make sure PostgreSQL is running)
docker run -p 5000:5000 \
  -e DATABASE_URL="postgresql://user:password@host.docker.internal:5432/event_manager?schema=public" \
  -e JWT_SECRET="your-secret-key" \
  -e JWT_EXPIRES_IN="24h" \
  -e PORT="5000" \
  -e CORS_ORIGIN="http://localhost:3000" \
  event-manager-backend
```

## API Endpoints

### Events

- `POST /events` - Create a new event
- `GET /events` - Get all events
- `GET /events/:id` - Get a specific event by ID
- `PUT /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event

### Authentication

- `POST /auth/login` - User login
- `POST /api/register` - User registration

## API Documentation

### Create Event

**POST** `/events`

Request Body:
```json
{
  "name": "Tech Talk",
  "date": "2026-01-15T14:30:00",
  "description": "A talk about modern web development",
  "place": "Conference Room A"
}
```

Response (201 Created):
```json
{
  "id": 1,
  "name": "Tech Talk",
  "date": "2026-01-15T14:30:00",
  "description": "A talk about modern web development",
  "place": "Conference Room A",
  "createdAt": "2026-01-10T10:00:00.000Z",
  "updatedAt": "2026-01-10T10:00:00.000Z"
}
```

### Get All Events

**GET** `/events`

Response (200 OK):
```json
[
  {
    "id": 1,
    "name": "Tech Talk",
    "date": "2026-01-15T14:30:00",
    "description": "A talk about modern web development",
    "place": "Conference Room A",
    "createdAt": "2026-01-10T10:00:00.000Z",
    "updatedAt": "2026-01-10T10:00:00.000Z"
  }
]
```

### Get Event by ID

**GET** `/events/:id`

Response (200 OK):
```json
{
  "id": 1,
  "name": "Tech Talk",
  "date": "2026-01-15T14:30:00",
  "description": "A talk about modern web development",
  "place": "Conference Room A",
  "createdAt": "2026-01-10T10:00:00.000Z",
  "updatedAt": "2026-01-10T10:00:00.000Z"
}
```

Response (404 Not Found):
```json
{
  "statusCode": 404,
  "message": "Event with ID 1 not found",
  "error": "Not Found"
}
```

### Update Event

**PUT** `/events/:id`

Request Body (all fields optional):
```json
{
  "name": "Updated Tech Talk",
  "date": "2026-01-16T15:00:00",
  "description": "Updated description",
  "place": "Conference Room B"
}
```

Response (200 OK):
```json
{
  "id": 1,
  "name": "Updated Tech Talk",
  "date": "2026-01-16T15:00:00",
  "description": "Updated description",
  "place": "Conference Room B",
  "createdAt": "2026-01-10T10:00:00.000Z",
  "updatedAt": "2026-01-10T11:00:00.000Z"
}
```

### Delete Event

**DELETE** `/events/:id`

Response (200 OK):
```json
{
  "message": "Event deleted successfully"
}
```

### User Registration

**POST** `/api/register`

Request Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response (201 Created):
```json
{
  "message": "User registered successfully"
}
```

Response (400 Bad Request):
```json
{
  "statusCode": 400,
  "message": "User with this email already exists",
  "error": "Bad Request"
}
```

### User Login

**POST** `/auth/login`

Request Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200 OK):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Response (401 Unauthorized):
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

## Validation Rules

- **Event name**: Required, must be a string
- **Event date**: Required, must be in format `YYYY-MM-DDTHH:MM:SS` (e.g., `2026-01-15T14:30:00`)
- **Event description**: Optional string
- **Event place**: Optional string
- **User email**: Required, must be a valid email format
- **User password**: Required, minimum 6 characters

## Error Handling

The API returns appropriate HTTP status codes:
- `200 OK` - Successful request
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication failed
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

All errors include a JSON response with `statusCode`, `message`, and `error` fields.

## Database Management

### Prisma Studio (Database GUI)

```bash
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555` to view and edit your database.

### Create Migration

```bash
npm run prisma:migrate
```

### Reset Database

```bash
npx prisma migrate reset
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Project Structure

```
backend/
├── src/
│   ├── auth/           # Authentication module
│   ├── events/         # Events module
│   ├── prisma/         # Prisma service
│   ├── app.module.ts   # Root module
│   └── main.ts         # Application entry point
├── prisma/
│   └── schema.prisma   # Database schema
├── Dockerfile
├── docker-compose.yml
└── package.json
```

