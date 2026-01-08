# Mini Event Manager POC

Created by: Architects Team @ lexart.tech ~ 2026

A full-stack event management application with a NestJS backend RESTful API and a Next.js frontend desktop application.

## Project Structure

```
Mini-Event-Manager-Test-/
├── backend/          # NestJS RESTful API
├── frontend/         # Next.js desktop application
└── README.md         # This file
```

## Quick Start

### Prerequisites

- Node.js (v20 or higher)
- PostgreSQL (v15 or higher)
- npm or yarn
- Docker (optional, for containerized setup)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following content:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/event_manager?schema=public"
   JWT_SECRET="your-secret-key-change-in-production"
   JWT_EXPIRES_IN="24h"
   PORT=5000
   CORS_ORIGIN="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Start the backend server:
   ```bash
   npm run start:dev
   ```

   The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the frontend application:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Docker Setup (Alternative)

### Backend with Docker Compose

From the `backend` directory:

```bash
docker-compose up -d
```

This will:
- Start a PostgreSQL container
- Build and start the backend API container
- Automatically run database migrations

The API will be available at `http://localhost:5000`

## Application Features

### Backend API

- **Events Management**: CRUD operations for events
  - `POST /events` - Create event
  - `GET /events` - List all events
  - `GET /events/:id` - Get event by ID
  - `PUT /events/:id` - Update event
  - `DELETE /events/:id` - Delete event

- **Authentication**:
  - `POST /auth/login` - User login
  - `POST /api/register` - User registration

- **Features**:
  - PostgreSQL database with Prisma ORM
  - JWT authentication
  - Input validation
  - Error handling
  - CORS configuration
  - Docker support

### Frontend Application

- **Screens**:
  - Login screen
  - Registration screen
  - Event list screen
  - Event detail screen
  - Add/Edit event screen

- **Features**:
  - State management with React hooks
  - Loading states
  - Error handling
  - Form validation
  - JWT token management
  - Responsive UI

## API Documentation

### Create Event

**POST** `/events`

Request:
```json
{
  "name": "Tech Talk",
  "date": "2026-01-15T14:30:00",
  "description": "A talk about modern web development",
  "place": "Conference Room A"
}
```

Response (201):
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

Response (200):
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

Response (200):
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

### Update Event

**PUT** `/events/:id`

Request:
```json
{
  "name": "Updated Tech Talk",
  "date": "2026-01-16T15:00:00",
  "description": "Updated description",
  "place": "Conference Room B"
}
```

### Delete Event

**DELETE** `/events/:id`

Response (200):
```json
{
  "message": "Event deleted successfully"
}
```

### User Registration

**POST** `/api/register`

Request:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response (201):
```json
{
  "message": "User registered successfully"
}
```

### User Login

**POST** `/auth/login`

Request:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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

## Testing the Application

1. **Start the backend** (from `backend` directory):
   ```bash
   npm run start:dev
   ```

2. **Start the frontend** (from `frontend` directory):
   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Open `http://localhost:3000` in your browser
   - Register a new user
   - Login with your credentials
   - Create, view, edit, and delete events

## Technology Stack

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (Passport)
- **Validation**: class-validator, class-transformer

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **HTTP Client**: Axios
- **State Management**: React Hooks
- **Styling**: CSS

## Project Structure Details

### Backend
```
backend/
├── src/
│   ├── auth/              # Authentication module
│   ├── events/            # Events module
│   ├── prisma/            # Prisma service
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── prisma/
│   └── schema.prisma      # Database schema
├── Dockerfile
├── docker-compose.yml
└── package.json
```

### Frontend
```
frontend/
├── src/
│   ├── app/
│   │   ├── events/        # Event pages
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   └── layout.tsx     # Root layout
│   └── lib/
│       └── api.ts         # API client
└── package.json
```

## Troubleshooting

### Backend Issues

- **Database connection errors**: Verify PostgreSQL is running and DATABASE_URL is correct
- **Port already in use**: Change PORT in `.env` file
- **Migration errors**: Run `npx prisma migrate reset` (WARNING: deletes all data)

### Frontend Issues

- **API connection errors**: Verify backend is running and NEXT_PUBLIC_API_URL is correct
- **CORS errors**: Check CORS_ORIGIN in backend `.env` matches frontend URL
- **Authentication issues**: Clear browser localStorage

## Additional Resources

- [Backend README](./backend/README.md) - Detailed backend documentation
- [Frontend README](./frontend/README.md) - Detailed frontend documentation

## License

MIT

