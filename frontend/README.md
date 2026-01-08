# Mini Event Manager - Frontend

Frontend desktop application for the Mini Event Manager, built with Next.js, TypeScript, and React.

## Prerequisites

- Node.js (v20 or higher)
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the `frontend` directory with the following content:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**Important:** Make sure the backend API is running and accessible at the URL specified in `NEXT_PUBLIC_API_URL`.

### 3. Run the Application

#### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

#### Production Mode

```bash
npm run build
npm run start
```

The application will be available at `http://localhost:3000`

## Application Screens

### Login Screen (`/login`)

- Email and Password fields
- Login button
- Link to registration page

### Registration Screen (`/register`)

- Name, Email, and Password fields
- Register button
- Link to login page

### Event List Screen (`/events`)

- Displays all events from the API
- Shows event name and date for each event
- Floating button (+) to create new event
- Click on an event to view details
- Logout button

### Event Detail Screen (`/events/[id]`)

- Displays all event details
- Edit button (navigates to edit screen)
- Delete button (deletes event and returns to list)
- Back button to return to event list

### Add/Edit Event Screen (`/events/new` and `/events/[id]/edit`)

- Form with fields:
  - Name (required)
  - Date (required, datetime picker)
  - Description (optional)
  - Place (optional)
- Save button
- Cancel button
- Form validation for required fields

## Features

- **State Management**: React hooks (useState, useEffect) for managing component state
- **Loading States**: Loading indicators during API calls
- **Error Handling**: User-friendly error messages for API failures
- **Form Validation**: Client-side validation for required fields
- **Authentication**: JWT token stored in localStorage
- **Responsive Design**: Clean and modern UI with CSS styling

## API Integration

The frontend uses Axios to communicate with the backend API. All API calls are centralized in `src/lib/api.ts`.

### API Endpoints Used

- `GET /events` - Get all events
- `GET /events/:id` - Get event by ID
- `POST /events` - Create new event
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event
- `POST /auth/login` - User login
- `POST /api/register` - User registration

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── events/          # Event-related pages
│   │   │   ├── [id]/        # Dynamic route for event detail/edit
│   │   │   └── new/         # Create new event page
│   │   ├── login/           # Login page
│   │   ├── register/        # Registration page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page (redirects)
│   │   └── globals.css      # Global styles
│   └── lib/
│       └── api.ts           # API client and types
├── .env.local               # Environment variables (create this)
└── package.json
```

## Development

### Running in Development Mode

```bash
npm run dev
```

The application will hot-reload on file changes.

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next` directory.

### Linting

```bash
npm run lint
```

## Troubleshooting

### API Connection Issues

- Ensure the backend is running on the port specified in `NEXT_PUBLIC_API_URL`
- Check CORS configuration in the backend
- Verify the API URL is correct in `.env.local`

### Authentication Issues

- Clear localStorage if experiencing token issues
- Ensure the backend JWT_SECRET is configured
- Check browser console for error messages

### Date Format Issues

- The date picker uses `datetime-local` input type
- Dates are converted to `YYYY-MM-DDTHH:MM:SS` format for the API
- Ensure your browser supports `datetime-local` input type

