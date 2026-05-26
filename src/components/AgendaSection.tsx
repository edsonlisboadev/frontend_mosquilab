import { useEffect, useState } from 'react';
import { fetchPublicAgenda, type Event } from '../services/api';
import { useInView } from '../hooks/useInView';

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

function formatTime(timeStr: string): string {
  return timeStr.slice(0, 5);
}

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  'Palestra':   { bg: '#1a4f8a', text: '#fff' },
  'Oficina':    { bg: '#7b2d8b', text: '#fff' },
  'Visita':     { bg: '#3aada8', text: '#fff' },
  'Workshop':   { bg: '#e87722', text: '#fff' },
  'Evento':     { bg: '#1a5c2a', text: '#fff' },
};

function getTypeStyle(type: string) {
  return TYPE_COLORS[type] || { bg: '#6abf3e', text: '#fff' };
}

function EventCard({ event, delay }: { event: Event; delay: string }) {
  const style = getTypeStyle(event.event_type);

  return (
    <div
      className={`animate-fade-in-up ${delay} rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300`}
      style={{ background: '#fff', border: '1.5px solid #6abf3e20' }}
    >
      {/* Date stripe */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ background: 'linear-gradient(90deg, #1a5c2a, #2d7a3a)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center bg-white/10 rounded-xl px-3 py-2">
            <span className="font-bebas text-white text-2xl leading-none">
              {event.event_date.split('-')[2]}
            </span>
            <span className="font-body text-white/70 text-xs uppercase">
              {['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][parseInt(event.event_date.split('-')[1]) - 1]}
            </span>
          </div>
          <div>
            <div className="font-bebas text-white text-xl tracking-wide leading-none">
              {formatDate(event.event_date)}
            </div>
            <div className="font-body text-white/70 text-sm flex items-center gap-1 mt-0.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {formatTime(event.event_time)}
            </div>
          </div>
        </div>

        {/* Type badge */}
        <span
          className="font-bebas text-sm px-3 py-1.5 rounded-full tracking-wider"
          style={{ background: style.bg, color: style.text }}
        >
          {event.event_type || 'Evento'}
        </span>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <h3 className="font-bebas text-green-dark text-xl tracking-wide leading-tight mb-2">
          {event.title}
        </h3>

        {event.location && (
          <div className="flex items-center gap-2 mb-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6abf3e" strokeWidth="2" strokeLinecap="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span className="font-body text-green-dark/60 text-sm">{event.location}</span>
          </div>
        )}

        {event.description && (
          <p className="font-body text-green-dark/70 text-sm leading-relaxed line-clamp-3">
            {event.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AgendaSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    fetchPublicAgenda()
      .then(setEvents)
      .catch(() => setError('Não foi possível carregar a agenda.'))
      .finally(() => setLoading(false));
  }, []);

  const delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];

  return (
    <section id="agenda" className="py-24 px-6" style={{ background: 'var(--sand)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div ref={ref} className={`text-center mb-16 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span
            className="inline-block font-bebas tracking-widest text-base px-5 py-2 rounded-full mb-4"
            style={{ background: '#6abf3e', color: '#fff' }}
          >
            Calendário MosquiLab
          </span>
          <h2
            className="font-bebas text-green-dark leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Próximos Eventos
          </h2>
          <p className="font-body text-green-dark/60 mt-3 text-lg">
            Confira onde estaremos e agende uma visita para sua escola ou comunidade.
          </p>
        </div>

        {/* States */}
        {loading && (
          <div className="flex justify-center items-center py-24">
            <div className="flex gap-3">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full bg-green-light animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div
            className="text-center py-16 rounded-3xl"
            style={{ background: '#fff', border: '1.5px solid #d32f2f20' }}
          >
            <span className="text-4xl mb-4 block">⚠️</span>
            <p className="font-body text-red-brand font-700">{error}</p>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div
            className="text-center py-20 rounded-3xl"
            style={{ background: '#fff', border: '1.5px solid #6abf3e20' }}
          >
            <span className="text-6xl mb-4 block">📅</span>
            <h3 className="font-bebas text-green-dark text-2xl tracking-wide mb-2">
              Nenhum evento agendado no momento
            </h3>
            <p className="font-body text-green-dark/60">
              Entre em contato via Instagram para solicitar uma visita.
            </p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => (
              <EventCard
                key={event.id}
                event={event}
                delay={delays[i % delays.length]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
