import { useInView } from '../hooks/useInView';
import PartnersBar from './PartnersBar';

const INSTAGRAM_URL = 'https://www.instagram.com/mosquilab.univille/';

export default function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="contato"
      className="py-24 px-6"
      style={{ background: 'linear-gradient(180deg, #1a5c2a 0%, #0d3318 100%)' }}
    >
      <div className="max-w-4xl mx-auto">
        <div ref={ref} className={`text-center ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {/* Label */}
          <span
            className="inline-block font-bebas tracking-widest text-base px-5 py-2 rounded-full mb-6"
            style={{ background: '#6abf3e', color: '#fff' }}
          >
            Fale com a gente
          </span>

          <h2
            className="font-bebas text-white leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Agende uma visita
          </h2>

          <p className="font-body text-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Siga-nos no Instagram e entre em contato para agendar uma visita educativa na sua escola ou comunidade.
          </p>

          {/* Instagram CTA */}
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 font-body font-700 text-white rounded-2xl px-10 py-5 text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl mb-6"
            style={{ background: 'linear-gradient(135deg, #e87722 0%, #c95f0e 100%)' }}
          >ENTRE EM CONTATO
          </a>

          <p className="font-body text-white/40 text-sm">
            Nosso atendimento é feito exclusivamente pelo Instagram.
          </p>
        </div>

        {/* Partners */}
        <div className={`mt-20 ${inView ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <PartnersBar />
        </div>
      </div>
    </section>
  );
}
