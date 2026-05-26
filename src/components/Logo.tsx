interface LogoProps {
  size?: number;
  dark?: boolean;
}

export default function Logo({ size = 48, dark = true }: LogoProps) {
  const textColor = dark ? '#1a5c2a' : '#ffffff';
  const iconBg = dark ? '#1a5c2a' : '#ffffff';
  const iconFg = dark ? '#6abf3e' : '#1a5c2a';

  return (
    <div className="flex items-center gap-3">
      {/* Lupa com mosquito */}
      <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Círculo da lupa */}
        <circle cx="28" cy="26" r="20" fill={iconBg} stroke={iconFg} strokeWidth="4"/>
        {/* Cabo da lupa */}
        <line x1="42" y1="40" x2="58" y2="56" stroke={iconFg} strokeWidth="5" strokeLinecap="round"/>
        {/* Corpo do mosquito */}
        <ellipse cx="28" cy="27" rx="5" ry="7" fill={iconFg}/>
        {/* Cabeça */}
        <circle cx="28" cy="19" r="3.5" fill={iconFg}/>
        {/* Asas */}
        <ellipse cx="20" cy="24" rx="6" ry="2.5" fill={iconFg} opacity="0.7" transform="rotate(-20 20 24)"/>
        <ellipse cx="36" cy="24" rx="6" ry="2.5" fill={iconFg} opacity="0.7" transform="rotate(20 36 24)"/>
        {/* Pernas */}
        <line x1="23" y1="28" x2="16" y2="34" stroke={iconFg} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="25" y1="30" x2="18" y2="38" stroke={iconFg} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="33" y1="28" x2="40" y2="34" stroke={iconFg} strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="31" y1="30" x2="38" y2="38" stroke={iconFg} strokeWidth="1.5" strokeLinecap="round"/>
        {/* Probóscis */}
        <line x1="28" y1="15.5" x2="28" y2="10" stroke={iconFg} strokeWidth="1.5" strokeLinecap="round"/>
      </svg>

      {/* Texto */}
      <div>
        <div
          className="font-bebas leading-none tracking-widest"
          style={{ color: textColor, fontSize: size * 0.55 }}
        >
          MOSQUI<span style={{ color: '#6abf3e' }}>LAB</span>
        </div>
        <div
          className="font-body font-600 leading-tight"
          style={{ color: dark ? '#6abf3e' : 'rgba(255,255,255,0.8)', fontSize: size * 0.22 }}
        >
          Educação Sanitária
        </div>
      </div>
    </div>
  );
}
