import Logo from '../components/Logo';

const INSTAGRAM_URL = 'https://www.instagram.com/mosquilab.univille/';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background — gradient verde representando a natureza */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0d3318 0%, #1a5c2a 40%, #2d7a3a 70%, #1a5c2a 100%)',
        }}
      />

      {/* Padrão decorativo de mosquitos / células */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, #6abf3e 1px, transparent 1px),
                            radial-gradient(circle at 80% 20%, #6abf3e 1px, transparent 1px),
                            radial-gradient(circle at 60% 80%, #6abf3e 1px, transparent 1px),
                            radial-gradient(circle at 10% 70%, #6abf3e 1px, transparent 1px)`,
          backgroundSize: '80px 80px, 120px 120px, 60px 60px, 100px 100px',
        }}
      />

      {/* Círculos decorativos */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-10 border-2 border-green-light" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 border border-green-light" />
      <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full opacity-10 bg-lime" />

      {/* Mosquito SVG decorativo grande */}
      <svg
        className="absolute right-16 top-1/2 -translate-y-1/2 opacity-5 hidden lg:block"
        width="360" height="360" viewBox="0 0 64 64" fill="none"
      >
        <ellipse cx="32" cy="35" rx="10" ry="14" fill="#6abf3e"/>
        <circle cx="32" cy="19" r="7" fill="#6abf3e"/>
        <ellipse cx="14" cy="28" rx="14" ry="5" fill="#6abf3e" transform="rotate(-20 14 28)"/>
        <ellipse cx="50" cy="28" rx="14" ry="5" fill="#6abf3e" transform="rotate(20 50 28)"/>
        <line x1="22" y1="34" x2="8" y2="46" stroke="#6abf3e" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="26" y1="38" x2="12" y2="54" stroke="#6abf3e" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="42" y1="34" x2="56" y2="46" stroke="#6abf3e" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="38" y1="38" x2="52" y2="54" stroke="#6abf3e" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="32" y1="12" x2="32" y2="2" stroke="#6abf3e" strokeWidth="2" strokeLinecap="round"/>
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Logo */}
        <div className="animate-fade-in-up mb-8">
          <Logo size={80} dark={false} />
        </div>

        {/* Badge */}
        <div className="animate-fade-in-up delay-100 mb-6">
          <span
            className="inline-block font-bebas tracking-widest text-lg px-5 py-2 rounded-full"
            style={{ background: '#6abf3e', color: '#fff' }}
          >
            Projeto de Educação Sanitária
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up delay-200 font-bebas text-white leading-none mb-4"
          style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.04em' }}
        >
          Prevenindo a dengue<br />
          <span style={{ color: '#6abf3e' }}>educando Joinville</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-fade-in-up delay-300 text-white/80 font-body text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
          Levamos conhecimento sobre saúde sanitária e prevenção de arboviroses às escolas e comunidades de Joinville, SC.
        </p>

        {/* CTA Button */}
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="animate-fade-in-up delay-400 inline-flex items-center gap-3 font-body font-700 text-white rounded-2xl px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #e87722 0%, #c95f0e 100%)' }}
        >
          <img src="/img/instagram.png" alt="Instagram" className="w-6 h-6 brightness-0 invert" />
          Entre em contato para agendamento
        </a>

        {/* Scroll hint */}
        <div className="animate-fade-in-up delay-500 mt-16 flex flex-col items-center gap-2 text-white/40">
          <span className="text-xs font-body tracking-widest uppercase">Role para explorar</span>
          <div className="w-px h-10 bg-white/20 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
