import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface Event {
  id: number;
  name: string;
  date: string;
  description?: string;
  place?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventDto {
  name: string;
  date: string;
  description?: string;
  place?: string;
}

export interface UpdateEventDto {
  name?: string;
  date?: string;
  description?: string;
  place?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export const eventApi = {
  getAll: async (): Promise<Event[]> => {
    const response = await api.get<Event[]>('/events');
    return response.data;
  },

  getById: async (id: number): Promise<Event> => {
    const response = await api.get<Event>(`/events/${id}`);
    return response.data;
  },

  create: async (data: CreateEventDto): Promise<Event> => {
    const response = await api.post<Event>('/events', data);
    return response.data;
  },

  update: async (id: number, data: UpdateEventDto): Promise<Event> => {
    const response = await api.put<Event>(`/events/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/events/${id}`);
  },
};

export const authApi = {
  login: async (data: LoginDto): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterDto): Promise<{ message: string }> => {
    const response = await api.post<{ message: string }>('/api/register', data);
    return response.data;
  },
};

export default api;

