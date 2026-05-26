import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchAdminAgenda,
  createEvent,
  updateEvent,
  deleteEvent,
  type Event,
} from '../services/api';
import Logo from '../components/Logo';
import EventModal from '../components/EventModal';

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

const TYPE_COLORS: Record<string, string> = {
  'Palestra': '#1a4f8a',
  'Oficina':  '#7b2d8b',
  'Visita':   '#3aada8',
  'Workshop': '#e87722',
  'Evento':   '#1a5c2a',
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Auth guard
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) navigate('/admin/login');
  }, [navigate]);

  async function loadEvents() {
    setLoading(true);
    try {
      const data = await fetchAdminAgenda();
      setEvents(data);
    } catch {
      navigate('/admin/login');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadEvents(); }, []);

  function showToast(msg: string, ok: boolean) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    navigate('/admin/login');
  }

  function openCreate() { setEditingEvent(null); setModalOpen(true); }
  function openEdit(ev: Event) { setEditingEvent(ev); setModalOpen(true); }

  async function handleSave(data: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    if (editingEvent) {
      await updateEvent(editingEvent.id, data);
      showToast('Evento atualizado com sucesso!', true);
    } else {
      await createEvent(data);
      showToast('Evento criado com sucesso!', true);
    }
    await loadEvents();
  }

  async function confirmDelete() {
    if (!deleteId) return;
    try {
      await deleteEvent(deleteId);
      showToast('Evento excluído.', true);
      setDeleteId(null);
      await loadEvents();
    } catch {
      showToast('Erro ao excluir evento.', false);
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#f0ead6' }}>
      {/* Navbar */}
      <nav
        className="sticky top-0 z-40 flex items-center justify-between px-8 py-4 shadow-lg"
        style={{ background: '#1a5c2a' }}
      >
        <Logo size={36} dark={false} />
        <div className="flex items-center gap-4">
          <span className="font-bebas text-white/60 tracking-widest text-sm hidden md:block">
            Painel Administrativo
          </span>
          <button
            onClick={handleLogout}
            className="font-bebas tracking-widest text-sm text-white border border-white/30 rounded-xl px-5 py-2 hover:bg-white/10 transition-all"
          >
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-bebas text-green-dark text-4xl tracking-wide leading-none">
              Gestão da Agenda
            </h1>
            <p className="font-body text-green-dark/60 mt-1 text-sm">
              {events.length} evento{events.length !== 1 ? 's' : ''} cadastrado{events.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 font-bebas tracking-widest text-lg text-white rounded-2xl px-7 py-3 transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background: 'linear-gradient(135deg, #6abf3e, #1a5c2a)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Novo Evento
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-24">
            <div className="flex gap-3">
              {[0,1,2].map(i => (
                <div key={i} className="w-3 h-3 rounded-full bg-green-light animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />
              ))}
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-24 rounded-3xl bg-white shadow-md">
            <span className="text-6xl mb-4 block">📅</span>
            <p className="font-bebas text-green-dark text-2xl tracking-wide">Nenhum evento cadastrado</p>
            <p className="font-body text-green-dark/50 mt-2">Crie o primeiro evento clicando em "Novo Evento".</p>
          </div>
        ) : (
          <div className="rounded-3xl overflow-hidden shadow-lg bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ background: '#1a5c2a' }}>
                    {['Título', 'Data', 'Horário', 'Local', 'Tipo', 'Ações'].map(h => (
                      <th key={h} className="font-bebas text-white tracking-widest text-sm text-left px-5 py-4">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {events.map((ev, i) => (
                    <tr
                      key={ev.id}
                      className="border-b hover:bg-sand/50 transition-colors"
                      style={{ borderColor: '#6abf3e10', background: i % 2 === 0 ? '#fff' : '#f9f7f2' }}
                    >
                      <td className="px-5 py-4">
                        <span className="font-body font-700 text-green-dark text-sm">{ev.title}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-body text-green-dark/70 text-sm">{formatDate(ev.event_date)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-body text-green-dark/70 text-sm">{ev.event_time?.slice(0,5)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-body text-green-dark/60 text-sm max-w-[160px] truncate block">{ev.location || '—'}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className="font-bebas text-xs px-3 py-1 rounded-full tracking-wider"
                          style={{ background: TYPE_COLORS[ev.event_type] || '#6abf3e', color: '#fff' }}
                        >
                          {ev.event_type || 'Evento'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(ev)}
                            className="font-body text-xs font-700 px-3 py-1.5 rounded-xl transition-all hover:shadow"
                            style={{ background: '#1a5c2a15', color: '#1a5c2a' }}
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => setDeleteId(ev.id)}
                            className="font-body text-xs font-700 px-3 py-1.5 rounded-xl transition-all hover:shadow"
                            style={{ background: '#d32f2f15', color: '#d32f2f' }}
                          >
                            Excluir
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Event Modal */}
      {modalOpen && (
        <EventModal
          event={editingEvent}
          onSave={handleSave}
          onClose={() => setModalOpen(false)}
        />
      )}

      {/* Delete confirm modal */}
      {deleteId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl p-8 bg-white shadow-2xl animate-fade-in-up text-center">
            <span className="text-5xl block mb-4">🗑️</span>
            <h3 className="font-bebas text-green-dark text-2xl tracking-wide mb-2">Excluir evento?</h3>
            <p className="font-body text-green-dark/60 text-sm mb-6">Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 font-bebas text-lg rounded-xl py-3 border transition-all"
                style={{ borderColor: '#1a5c2a30', color: '#1a5c2a' }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 font-bebas text-lg text-white rounded-xl py-3 transition-all hover:opacity-90"
                style={{ background: '#d32f2f' }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl font-body text-white font-700 animate-fade-in-up"
          style={{ background: toast.ok ? '#1a5c2a' : '#d32f2f' }}
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
