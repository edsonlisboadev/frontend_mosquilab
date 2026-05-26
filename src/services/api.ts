const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  event_date: string;
  event_time: string;
  event_type: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  token: string;
}

// Public
export async function fetchPublicAgenda(): Promise<Event[]> {
  const res = await fetch(`${BASE_URL}/api/agenda`);
  if (!res.ok) throw new Error('Erro ao buscar agenda');
  return res.json();
}

// Auth
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Credenciais inválidas');
  return res.json();
}

// Admin CRUD
function authHeaders(): HeadersInit {
  const token = localStorage.getItem('jwt');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export async function fetchAdminAgenda(): Promise<Event[]> {
  const res = await fetch(`${BASE_URL}/api/admin/agenda`, {
    headers: authHeaders(),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Sem autorização');
  return res.json();
}

export async function createEvent(data: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
  const res = await fetch(`${BASE_URL}/api/admin/agenda`, {
    method: 'POST',
    headers: authHeaders(),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao criar evento');
  return res.json();
}

export async function updateEvent(id: number, data: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<Event> {
  const res = await fetch(`${BASE_URL}/api/admin/agenda/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    credentials: 'include',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Erro ao atualizar evento');
  return res.json();
}

export async function deleteEvent(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/admin/agenda/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
    credentials: 'include',
  });
  if (!res.ok) throw new Error('Erro ao excluir evento');
}
