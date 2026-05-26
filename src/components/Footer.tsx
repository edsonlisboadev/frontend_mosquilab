import Logo from './Logo';

export default function Footer() {
  return (
    <footer
      className="py-12 px-6 border-t"
      style={{ background: '#0a2011', borderColor: '#1a5c2a40' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Logo size={40} dark={false} />
          <p className="font-body text-white/40 text-sm mt-3 max-w-xs">
            Projeto de Extensão — Univille<br/>
            Joinville, Santa Catarina, Brasil
          </p>
        </div>

        <div className="text-center">
          <p className="font-body text-white/30 text-sm">
            © {new Date().getFullYear()} Univille — Todos os direitos reservados
          </p>
          <p className="font-body text-white/20 text-xs mt-1">
            Financiado por FAPESC e Governo do Estado de Santa Catarina
          </p>
        </div>
      </div>
    </footer>
  );
}
