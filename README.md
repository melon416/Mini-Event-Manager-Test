# Mini Event Manager POC

**Author:** James  
**Date:** 2026

This is a full-stack event management application developed as a proof of concept. The backend is a RESTful API built with NestJS, and the frontend is a desktop application built with Next.js.

## Project Structure

The repository contains two main folders:

```
Mini-Event-Manager-Test-/
├── backend/          # NestJS RESTful API
├── frontend/         # Next.js desktop application
└── README.md         # This file
```

---

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js** (version 20 or higher)
- **PostgreSQL** (version 15 or higher)
- **npm** (comes with Node.js)

You can verify your installations by running:
```bash
node --version
npm --version
psql --version
```

---

## How to Configure and Run the Backend

Follow these steps **exactly** to set up and run the backend:

### Step 1: Navigate to Backend Directory

Open a terminal and navigate to the backend folder:

```bash
cd backend
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

Wait for the installation to complete. This may take a few minutes.

### Step 3: Create Environment File

Create a file named `.env` in the `backend` directory with the following content:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/event_manager?schema=public"
JWT_SECRET="your-secret-key-change-in-production"
JWT_EXPIRES_IN="24h"
PORT=5000
CORS_ORIGIN="http://localhost:3000"
```

**Important:** 
- Replace `YOUR_PASSWORD` with your actual PostgreSQL password
- Replace `postgres` with your PostgreSQL username if different
- The database name `event_manager` will be created automatically in the next step

### Step 4: Create PostgreSQL Database

Make sure PostgreSQL is running on your system. Then create the database:

**Option A: Using psql command line:**
```bash
psql -U postgres
```

Then in the PostgreSQL prompt, run:
```sql
CREATE DATABASE event_manager;
\q
```

**Option B: Using pgAdmin:**
1. Open pgAdmin
2. Connect to your PostgreSQL server
3. Right-click on "Databases" → "Create" → "Database"
4. Name: `event_manager`
5. Click "Save"

### Step 5: Generate Prisma Client

Generate the Prisma client:

```bash
npx prisma generate
```

### Step 6: Run Database Migrations

Apply the database schema:

```bash
npx prisma migrate dev --name init
```

This will create all necessary tables in your database.

### Step 7: Start the Backend Server

Start the development server:

```bash
npm run start:dev
```

**Expected Output:**
You should see:
```
Application is running on: http://localhost:5000
```

The backend API is now running and ready to accept requests.

**To verify it's working:** Open `http://localhost:5000/events` in your browser. You should see an empty array `[]`.

---

## How to Configure and Run the Frontend Application

Follow these steps **exactly** to set up and run the frontend:

### Step 1: Navigate to Frontend Directory

Open a **new terminal window** (keep the backend running) and navigate to the frontend folder:

```bash
cd frontend
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

Wait for the installation to complete.

### Step 3: Create Environment File

Create a file named `.env.local` in the `frontend` directory with the following content:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Important:** 
- Make sure the backend is running before starting the frontend
- The URL `http://localhost:5000` must match where your backend is running

### Step 4: Start the Frontend Application

Start the development server:

```bash
npm run dev
```

**Expected Output:**
You should see:
```
▲ Next.js 14.1.0
- Local:        http://localhost:3000
✓ Ready in X.Xs
```

The frontend application is now running.

### Step 5: Access the Application

Open your web browser and navigate to:

```
http://localhost:3000
```

You should see the login page.

---

## Special Considerations

### Port Configuration

- **Backend API runs on port 5000** by default
- **Frontend runs on port 3000** by default

If port 5000 is already in use on your system:

1. Edit the `backend/.env` file
2. Change `PORT=5000` to an available port (e.g., `PORT=5001`)
3. Update `frontend/.env.local` to match: `NEXT_PUBLIC_API_URL=http://localhost:5001`
4. Restart both servers

### Database Connection

- The backend requires PostgreSQL to be running
- Default PostgreSQL port is 5432
- The database name `event_manager` must exist before running migrations
- If your PostgreSQL uses different credentials, update the `DATABASE_URL` in `backend/.env`

### CORS Configuration

- CORS is configured to allow requests from `http://localhost:3000`
- If you change the frontend port, update `CORS_ORIGIN` in `backend/.env`

### Running Order

**Important:** Always start the backend before the frontend:

1. Start backend first: `cd backend && npm run start:dev`
2. Wait for "Application is running on: http://localhost:5000"
3. Then start frontend: `cd frontend && npm run dev`

---

## Testing the Application

Once both servers are running:

1. **Register a new user:**
   - Go to `http://localhost:3000/register`
   - Fill in: Name, Email, Password (minimum 6 characters)
   - Click "Register"

2. **Login:**
   - Go to `http://localhost:3000/login`
   - Enter your email and password
   - Click "Login"
   - You will be redirected to the events list

3. **Create an event:**
   - Click the floating "+" button
   - Fill in event details:
     - Name (required)
     - Date (required, use the date picker)
     - Description (optional)
     - Place (optional)
   - Click "Create Event"

4. **View events:**
   - The events list shows all events
   - Click on any event to view details

5. **Edit an event:**
   - Click on an event to view details
   - Click "Edit" button
   - Modify the fields
   - Click "Update Event"

6. **Delete an event:**
   - Click on an event to view details
   - Click "Delete" button
   - Confirm deletion

---

## API Endpoints

The backend provides the following RESTful endpoints:

### Events
- `POST /events` - Create a new event
- `GET /events` - Get all events
- `GET /events/:id` - Get a specific event by ID
- `PUT /events/:id` - Update an event
- `DELETE /events/:id` - Delete an event

### Authentication
- `POST /api/register` - Register a new user
- `POST /auth/login` - Login and receive JWT token

All endpoints return JSON responses with appropriate HTTP status codes.

---

## Troubleshooting

### Backend Issues

**Problem:** "Environment variable not found: DATABASE_URL"
- **Solution:** Make sure you created the `.env` file in the `backend` directory with the exact content shown above

**Problem:** "Error: connect ECONNREFUSED"
- **Solution:** Verify PostgreSQL is running and the DATABASE_URL in `.env` is correct

**Problem:** "Port 5000 already in use"
- **Solution:** Change the PORT in `backend/.env` to an available port and update `frontend/.env.local` accordingly

**Problem:** Migration errors
- **Solution:** Make sure the `event_manager` database exists in PostgreSQL before running migrations

### Frontend Issues

**Problem:** "Module not found" errors
- **Solution:** Run `npm install` again in the `frontend` directory

**Problem:** "Failed to fetch" or API connection errors
- **Solution:** 
  1. Verify the backend is running on port 5000
  2. Check that `NEXT_PUBLIC_API_URL` in `frontend/.env.local` matches the backend URL
  3. Verify CORS_ORIGIN in `backend/.env` matches the frontend URL

**Problem:** Blank page or errors
- **Solution:** Clear browser cache and localStorage, then refresh

---

## Technology Stack

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (Passport.js)
- **Validation:** class-validator

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **HTTP Client:** Axios
- **State Management:** React Hooks
- **Styling:** CSS

---

## Project Structure

### Backend Structure
```
backend/
├── src/
│   ├── auth/              # Authentication module
│   ├── events/            # Events CRUD module
│   ├── prisma/            # Prisma service
│   ├── app.module.ts      # Root module
│   └── main.ts            # Application entry point
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── migrations/        # Database migrations
├── Dockerfile             # Docker configuration
├── docker-compose.yml     # Docker Compose configuration
└── package.json           # Dependencies
```

### Frontend Structure
```
frontend/
├── src/
│   ├── app/
│   │   ├── events/        # Event pages (list, detail, edit, new)
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Home page (redirects)
│   └── lib/
│       └── api.ts         # API client configuration
└── package.json           # Dependencies
```

---

## Additional Notes

- The application uses JWT tokens for authentication, stored in browser localStorage
- All dates must be in format: `YYYY-MM-DDTHH:MM:SS` (e.g., `2026-01-15T14:30:00`)
- Event name and date are required fields; description and place are optional
- User passwords must be at least 6 characters long
- The application includes proper error handling and validation

---

## Contact

If you encounter any issues during setup, please verify:
1. All prerequisites are installed
2. PostgreSQL is running
3. All environment files are created correctly
4. Both servers are started in the correct order

---

**End of README**
