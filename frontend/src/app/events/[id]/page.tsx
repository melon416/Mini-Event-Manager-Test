'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { eventApi, Event } from '@/lib/api';

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      const data = await eventApi.getById(id);
      setEvent(data);
      setError('');
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Event not found.');
      } else {
        setError('Failed to load event. Please try again.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await eventApi.delete(id);
      router.push('/events');
    } catch (err: any) {
      alert('Failed to delete event. Please try again.');
      console.error(err);
    }
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
          <p>Loading event...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container">
        <div className="error-message">{error || 'Event not found'}</div>
        <button className="btn btn-secondary" onClick={() => router.push('/events')} style={{ marginTop: '20px' }}>
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button
        className="btn btn-secondary"
        onClick={() => router.push('/events')}
        style={{ marginBottom: '20px' }}
      >
        ← Back to Events
      </button>

      <div className="event-detail">
        <h1>{event.name}</h1>

        <div className="detail-row">
          <div className="detail-label">Date</div>
          <div className="detail-value">{formatDate(event.date)}</div>
        </div>

        {event.place && (
          <div className="detail-row">
            <div className="detail-label">Place</div>
            <div className="detail-value">{event.place}</div>
          </div>
        )}

        {event.description && (
          <div className="detail-row">
            <div className="detail-label">Description</div>
            <div className="detail-value">{event.description}</div>
          </div>
        )}

        <div className="event-actions">
          <button
            className="btn btn-primary"
            onClick={() => router.push(`/events/${id}/edit`)}
          >
            Edit
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

