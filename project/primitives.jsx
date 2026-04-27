// Shared SVG vessels for product placeholders — original abstract silhouettes
// Kept simple per system guidance: just shapes (circles, rounded rects, paths)

function VesselLota({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="88" rx="22" ry="3" fill="var(--vessel-deep)" opacity=".25"/>
      <path d="M28 50 Q28 78 50 80 Q72 78 72 50 Q72 38 60 32 L60 26 Q60 22 50 22 Q40 22 40 26 L40 32 Q28 38 28 50 Z"
            fill="var(--vessel)" stroke="var(--vessel-deep)" strokeWidth="1"/>
      <ellipse cx="50" cy="32" rx="10" ry="2.5" fill="var(--vessel-deep)" opacity=".4"/>
      <path d="M32 50 Q32 72 50 75" stroke="var(--vessel-soft)" strokeWidth="2" fill="none" opacity=".7" strokeLinecap="round"/>
    </svg>
  );
}

function VesselThali({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="60" rx="38" ry="10" fill="var(--vessel-deep)"/>
      <ellipse cx="50" cy="56" rx="38" ry="10" fill="var(--vessel)"/>
      <ellipse cx="50" cy="55" rx="32" ry="7" fill="var(--vessel-soft)" opacity=".6"/>
      <circle cx="38" cy="54" r="5" fill="var(--vessel-deep)" opacity=".35"/>
      <circle cx="55" cy="55" r="6" fill="var(--vessel-deep)" opacity=".25"/>
      <circle cx="65" cy="53" r="3" fill="var(--vessel-deep)" opacity=".4"/>
    </svg>
  );
}

function VesselTumbler({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="86" rx="18" ry="3" fill="var(--vessel-deep)" opacity=".25"/>
      <path d="M36 30 L34 80 Q34 84 50 84 Q66 84 66 80 L64 30 Z" fill="var(--vessel)" stroke="var(--vessel-deep)" strokeWidth="1"/>
      <ellipse cx="50" cy="30" rx="14" ry="3" fill="var(--vessel-deep)" opacity=".35"/>
      <path d="M40 35 L39 78" stroke="var(--vessel-soft)" strokeWidth="1.5" opacity=".7"/>
    </svg>
  );
}

function VesselBottle({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="92" rx="16" ry="2.5" fill="var(--vessel-deep)" opacity=".25"/>
      <rect x="46" y="10" width="8" height="14" rx="1" fill="var(--vessel-deep)"/>
      <path d="M40 24 L40 40 Q34 44 34 56 L34 84 Q34 90 50 90 Q66 90 66 84 L66 56 Q66 44 60 40 L60 24 Z"
            fill="var(--vessel)" stroke="var(--vessel-deep)" strokeWidth="1"/>
      <path d="M38 50 L38 82" stroke="var(--vessel-soft)" strokeWidth="2" opacity=".7"/>
    </svg>
  );
}

function VesselDabba({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="86" rx="22" ry="3" fill="var(--vessel-deep)" opacity=".25"/>
      <rect x="26" y="34" width="48" height="50" rx="3" fill="var(--vessel)" stroke="var(--vessel-deep)" strokeWidth="1"/>
      <rect x="22" y="28" width="56" height="10" rx="3" fill="var(--vessel-deep)"/>
      <rect x="24" y="30" width="52" height="6" rx="2" fill="var(--vessel)"/>
      <rect x="44" y="22" width="12" height="6" rx="1" fill="var(--vessel-deep)"/>
      <line x1="32" y1="50" x2="68" y2="50" stroke="var(--vessel-soft)" strokeWidth="1" opacity=".5"/>
      <line x1="32" y1="62" x2="68" y2="62" stroke="var(--vessel-soft)" strokeWidth="1" opacity=".5"/>
    </svg>
  );
}

function VesselKadhai({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="80" rx="32" ry="4" fill="var(--vessel-deep)" opacity=".25"/>
      <path d="M20 50 Q20 78 50 78 Q80 78 80 50 Z" fill="var(--vessel)" stroke="var(--vessel-deep)" strokeWidth="1"/>
      <ellipse cx="50" cy="50" rx="30" ry="4" fill="var(--vessel-deep)"/>
      <path d="M14 48 L20 50 M86 48 L80 50" stroke="var(--vessel-deep)" strokeWidth="3" strokeLinecap="round"/>
      <path d="M28 60 Q50 70 72 60" stroke="var(--vessel-soft)" strokeWidth="1.5" fill="none" opacity=".6"/>
    </svg>
  );
}

function VesselDiya({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="76" rx="30" ry="3" fill="var(--vessel-deep)" opacity=".25"/>
      <path d="M22 60 Q22 74 50 74 Q78 74 78 60 Q78 56 50 56 Q22 56 22 60 Z" fill="var(--vessel)" stroke="var(--vessel-deep)" strokeWidth="1"/>
      <ellipse cx="50" cy="58" rx="26" ry="3" fill="var(--vessel-deep)"/>
      <path d="M50 56 Q48 50 50 38 Q52 50 50 56" fill="#f59e0b" opacity=".9"/>
      <circle cx="50" cy="44" r="4" fill="#fbbf24" opacity=".4"/>
    </svg>
  );
}

function VesselSpoon({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="90" rx="14" ry="2" fill="var(--vessel-deep)" opacity=".2"/>
      <ellipse cx="50" cy="32" rx="16" ry="22" fill="var(--vessel)" stroke="var(--vessel-deep)" strokeWidth="1"/>
      <ellipse cx="50" cy="30" rx="12" ry="18" fill="var(--vessel-soft)" opacity=".5"/>
      <rect x="46" y="50" width="8" height="38" rx="2" fill="var(--vessel)" stroke="var(--vessel-deep)" strokeWidth="1"/>
    </svg>
  );
}

function VesselGiftBox({ size = 80 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <rect x="18" y="32" width="64" height="50" rx="2" fill="var(--vessel)" stroke="var(--vessel-deep)" strokeWidth="1"/>
      <rect x="14" y="26" width="72" height="14" rx="2" fill="var(--vessel-deep)"/>
      <rect x="46" y="26" width="8" height="56" fill="var(--vessel-soft)"/>
      <path d="M50 26 Q40 16 34 22 Q34 28 50 30 Q66 28 66 22 Q60 16 50 26 Z" fill="var(--vessel-soft)" stroke="var(--vessel-deep)" strokeWidth="1"/>
    </svg>
  );
}

const VESSELS = {
  lota: VesselLota,
  thali: VesselThali,
  tumbler: VesselTumbler,
  bottle: VesselBottle,
  dabba: VesselDabba,
  kadhai: VesselKadhai,
  diya: VesselDiya,
  spoon: VesselSpoon,
  gift: VesselGiftBox,
};

function ProdImg({ kind = 'lota', material = 'brass', label, size = 80, ratio = '1/1', big = false }) {
  const Vessel = VESSELS[kind] || VesselLota;
  return (
    <div className={`prod-img mat-${material}`} style={{ aspectRatio: ratio }}>
      <div className="vessel">
        <Vessel size={big ? size * 1.6 : size} />
      </div>
      {label && <div className="label-tag">{label}</div>}
    </div>
  );
}

// ─── Logo ───
function SaiMark({ size = 'md', tagline = true }) {
  return (
    <div className={`sai-mark ${size === 'lg' ? 'lg' : ''}`}>
      <div className="ring"><span className="glyph">ॐ</span></div>
      <div>
        <div className="word">Sai <i>Store</i></div>
        {tagline && <div className="tag">Heritage · Hand-crafted</div>}
      </div>
    </div>
  );
}

// ─── Icons ───
const Icon = {
  Search: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" strokeLinecap="round"/></svg>,
  Cart: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 4h2l2.5 13h11l2.5-9H6.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>,
  User: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/></svg>,
  Heart: ({s=18, fill='none'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-7-4.5-9.5-9c-1.5-3 .5-7 4-7 2 0 3.5 1.5 5.5 4 2-2.5 3.5-4 5.5-4 3.5 0 5.5 4 4 7-2.5 4.5-9.5 9-9.5 9z" strokeLinejoin="round"/></svg>,
  Menu: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round"/></svg>,
  X: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 6L6 18" strokeLinecap="round"/></svg>,
  Plus: ({s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>,
  Minus: ({s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14" strokeLinecap="round"/></svg>,
  Star: ({s=14, fill='currentColor'}) => <svg width={s} height={s} viewBox="0 0 24 24" fill={fill}><path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.3L12 17.8l-6.3 3.7 1.7-7.3-5.4-4.7 7.1-.6z"/></svg>,
  ArrowRight: ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ArrowLeft: ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5m6-6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Check: ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Truck: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="11" height="9" rx="1"/><path d="M13 10h4l3 3v3h-7zM6 19a2 2 0 100-4 2 2 0 000 4zM17 19a2 2 0 100-4 2 2 0 000 4z"/></svg>,
  Shield: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z" strokeLinejoin="round"/><path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Leaf: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 19c0-9 7-14 14-14 0 9-5 14-14 14zM5 19l5-5" strokeLinecap="round"/></svg>,
  Gift: ({s=18}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="9" width="18" height="11" rx="1"/><path d="M3 13h18M12 9v11M8 9c-1.5 0-3-1-3-3 0-2 2-3 3-2 1.5 1 1 5 1 5zM16 9c1.5 0 3-1 3-3 0-2-2-3-3-2-1.5 1-1 5-1 5z"/></svg>,
  MapPin: ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21s-7-7-7-12a7 7 0 1114 0c0 5-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  Phone: ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>,
  Eye: ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>,
  Filter: ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 5h16l-6 8v6l-4-2v-4z" strokeLinejoin="round"/></svg>,
  Edit: ({s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 20h4l10-10-4-4L4 16zM14 6l4 4" strokeLinejoin="round"/></svg>,
  Trash: ({s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" strokeLinejoin="round"/></svg>,
  Lock: ({s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>,
};

// ─── Star rating ───
function Stars({ value = 4.5, size = 12, count = false }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div style={{display:'flex',alignItems:'center',gap:3,color:'var(--gold)'}}>
      {[0,1,2,3,4].map(i => (
        <Icon.Star key={i} s={size} fill={i < full ? 'currentColor' : (i === full && half ? 'url(#half)' : 'transparent')} />
      ))}
      {count !== false && <span style={{fontSize:11,color:'var(--ink-mute)',marginLeft:4}}>{value.toFixed(1)}{typeof count === 'number' && ` (${count})`}</span>}
    </div>
  );
}

Object.assign(window, {
  VesselLota, VesselThali, VesselTumbler, VesselBottle, VesselDabba,
  VesselKadhai, VesselDiya, VesselSpoon, VesselGiftBox, VESSELS,
  ProdImg, SaiMark, Icon, Stars,
});
