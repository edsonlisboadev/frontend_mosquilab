import { useState, useEffect } from 'react';
import { type Event } from '../services/api';

interface EventFormData {
  title: string;
  description: string;
  location: string;
  event_date: string;
  event_time: string;
  event_type: string;
}

const EMPTY: EventFormData = {
  title: '',
  description: '',
  location: '',
  event_date: '',
  event_time: '',
  event_type: 'Evento',
};

const EVENT_TYPES = ['Evento', 'Palestra', 'Oficina', 'Visita', 'Workshop'];

interface Props {
  event?: Event | null;
  onSave: (data: EventFormData) => Promise<void>;
  onClose: () => void;
}

export default function EventModal({ event, onSave, onClose }: Props) {
  const [form, setForm] = useState<EventFormData>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (event) {
      setForm({
        title: event.title,
        description: event.description || '',
        location: event.location || '',
        event_date: event.event_date,
        event_time: event.event_time.slice(0, 5),
        event_type: event.event_type || 'Evento',
      });
    } else {
      setForm(EMPTY);
    }
  }, [event]);

  function set(field: keyof EventFormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar evento');
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full font-body rounded-xl px-4 py-3 text-green-dark outline-none transition-all focus:ring-2 focus:ring-green-light";
  const inputStyle = { background: '#f0ead6', border: '1.5px solid #6abf3e30', fontSize: '14px' };
  const labelClass = "font-body font-700 text-green-dark text-sm block mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up"
        style={{ background: '#fff', maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div
          className="px-8 py-6 flex items-center justify-between"
          style={{ background: 'linear-gradient(90deg, #1a5c2a, #2d7a3a)' }}
        >
          <h2 className="font-bebas text-white text-2xl tracking-widest">
            {event ? 'Editar Evento' : 'Novo Evento'}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
          <div>
            <label className={labelClass}>Título *</label>
            <input
              required
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Ex.: Palestra sobre Dengue"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Data *</label>
              <input
                required
                type="date"
                value={form.event_date}
                onChange={e => set('event_date', e.target.value)}
                className={inputClass}
                style={inputStyle}
              />
            </div>
            <div>
              <label className={labelClass}>Horário *</label>
              <input
                required
                type="time"
                value={form.event_time}
                onChange={e => set('event_time', e.target.value)}
                className={inputClass}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Local</label>
            <input
              type="text"
              value={form.location}
              onChange={e => set('location', e.target.value)}
              placeholder="Ex.: Escola Municipal Barão do Rio Branco"
              className={inputClass}
              style={inputStyle}
            />
          </div>

          <div>
            <label className={labelClass}>Tipo de evento</label>
            <select
              value={form.event_type}
              onChange={e => set('event_type', e.target.value)}
              className={inputClass}
              style={inputStyle}
            >
              {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClass}>Descrição</label>
            <textarea
              value={form.description}
              onChange={e => set('description', e.target.value)}
              placeholder="Descreva brevemente o evento..."
              rows={3}
              className={inputClass + ' resize-none'}
              style={inputStyle}
            />
          </div>

          {error && (
            <div
              className="rounded-xl px-4 py-3 font-body text-sm"
              style={{ background: '#d32f2f10', color: '#d32f2f', border: '1px solid #d32f2f30' }}
            >
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 font-bebas tracking-widest text-lg rounded-xl py-3 transition-all hover:bg-sand"
              style={{ border: '1.5px solid #1a5c2a30', color: '#1a5c2a' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 font-bebas tracking-widest text-lg text-white rounded-xl py-3 transition-all hover:opacity-90 disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #1a5c2a, #2d7a3a)' }}
            >
              {saving ? 'Salvando...' : event ? 'Salvar' : 'Criar Evento'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
