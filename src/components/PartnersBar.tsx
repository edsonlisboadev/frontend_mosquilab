export default function PartnersBar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 py-8 px-6 bg-white/60 backdrop-blur rounded-2xl border border-white/80">
      <span className="text-green-dark/50 text-xs font-body font-700 uppercase tracking-widest">Apoio & Parceiros</span>

      {/* Univille */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="8" fill="#1a5c2a"/>
            <text x="40" y="52" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold" fontFamily="serif">U</text>
          </svg>
          <div>
            <div className="text-green-dark font-bebas text-lg leading-none">UNIVILLE</div>
            <div className="text-green-dark/60 text-[10px] font-body">60 Anos</div>
          </div>
        </div>
      </div>

      <div className="w-px h-10 bg-green-dark/20" />

      {/* FAPESC */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="8" fill="#1a4f8a"/>
            <text x="40" y="52" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">FAPESC</text>
          </svg>
          <div>
            <div className="text-navy font-bebas text-lg leading-none">FAPESC</div>
            <div className="text-navy/60 text-[10px] font-body">Fundação de Amparo à<br/>Pesquisa de SC</div>
          </div>
        </div>
      </div>

      <div className="w-px h-10 bg-green-dark/20" />

      {/* Governo SC */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="80" height="80" rx="8" fill="#e87722"/>
            <text x="40" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">GOVERNO</text>
            <text x="40" y="50" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">DE SC</text>
          </svg>
          <div>
            <div className="text-orange font-bebas text-lg leading-none">GOV. SC</div>
            <div className="text-orange/70 text-[10px] font-body">Secretaria de Ciência,<br/>Tecnologia e Inovação</div>
          </div>
        </div>
      </div>
    </div>
  );
}
