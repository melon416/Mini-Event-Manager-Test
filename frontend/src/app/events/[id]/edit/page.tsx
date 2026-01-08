'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { eventApi, Event } from '@/lib/api';

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  const [event, setEvent] = useState<Event | null>(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [place, setPlace] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(true);

  useEffect(() => {
    loadEvent();
  }, [id]);

  const loadEvent = async () => {
    try {
      setLoadingEvent(true);
      const data = await eventApi.getById(id);
      setEvent(data);
      setName(data.name);
      setDate(formatDateForInput(data.date));
      setDescription(data.description || '');
      setPlace(data.place || '');
    } catch (err: any) {
      if (err.response?.status === 404) {
        setErrors({ submit: 'Event not found.' });
      } else {
        setErrors({ submit: 'Failed to load event. Please try again.' });
      }
      console.error(err);
    } finally {
      setLoadingEvent(false);
    }
  };

  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch {
      return dateString;
    }
  };

  const formatDateForApi = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    } catch {
      return dateString;
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!date.trim()) {
      newErrors.date = 'Date is required';
    } else {
      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
      if (!dateRegex.test(date)) {
        newErrors.date = 'Date must be in format YYYY-MM-DDTHH:MM';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const formattedDate = formatDateForApi(date);
      await eventApi.update(id, {
        name: name.trim(),
        date: formattedDate,
        description: description.trim() || undefined,
        place: place.trim() || undefined,
      });
      router.push('/events');
    } catch (err: any) {
      if (err.response?.status === 404) {
        setErrors({ submit: 'Event not found.' });
      } else {
        const errorMessage =
          err.response?.data?.message || 'Failed to update event. Please try again.';
        setErrors({ submit: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingEvent) {
    return (
      <div className="container">
        <div className="loading">
          <p>Loading event...</p>
        </div>
      </div>
    );
  }

  if (errors.submit && !event) {
    return (
      <div className="container">
        <div className="error-message">{errors.submit}</div>
        <button
          className="btn btn-secondary"
          onClick={() => router.push('/events')}
          style={{ marginTop: '20px' }}
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <button
        className="btn btn-secondary"
        onClick={() => router.push(`/events/${id}`)}
        style={{ marginBottom: '20px' }}
      >
        ← Back to Event
      </button>

      <div className="form-container">
        <h1>Edit Event</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">
              Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="date">
              Date <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="datetime-local"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              disabled={loading}
            />
            {errors.date && <div className="error-message">{errors.date}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="place">Place</label>
            <input
              type="text"
              id="place"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              disabled={loading}
            />
          </div>

          {errors.submit && (
            <div className="error-message">{errors.submit}</div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Event'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => router.push(`/events/${id}`)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

