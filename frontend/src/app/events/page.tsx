'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { eventApi, Event } from '@/lib/api';

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventApi.getAll();
      setEvents(data);
      setError('');
    } catch (err: any) {
      setError('Failed to load events. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>Events</h1>
        <button className="btn btn-secondary" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {events.length === 0 ? (
        <div className="card">
          <p>No events found. Create your first event!</p>
        </div>
      ) : (
        <ul className="event-list">
          {events.map((event) => (
            <li
              key={event.id}
              className="event-item"
              onClick={() => router.push(`/events/${event.id}`)}
            >
              <h3>{event.name}</h3>
              <p>
                <strong>Date:</strong> {formatDate(event.date)}
              </p>
              {event.place && (
                <p>
                  <strong>Place:</strong> {event.place}
                </p>
              )}
              {event.description && (
                <p>
                  <strong>Description:</strong> {event.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}

      <button
        className="floating-button"
        onClick={() => router.push('/events/new')}
        title="Create New Event"
      >
        +
      </button>
    </div>
  );
}

