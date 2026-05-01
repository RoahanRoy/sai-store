import React from 'react';
import { PRODUCTS } from './data.js';
import { Icon, ProdImg, SaiMark, Stars } from './primitives.jsx';
import { AdminEditProductButton } from './admin.jsx';

export function FestiveStrip({ show }) {
  if (!show) return null;
  return (
    <div className="festive-strip">
      ✦ Akshaya Tritiya · Free engraving on brass orders above ₹2500 · Code AKSHAYA26 ✦
    </div>
  );
}

export function TopStrip() {
  return (
    <div style={{
      background: 'var(--ink)', color: 'var(--bg)', fontSize: 11,
      padding: '7px 24px', display: 'flex', justifyContent: 'space-between',
      letterSpacing: '.08em',
    }}>
      <span>FREE SHIPPING ABOVE ₹999 · COD AVAILABLE</span>
      <span style={{display:'flex',gap:18,opacity:.85}}>
        <span>Track Order</span><span>+91 80 4567 1212</span><span>EN · हिंदी</span>
      </span>
    </div>
  );
}

export function Header({ onSearch, onCart, onMenu, cartCount = 0, route, go, mobile }) {
  if (mobile) {
    return (
      <header style={{position:'sticky',top:0,zIndex:30,background:'var(--bg)',borderBottom:'1px solid var(--line)'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 16px'}}>
          <button onClick={onMenu} style={{background:'none',border:0,padding:6,cursor:'pointer',color:'var(--ink)'}}><Icon.Menu/></button>
          <SaiMark size="sm" tagline={false}/>
          <div style={{display:'flex',gap:6}}>
            <button onClick={onSearch} style={{background:'none',border:0,padding:6,cursor:'pointer',color:'var(--ink)'}}><Icon.Search/></button>
            <button onClick={onCart} style={{background:'none',border:0,padding:6,cursor:'pointer',color:'var(--ink)',position:'relative'}}>
              <Icon.Cart/>
              {cartCount > 0 && <span style={{position:'absolute',top:-2,right:-2,background:'var(--accent)',color:'#fff',fontSize:9,minWidth:16,height:16,borderRadius:8,display:'grid',placeItems:'center',fontWeight:600,padding:'0 4px'}}>{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>
    );
  }
  const links = [
    { id:'home', label:'Home' },
    { id:'shop', label:'Shop All' },
    { id:'gifts', label:'Gift Hampers' },
    { id:'about', label:'Our Story' },
  ];
  return (
    <header style={{position:'sticky',top:0,zIndex:30,background:'var(--bg)',borderBottom:'1px solid var(--line)'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',alignItems:'center',padding:'14px 40px',gap:20}}>
        <nav style={{display:'flex',gap:28,fontSize:13}}>
          {links.map(l => (
            <a key={l.id} onClick={() => go && go(l.id)} style={{
              cursor:'pointer',color: route===l.id?'var(--accent)':'var(--ink)',
              textDecoration:'none', borderBottom: route===l.id?'1px solid var(--accent)':'1px solid transparent',
              paddingBottom:2, transition:'color .15s',
            }}>{l.label}</a>
          ))}
        </nav>
        <a onClick={() => go && go('home')} style={{cursor:'pointer',justifySelf:'center'}}><SaiMark/></a>
        <div style={{display:'flex',gap:18,justifySelf:'end',alignItems:'center'}}>
          <button onClick={onSearch} style={{background:'none',border:0,cursor:'pointer',color:'var(--ink)',display:'flex',alignItems:'center',gap:6,fontSize:13,fontFamily:'var(--body)'}}>
            <Icon.Search/> Search
          </button>
          <button onClick={() => go && go('account')} style={{background:'none',border:0,cursor:'pointer',color:'var(--ink)',display:'flex'}}><Icon.User/></button>
          <button style={{background:'none',border:0,cursor:'pointer',color:'var(--ink)',display:'flex'}}><Icon.Heart/></button>
          <button onClick={onCart} style={{background:'none',border:0,cursor:'pointer',color:'var(--ink)',display:'flex',alignItems:'center',gap:6,position:'relative'}}>
            <Icon.Cart/>
            <span style={{fontSize:13}}>Cart</span>
            {cartCount > 0 && <span style={{background:'var(--accent)',color:'#fff',fontSize:10,minWidth:18,height:18,borderRadius:9,display:'grid',placeItems:'center',fontWeight:600,padding:'0 5px'}}>{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  );
}

export function Footer({ mobile }) {
  const cols = [
    { h: 'Shop', items: ['Brass', 'Copper', 'Steel', 'Gift Hampers', 'New Arrivals', 'Bestsellers'] },
    { h: 'Care', items: ['Cleaning Guide', 'Tin Re-coating', 'Returns & Refunds', 'Warranty', 'Track Order'] },
    { h: 'About', items: ['Our Story', 'Artisan Network', 'Press', 'Stockists', 'Contact Us'] },
  ];
  return (
    <footer style={{background:'var(--ink)',color:'var(--bg)',padding: mobile?'40px 20px 24px':'64px 40px 32px'}}>
      <div className="mehndi-border" style={{marginBottom:32, opacity:.4}}/>
      <div style={{display:'grid',gridTemplateColumns: mobile? '1fr' : '1.4fr repeat(3, 1fr) 1.2fr',gap:mobile?28:48}}>
        <div>
          <SaiMark/>
          <p style={{fontSize:13,lineHeight:1.6,opacity:.7,marginTop:14,maxWidth:260}}>
            A boutique of hand-crafted brass, copper and steel vessels — sourced directly from artisan families in Moradabad, Tanjore and Pembarthi.
          </p>
          <div style={{display:'flex',gap:8,marginTop:16}}>
            {['IG','FB','YT','PIN'].map(s => (
              <span key={s} style={{width:30,height:30,border:'1px solid rgba(255,255,255,.2)',borderRadius:'50%',display:'grid',placeItems:'center',fontSize:9,letterSpacing:'.1em'}}>{s}</span>
            ))}
          </div>
        </div>
        {cols.map(c => (
          <div key={c.h}>
            <div style={{fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',opacity:.6,marginBottom:14}}>{c.h}</div>
            {c.items.map(i => <div key={i} style={{fontSize:13,marginBottom:8,opacity:.85,cursor:'pointer'}}>{i}</div>)}
          </div>
        ))}
        <div>
          <div style={{fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',opacity:.6,marginBottom:14}}>Newsletter</div>
          <p style={{fontSize:12,opacity:.7,marginBottom:12,lineHeight:1.5}}>Stories from the workshop, festive drops, and 10% off your first order.</p>
          <div style={{display:'flex',gap:6}}>
            <input placeholder="you@email.com" style={{flex:1,background:'transparent',border:'1px solid rgba(255,255,255,.2)',color:'var(--bg)',padding:'10px 12px',borderRadius:6,fontSize:12,fontFamily:'var(--body)'}}/>
            <button style={{background:'var(--accent)',border:0,color:'#fff',padding:'10px 14px',borderRadius:6,cursor:'pointer'}}><Icon.ArrowRight/></button>
          </div>
        </div>
      </div>
      <div style={{borderTop:'1px solid rgba(255,255,255,.1)',marginTop:40,paddingTop:20,display:'flex',justifyContent:'space-between',fontSize:11,opacity:.55,flexWrap:'wrap',gap:10}}>
        <span>© 2026 Sai Store · Crafted with care in Bharat 🇮🇳</span>
        <span>Privacy · Terms · Sitemap</span>
      </div>
    </footer>
  );
}

export function ProductCard({ p, onClick, variant = 'default', onAdd }) {
  const off = Math.round((1 - p.price/p.mrp)*100);
  const [hover, setHover] = React.useState(false);

  if (variant === 'editorial') {
    return (
      <article onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
        style={{cursor:'pointer',background:'var(--bg)',position:'relative'}}>
        <ProdImg kind={p.kind} material={p.material} ratio="4/5" big size={70}/>
        <div style={{padding:'14px 4px'}}>
          {p.badge && <div style={{fontSize:10,letterSpacing:'.2em',color:'var(--accent)',textTransform:'uppercase',marginBottom:4}}>{p.badge}</div>}
          <h3 style={{fontSize:18,marginBottom:4}}>{p.name}</h3>
          <div style={{fontSize:12,color:'var(--ink-mute)',marginBottom:10,fontStyle:'italic'}}>{p.sub}</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
            <div style={{fontSize:15}}>₹{p.price.toLocaleString('en-IN')} <span className="strike" style={{fontSize:12}}>₹{p.mrp.toLocaleString('en-IN')}</span></div>
            <Stars value={p.rating} size={11} count={false}/>
          </div>
        </div>
      </article>
    );
  }

  if (variant === 'minimal') {
    return (
      <article onClick={onClick} className="card" style={{cursor:'pointer',padding:0}}>
        <ProdImg kind={p.kind} material={p.material} ratio="1/1" size={60}/>
        <div style={{padding:14}}>
          <div style={{fontSize:14,marginBottom:4}}>{p.name}</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontSize:13,color:'var(--accent)',fontWeight:600}}>₹{p.price.toLocaleString('en-IN')}</div>
            <span style={{fontSize:11,color:'var(--ink-mute)'}}>★ {p.rating}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article onClick={onClick} onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)}
      className="card" style={{cursor:'pointer', boxShadow: hover?'var(--shadow)':'none', transform: hover?'translateY(-2px)':'none'}}>
      <div style={{position:'relative'}}>
        <ProdImg kind={p.kind} material={p.material} ratio="1/1" big size={70}/>
        {off > 0 && <div className="chip chip-accent" style={{position:'absolute',top:10,left:10}}>−{off}%</div>}
        {p.badge && <div className="chip chip-plum" style={{position:'absolute',top:10,right:10}}>{p.badge}</div>}
        <button style={{position:'absolute',bottom:10,right:10,width:34,height:34,borderRadius:'50%',background:'var(--bg)',border:'1px solid var(--line)',cursor:'pointer',display:'grid',placeItems:'center',color:'var(--ink-soft)',opacity:hover?1:0,transition:'opacity .15s'}}>
          <Icon.Heart s={14}/>
        </button>
        <div style={{position:'absolute',bottom:10,left:10}} onClick={e=>e.stopPropagation()}>
          <AdminEditProductButton product={p}/>
        </div>
      </div>
      <div style={{padding:'14px 14px 16px'}}>
        <div style={{fontSize:11,color:'var(--ink-mute)',letterSpacing:'.1em',textTransform:'uppercase',marginBottom:4}}>{p.cat}</div>
        <h3 style={{fontSize:16,marginBottom:4}}>{p.name}</h3>
        <div style={{fontSize:12,color:'var(--ink-mute)',marginBottom:10}}>{p.sub}</div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
          <div>
            <span style={{fontSize:15,fontWeight:600,color:'var(--ink)'}}>₹{p.price.toLocaleString('en-IN')}</span>
            <span className="strike" style={{fontSize:12,marginLeft:6}}>₹{p.mrp.toLocaleString('en-IN')}</span>
          </div>
          <Stars value={p.rating} size={11} count={false}/>
        </div>
        <button onClick={(e)=>{e.stopPropagation();onAdd && onAdd(p);}} className="btn btn-ghost btn-sm btn-block">Add to Cart</button>
      </div>
    </article>
  );
}

export function SearchOverlay({ open, onClose, go }) {
  const [q, setQ] = React.useState('');
  React.useEffect(() => {
    if (open) setTimeout(() => document.getElementById('sai-search-input')?.focus(), 50);
  }, [open]);
  if (!open) return null;
  const results = q ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || p.cat.toLowerCase().includes(q.toLowerCase())) : [];
  const trending = ['Copper bottle', 'Brass thali', 'Diya pair', 'Wedding hamper', 'Lota'];
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(20,15,10,.55)',zIndex:90,display:'flex',justifyContent:'center',alignItems:'flex-start',paddingTop:80,backdropFilter:'blur(4px)'}}>
      <div onClick={e=>e.stopPropagation()} className="fadeup" style={{width:'min(640px, 92%)',background:'var(--bg)',borderRadius:14,boxShadow:'var(--shadow-lg)',overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',gap:12,padding:'18px 20px',borderBottom:'1px solid var(--line)'}}>
          <Icon.Search s={20}/>
          <input id="sai-search-input" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search lota, copper bottle, gift..." style={{flex:1,background:'none',border:0,fontSize:18,fontFamily:'var(--display)',color:'var(--ink)',outline:'none'}}/>
          <button onClick={onClose} className="chip" style={{background:'transparent',cursor:'pointer'}}>ESC</button>
        </div>
        <div style={{padding:20,maxHeight:480,overflowY:'auto'}}>
          {!q && (
            <>
              <div style={{fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:10}}>Trending</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:24}}>
                {trending.map(t => <button key={t} onClick={()=>setQ(t)} className="chip" style={{cursor:'pointer'}}>{t}</button>)}
              </div>
              <div style={{fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:10}}>Popular Now</div>
              {PRODUCTS.slice(0,3).map(p => (
                <div key={p.id} onClick={()=>{go('product',p.id);onClose();}} style={{display:'flex',gap:12,padding:8,borderRadius:8,cursor:'pointer',alignItems:'center'}} onMouseEnter={e=>e.currentTarget.style.background='var(--bg-soft)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{width:48,height:48,flexShrink:0}}><ProdImg kind={p.kind} material={p.material} size={36}/></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14}}>{p.name}</div>
                    <div style={{fontSize:11,color:'var(--ink-mute)'}}>{p.cat} · ₹{p.price.toLocaleString('en-IN')}</div>
                  </div>
                  <Icon.ArrowRight/>
                </div>
              ))}
            </>
          )}
          {q && (
            <>
              <div style={{fontSize:11,letterSpacing:'.2em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:10}}>{results.length} result{results.length!==1?'s':''} for &ldquo;{q}&rdquo;</div>
              {results.map(p => (
                <div key={p.id} onClick={()=>{go('product',p.id);onClose();}} style={{display:'flex',gap:12,padding:8,borderRadius:8,cursor:'pointer',alignItems:'center'}} onMouseEnter={e=>e.currentTarget.style.background='var(--bg-soft)'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{width:48,height:48,flexShrink:0}}><ProdImg kind={p.kind} material={p.material} size={36}/></div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14}}>{p.name}</div>
                    <div style={{fontSize:11,color:'var(--ink-mute)'}}>{p.cat} · ₹{p.price.toLocaleString('en-IN')}</div>
                  </div>
                  <Icon.ArrowRight/>
                </div>
              ))}
              {results.length === 0 && <div style={{padding:'30px 0',textAlign:'center',color:'var(--ink-mute)',fontSize:13}}>No matches. Try &ldquo;lota&rdquo;, &ldquo;thali&rdquo; or &ldquo;copper&rdquo;.</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function CartDrawer({ open, onClose, cart, setCart, go }) {
  if (!open) return null;
  const sub = cart.reduce((s,it)=>s+it.price*it.qty,0);
  const ship = sub > 999 ? 0 : 99;
  const total = sub + ship;

  function setQty(id, q) {
    setCart(cart.map(it => it.cartId===id ? {...it,qty:Math.max(1,q)} : it));
  }
  function remove(id) { setCart(cart.filter(it => it.cartId!==id)); }

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(20,15,10,.45)',zIndex:90,display:'flex',justifyContent:'flex-end',backdropFilter:'blur(2px)'}}>
      <style>{`@keyframes cartSlide{from{transform:translateX(100%)}to{transform:none}}`}</style>
      <div onClick={e=>e.stopPropagation()} style={{width:'min(440px,100%)',background:'var(--bg)',display:'flex',flexDirection:'column',animation:'cartSlide .25s cubic-bezier(.2,.7,.3,1)'}}>
        <div style={{padding:'20px 24px',borderBottom:'1px solid var(--line)',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div>
            <h3 style={{fontSize:22}}>Your Cart</h3>
            <div style={{fontSize:12,color:'var(--ink-mute)'}}>{cart.length} item{cart.length!==1?'s':''}</div>
          </div>
          <button onClick={onClose} style={{background:'none',border:0,cursor:'pointer',color:'var(--ink)'}}><Icon.X/></button>
        </div>

        {cart.length === 0 ? (
          <div style={{padding:'60px 24px',textAlign:'center',flex:1,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{width:80,height:80,borderRadius:'50%',background:'var(--bg-soft)',display:'grid',placeItems:'center',marginBottom:16,color:'var(--ink-mute)'}}><Icon.Cart s={32}/></div>
            <h3 style={{fontSize:20,marginBottom:6}}>Cart is empty</h3>
            <p style={{fontSize:13,color:'var(--ink-mute)',marginBottom:20}}>Discover hand-crafted vessels for your home.</p>
            <button onClick={()=>{onClose();go('shop');}} className="btn btn-primary">Shop Now</button>
          </div>
        ) : (
          <>
            <div className="scroll-y" style={{flex:1,padding:'8px 24px'}}>
              {cart.map(it => (
                <div key={it.cartId} style={{display:'flex',gap:14,padding:'16px 0',borderBottom:'1px solid var(--line-soft)'}}>
                  <div style={{width:80,height:80,flexShrink:0,borderRadius:8,overflow:'hidden'}}><ProdImg kind={it.kind} material={it.material} size={56}/></div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontFamily:'var(--display)',fontSize:15,marginBottom:2}}>{it.name}</div>
                    <div style={{fontSize:11,color:'var(--ink-mute)',marginBottom:8}}>{it.finish} · {it.size}</div>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                      <div style={{display:'inline-flex',alignItems:'center',border:'1px solid var(--line)',borderRadius:999}}>
                        <button onClick={()=>setQty(it.cartId,it.qty-1)} style={{background:'none',border:0,padding:'6px 10px',cursor:'pointer'}}><Icon.Minus/></button>
                        <span style={{padding:'0 6px',fontSize:13,minWidth:20,textAlign:'center'}}>{it.qty}</span>
                        <button onClick={()=>setQty(it.cartId,it.qty+1)} style={{background:'none',border:0,padding:'6px 10px',cursor:'pointer'}}><Icon.Plus/></button>
                      </div>
                      <div style={{fontSize:14,fontWeight:600}}>₹{(it.price*it.qty).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                  <button onClick={()=>remove(it.cartId)} style={{background:'none',border:0,cursor:'pointer',color:'var(--ink-mute)',alignSelf:'flex-start'}}><Icon.Trash/></button>
                </div>
              ))}
            </div>
            <div style={{padding:'18px 24px',borderTop:'1px solid var(--line)',background:'var(--bg-soft)'}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}>
                <span style={{color:'var(--ink-mute)'}}>Subtotal</span><span>₹{sub.toLocaleString('en-IN')}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:12}}>
                <span style={{color:'var(--ink-mute)'}}>Shipping</span>
                <span>{ship === 0 ? <span style={{color:'var(--peacock)'}}>FREE</span> : `₹${ship}`}</span>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:18,fontFamily:'var(--display)',marginBottom:14,paddingTop:10,borderTop:'1px dashed var(--line)'}}>
                <span>Total</span><span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <button onClick={()=>{onClose();go('checkout');}} className="btn btn-primary btn-lg btn-block">
                Checkout · ₹{total.toLocaleString('en-IN')} <Icon.ArrowRight/>
              </button>
              <div style={{display:'flex',justifyContent:'center',gap:14,marginTop:12,fontSize:10,color:'var(--ink-mute)',letterSpacing:'.1em'}}>
                <span>SECURE</span><span>·</span><span>EASY RETURNS</span><span>·</span><span>COD</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export function MobileMenu({ open, onClose, go, route }) {
  if (!open) return null;
  const links = [
    { id:'home', label:'Home' },
    { id:'shop', label:'Shop All' },
    { id:'gifts', label:'Gift Hampers' },
    { id:'about', label:'Our Story' },
    { id:'account', label:'My Account' },
    { id:'tracking', label:'Track Order' },
  ];
  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(20,15,10,.5)',zIndex:90}}>
      <style>{`@keyframes menuSlide{from{transform:translateX(-100%)}to{transform:none}}`}</style>
      <div onClick={e=>e.stopPropagation()} style={{width:'80%',height:'100%',background:'var(--bg)',padding:24,animation:'menuSlide .25s cubic-bezier(.2,.7,.3,1)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32}}>
          <SaiMark/>
          <button onClick={onClose} style={{background:'none',border:0,cursor:'pointer'}}><Icon.X/></button>
        </div>
        {links.map(l => (
          <div key={l.id} onClick={()=>{go(l.id);onClose();}} style={{padding:'14px 0',borderBottom:'1px solid var(--line-soft)',fontSize:18,fontFamily:'var(--display)',color: route===l.id?'var(--accent)':'var(--ink)',display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer'}}>
            {l.label}<Icon.ArrowRight/>
          </div>
        ))}
        <div style={{marginTop:32,padding:'16px',background:'var(--bg-soft)',borderRadius:12}}>
          <div className="ornament" style={{marginBottom:8}}>✦</div>
          <p style={{fontFamily:'var(--display)',fontStyle:'italic',fontSize:16,marginBottom:4}}>Heritage at your door</p>
          <p style={{fontSize:12,color:'var(--ink-mute)'}}>+91 80 4567 1212 · care@saistore.in</p>
        </div>
      </div>
    </div>
  );
}
