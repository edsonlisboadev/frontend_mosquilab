import { useInView } from '../hooks/useInView';

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="sobre"
      className="py-24 px-6"
      style={{ background: 'var(--sand)' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div ref={ref} className={`text-center mb-16 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span
            className="inline-block font-bebas tracking-widest text-base px-5 py-2 rounded-full mb-4"
            style={{ background: '#6abf3e', color: '#fff' }}
          >
            Conheça o MosquiLab
          </span>
          <h2
            className="font-bebas text-green-dark leading-none"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Ciência a serviço da saúde pública
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1 — Sobre o Projeto */}
          <div
            className={`rounded-3xl p-8 shadow-xl transition-all duration-700 ${inView ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}
            style={{ background: '#fff', border: '2px solid #6abf3e20' }}
          >
            {/* Label pill */}
            <div className="mb-6 inline-flex items-center gap-2">
              <span
                className="font-bebas tracking-widest text-sm px-4 py-1.5 rounded-full"
                style={{ background: '#1a5c2a', color: '#fff' }}
              >
                Sobre o Projeto
              </span>
            </div>

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: 'linear-gradient(135deg, #6abf3e, #1a5c2a)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </div>

            <h3 className="font-bebas text-green-dark text-2xl tracking-wide mb-3">
              O que é o MosquiLab?
            </h3>
            <p className="font-body text-green-dark/70 leading-relaxed text-base">
              O MosquiLab é um projeto de extensão universitária vinculado à <strong>Univille</strong> (Universidade da Região de Joinville),
              financiado pela <strong>FAPESC</strong> e pelo <strong>Governo do Estado de Santa Catarina</strong>.
            </p>
            <p className="font-body text-green-dark/70 leading-relaxed text-base mt-3">
              Nosso objetivo é levar educação sanitária de qualidade às escolas, comunidades e espaços públicos de Joinville,
              promovendo a consciência coletiva sobre a prevenção da dengue e outras arboviroses.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {['Dengue', 'Saúde Pública', 'Univille', 'Joinville'].map(tag => (
                <span
                  key={tag}
                  className="text-xs font-body font-700 px-3 py-1 rounded-full"
                  style={{ background: '#f0ead6', color: '#1a5c2a' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 — Nossas Ações */}
          <div
            className={`rounded-3xl p-8 shadow-xl transition-all duration-700 ${inView ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}
            style={{ background: '#1a5c2a', border: '2px solid #6abf3e40' }}
          >
            {/* Label pill */}
            <div className="mb-6 inline-flex items-center gap-2">
              <span
                className="font-bebas tracking-widest text-sm px-4 py-1.5 rounded-full"
                style={{ background: '#6abf3e', color: '#fff' }}
              >
                Nossas Ações
              </span>
            </div>

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: 'rgba(106,191,62,0.2)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6abf3e" strokeWidth="2" strokeLinecap="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>

            <h3 className="font-bebas text-white text-2xl tracking-wide mb-3">
              Como atuamos?
            </h3>

            <ul className="space-y-3">
              {[
                { icon: '🏫', text: 'Visitas educativas a escolas públicas e privadas' },
                { icon: '🔬', text: 'Oficinas práticas com microscópios e amostras reais' },
                { icon: '🗣️', text: 'Palestras e rodas de conversa com especialistas' },
                { icon: '🌿', text: 'Identificação de criadouros e prevenção comunitária' },
                { icon: '📚', text: 'Distribuição de materiais educativos gratuitos' },
                { icon: '📅', text: 'Agendamento de visitas via Instagram' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="text-lg leading-none mt-0.5">{icon}</span>
                  <span className="font-body text-white/80 text-sm leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
