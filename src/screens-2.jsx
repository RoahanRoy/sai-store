// Screens part 2: Cart, Checkout, Payment, Order Confirmation, Tracking, Login, Account
import React from 'react';
import { ADDRESSES } from './data.js';
import { Icon, ProdImg, SaiMark } from './primitives.jsx';
import { api } from './api.js';
import { AuthContext } from './App.jsx';

function formatMemberSince(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function firstName(name) {
  if (!name) return 'friend';
  return name.trim().split(/\s+/)[0];
}

function initials(name, email) {
  const src = (name || email || '?').trim();
  return src.charAt(0).toUpperCase();
}

function CartItemImage({ it, size = 48 }) {
  const img = Array.isArray(it.images) ? it.images.find(Boolean) : null;
  if (!img) return <ProdImg kind={it.kind} material={it.material} size={size}/>;
  return <img src={img} alt={it.name || ''} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>;
}

export function CartPage({ cart, setCart, go, mobile }) {
  const sub = cart.reduce((s,it)=>s+it.price*it.qty,0);
  const ship = sub > 999 ? 0 : 99;
  const tax = Math.round(sub * 0.05);
  const total = sub + ship + tax;
  function setQty(id, q) { setCart(cart.map(it => it.cartId===id ? {...it,qty:Math.max(1,q)} : it)); }
  function remove(id) { setCart(cart.filter(it => it.cartId!==id)); }

  if (cart.length === 0) {
    return (
      <div style={{padding:mobile?'80px 20px':'120px 40px',textAlign:'center'}}>
        <div style={{width:100,height:100,borderRadius:'50%',background:'var(--bg-soft)',display:'grid',placeItems:'center',margin:'0 auto 20px',color:'var(--ink-mute)'}}><Icon.Cart s={42}/></div>
        <h2 style={{fontSize:mobile?28:36,marginBottom:10}}>Your cart is <span className="italic">empty</span></h2>
        <p style={{color:'var(--ink-mute)',marginBottom:24}}>Begin your collection of heirloom vessels.</p>
        <button onClick={()=>go('shop')} className="btn btn-primary btn-lg">Shop the Collection</button>
      </div>
    );
  }

  return (
    <div style={{padding:mobile?'24px 20px 60px':'40px 40px 80px'}}>
      <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)',marginBottom:8}}>HOME · CART</div>
      <h1 style={{fontSize:mobile?32:48,marginBottom:mobile?20:30}}>Your <span className="italic">Cart</span></h1>
      <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1.5fr 1fr',gap:mobile?24:40,alignItems:'flex-start'}}>
        <div>
          {!mobile && <div style={{display:'grid',gridTemplateColumns:'2fr 100px 100px 80px',padding:'12px 0',borderBottom:'1px solid var(--line)',fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)'}}>
            <span>PRODUCT</span><span style={{textAlign:'center'}}>QTY</span><span style={{textAlign:'right'}}>PRICE</span><span></span>
          </div>}
          {cart.map(it => mobile ? (
            <div key={it.cartId} style={{display:'flex',gap:12,padding:'14px 0',borderBottom:'1px solid var(--line-soft)',alignItems:'flex-start'}}>
              <div style={{width:72,height:72,borderRadius:8,overflow:'hidden',flexShrink:0}}><CartItemImage it={it} size={48}/></div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:'flex',justifyContent:'space-between',gap:8}}>
                  <div style={{fontFamily:'var(--display)',fontSize:15}}>{it.name}</div>
                  <button onClick={()=>remove(it.cartId)} style={{background:'none',border:0,cursor:'pointer',color:'var(--ink-mute)',padding:0}}><Icon.Trash/></button>
                </div>
                <div style={{fontSize:11,color:'var(--ink-mute)',margin:'2px 0 8px'}}>{it.finish} · {it.size}</div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <div style={{display:'inline-flex',alignItems:'center',border:'1px solid var(--line)',borderRadius:999}}>
                    <button onClick={()=>setQty(it.cartId,it.qty-1)} style={{background:'none',border:0,padding:'6px 10px',cursor:'pointer'}}><Icon.Minus/></button>
                    <span style={{padding:'0 6px',fontSize:13,minWidth:18,textAlign:'center'}}>{it.qty}</span>
                    <button onClick={()=>setQty(it.cartId,it.qty+1)} style={{background:'none',border:0,padding:'6px 10px',cursor:'pointer'}}><Icon.Plus/></button>
                  </div>
                  <div style={{fontSize:14,fontWeight:600}}>₹{(it.price*it.qty).toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          ) : (
            <div key={it.cartId} style={{display:'grid',gridTemplateColumns:'2fr 100px 100px 80px',gap:12,padding:'18px 0',borderBottom:'1px solid var(--line-soft)',alignItems:'center'}}>
              <div style={{display:'flex',gap:14,alignItems:'center'}}>
                <div style={{width:84,height:84,borderRadius:8,overflow:'hidden',flexShrink:0}}><CartItemImage it={it} size={56}/></div>
                <div>
                  <div style={{fontFamily:'var(--display)',fontSize:17}}>{it.name}</div>
                  <div style={{fontSize:12,color:'var(--ink-mute)',margin:'4px 0'}}>{it.finish} · {it.size}</div>
                  <button style={{background:'none',border:0,padding:0,fontSize:11,color:'var(--accent)',cursor:'pointer',letterSpacing:'.1em',textTransform:'uppercase'}}>Add gift wrap +₹99</button>
                </div>
              </div>
              <div style={{justifySelf:'center',display:'inline-flex',alignItems:'center',border:'1px solid var(--line)',borderRadius:999}}>
                <button onClick={()=>setQty(it.cartId,it.qty-1)} style={{background:'none',border:0,padding:'6px 10px',cursor:'pointer'}}><Icon.Minus/></button>
                <span style={{padding:'0 6px',fontSize:13,minWidth:18,textAlign:'center'}}>{it.qty}</span>
                <button onClick={()=>setQty(it.cartId,it.qty+1)} style={{background:'none',border:0,padding:'6px 10px',cursor:'pointer'}}><Icon.Plus/></button>
              </div>
              <div style={{textAlign:'right',fontWeight:600}}>₹{(it.price*it.qty).toLocaleString('en-IN')}</div>
              <button onClick={()=>remove(it.cartId)} style={{background:'none',border:0,cursor:'pointer',color:'var(--ink-mute)',justifySelf:'end'}}><Icon.Trash/></button>
            </div>
          ))}
          <div style={{marginTop:30,padding:18,background:'var(--bg-soft)',borderRadius:12,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}><Icon.Gift/><div><div style={{fontSize:14,fontWeight:500}}>Add ₹{Math.max(0,2500-sub).toLocaleString('en-IN')} more for free engraving</div><div style={{fontSize:12,color:'var(--ink-mute)'}}>Up to 24 characters in Devanagari or Latin script</div></div></div>
          </div>
        </div>
        <aside style={{position:mobile?'static':'sticky',top:90,padding:mobile?18:24,background:'var(--bg-soft)',borderRadius:14,border:'1px solid var(--line)'}}>
          <h3 style={{fontSize:22,marginBottom:18}}>Order Summary</h3>
          <div style={{display:'flex',gap:8,marginBottom:18}}>
            <input placeholder="Promo code" style={{flex:1,padding:'10px 12px',border:'1px solid var(--line)',borderRadius:8,fontSize:13,fontFamily:'var(--body)',background:'var(--bg)'}}/>
            <button className="btn btn-ghost btn-sm">Apply</button>
          </div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:14}}><span style={{color:'var(--ink-mute)'}}>Subtotal</span><span>₹{sub.toLocaleString('en-IN')}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:14}}><span style={{color:'var(--ink-mute)'}}>Shipping</span><span>{ship === 0 ? <span style={{color:'var(--peacock)'}}>FREE</span> : `₹${ship}`}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'8px 0',fontSize:14}}><span style={{color:'var(--ink-mute)'}}>GST (5%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',padding:'14px 0',fontFamily:'var(--display)',fontSize:24,borderTop:'1px dashed var(--line)',marginTop:8}}><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          <button onClick={()=>go('checkout')} className="btn btn-primary btn-lg btn-block" style={{marginTop:14}}>Proceed to Checkout <Icon.ArrowRight/></button>
          <div style={{display:'flex',gap:14,marginTop:14,justifyContent:'center',fontSize:10,color:'var(--ink-mute)',letterSpacing:'.14em'}}>
            <span>VISA</span><span>·</span><span>MASTERCARD</span><span>·</span><span>UPI</span><span>·</span><span>COD</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function StepBar({ step, mobile }) {
  const steps = ['Address', 'Payment', 'Confirm'];
  return (
    <div style={{display:'flex',gap:8,padding:mobile?'16px 16px':'24px 40px',borderBottom:'1px solid var(--line)',background:'var(--bg-soft)',justifyContent:'center'}}>
      {steps.map((s,i) => (
        <React.Fragment key={s}>
          <div style={{display:'flex',alignItems:'center',gap:mobile?6:10}}>
            <div style={{width:mobile?26:30,height:mobile?26:30,borderRadius:'50%',display:'grid',placeItems:'center',fontSize:13,background: i<=step?'var(--accent)':'var(--bg)',color: i<=step?'#fff':'var(--ink-mute)',border:`1px solid ${i<=step?'var(--accent)':'var(--line)'}`,fontWeight:500}}>{i < step ? <Icon.Check s={14}/> : i+1}</div>
            <div style={{fontSize:mobile?12:13,color: i<=step?'var(--ink)':'var(--ink-mute)',fontWeight:i===step?500:400}}>{s}</div>
          </div>
          {i < steps.length-1 && <div style={{width:mobile?20:60,height:1,background: i<step?'var(--accent)':'var(--line)',margin:'0 4px'}}/>}
        </React.Fragment>
      ))}
    </div>
  );
}

export function CheckoutPage({ cart, go, address, setAddress, mobile }) {
  const [selected, setSelected] = React.useState('a1');
  const [showNew, setShowNew] = React.useState(false);
  const [form, setForm] = React.useState({ name:'', phone:'', line:'', city:'', state:'', pin:'' });
  const [errors, setErrors] = React.useState({});
  const sub = cart.reduce((s,it)=>s+it.price*it.qty,0);
  const ship = sub > 999 ? 0 : 99;
  const tax = Math.round(sub * 0.05);
  const total = sub + ship + tax;

  function validate() {
    const e = {};
    if (!form.name || form.name.length<2) e.name = 'Enter full name';
    if (!/^(\+91[\s-]?)?[6-9]\d{9}$/.test(form.phone.replace(/\s/g,''))) e.phone = 'Enter valid 10-digit mobile';
    if (!form.line || form.line.length<5) e.line = 'Enter address';
    if (!form.city) e.city = 'Required';
    if (!/^\d{6}$/.test(form.pin)) e.pin = '6-digit PIN';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function continueToPayment() {
    if (showNew) {
      if (!validate()) return;
      setAddress({...form, id:'new', label:'New'});
    } else {
      const a = ADDRESSES.find(x => x.id === selected);
      setAddress(a);
    }
    go('payment');
  }

  return (
    <>
      <StepBar step={0} mobile={mobile}/>
      <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1.4fr 1fr',gap:mobile?24:40,padding:mobile?'24px 20px 60px':'40px 40px 70px'}}>
        <div>
          <h1 style={{fontSize:mobile?28:36,marginBottom:8}}>Delivery <span className="italic">Address</span></h1>
          <p style={{fontSize:13,color:'var(--ink-mute)',marginBottom:24}}>Where should we send your treasures?</p>

          {!showNew && (
            <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:18}}>
              {ADDRESSES.map(a => (
                <label key={a.id} style={{display:'flex',padding:18,border:`2px solid ${selected===a.id?'var(--accent)':'var(--line)'}`,borderRadius:12,cursor:'pointer',background: selected===a.id?'rgba(217,119,6,.04)':'var(--bg)',gap:14}}>
                  <input type="radio" checked={selected===a.id} onChange={()=>setSelected(a.id)} style={{accentColor:'var(--accent)',marginTop:4}}/>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:6}}>
                      <span style={{fontFamily:'var(--display)',fontSize:18}}>{a.label}</span>
                      {a.def && <span className="chip chip-accent">DEFAULT</span>}
                    </div>
                    <div style={{fontSize:14,marginBottom:2}}>{a.name} · {a.phone}</div>
                    <div style={{fontSize:13,color:'var(--ink-soft)',lineHeight:1.5}}>{a.line}, {a.city}, {a.state} – {a.pin}</div>
                  </div>
                  <button style={{background:'none',border:0,cursor:'pointer',color:'var(--ink-mute)',alignSelf:'flex-start'}}><Icon.Edit/></button>
                </label>
              ))}
              <button onClick={()=>setShowNew(true)} style={{padding:14,border:'1.5px dashed var(--line)',borderRadius:12,background:'transparent',cursor:'pointer',fontSize:14,color:'var(--ink-soft)',display:'flex',alignItems:'center',justifyContent:'center',gap:8}}>
                <Icon.Plus s={16}/> Add new address
              </button>
            </div>
          )}

          {showNew && (
            <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1fr 1fr',gap:14,padding:mobile?16:24,border:'1px solid var(--line)',borderRadius:12,background:'var(--bg)',marginBottom:18}}>
              <div className={`field ${errors.name?'error':''}`} style={{gridColumn:'span 2'}}><label>Full Name</label><input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Aarav Sharma"/>{errors.name && <div className="err">{errors.name}</div>}</div>
              <div className={`field ${errors.phone?'error':''}`}><label>Mobile</label><input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="+91 98765 43210"/>{errors.phone && <div className="err">{errors.phone}</div>}</div>
              <div className="field"><label>Email (optional)</label><input placeholder="you@email.com"/></div>
              <div className={`field ${errors.line?'error':''}`} style={{gridColumn:'span 2'}}><label>Address</label><textarea rows={2} value={form.line} onChange={e=>setForm({...form,line:e.target.value})} placeholder="Flat / House no., Street, Area"/>{errors.line && <div className="err">{errors.line}</div>}</div>
              <div className={`field ${errors.city?'error':''}`}><label>City</label><input value={form.city} onChange={e=>setForm({...form,city:e.target.value})}/>{errors.city && <div className="err">{errors.city}</div>}</div>
              <div className="field"><label>State</label><select value={form.state} onChange={e=>setForm({...form,state:e.target.value})}><option value="">Select state</option><option>Karnataka</option><option>Maharashtra</option><option>Tamil Nadu</option><option>Delhi</option><option>Gujarat</option></select></div>
              <div className={`field ${errors.pin?'error':''}`}><label>PIN code</label><input value={form.pin} onChange={e=>setForm({...form,pin:e.target.value})} maxLength={6}/>{errors.pin && <div className="err">{errors.pin}</div>}</div>
              <div className="field"><label>Address type</label>
                <div style={{display:'flex',gap:8}}>{['Home','Office','Other'].map(t => <button key={t} className="btn btn-ghost btn-sm" type="button">{t}</button>)}</div>
              </div>
              <div style={{gridColumn:'span 2',display:'flex',gap:10,justifyContent:'flex-end'}}>
                <button onClick={()=>setShowNew(false)} className="btn btn-ghost">Cancel</button>
                <button onClick={()=>{ if(validate()){ setShowNew(false); }}} className="btn btn-primary">Save Address</button>
              </div>
            </div>
          )}

          <div style={{padding:18,background:'var(--bg-soft)',borderRadius:10,display:'flex',gap:12,fontSize:13,color:'var(--ink-soft)',marginBottom:24}}>
            <Icon.Truck/>
            <div>Estimated delivery <strong>Wed, 29 Apr – Fri, 01 May 2026</strong> via BlueDart Express. Tracking shared on shipment.</div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
            <button onClick={()=>go('cart')} className="btn btn-ghost"><Icon.ArrowLeft/> Back to Cart</button>
            <button onClick={continueToPayment} className="btn btn-primary btn-lg" style={mobile?{flex:1}:{}}>Continue to Payment <Icon.ArrowRight/></button>
          </div>
        </div>
        <aside style={{padding:mobile?18:24,background:'var(--bg-soft)',borderRadius:14,position:mobile?'static':'sticky',top:90,border:'1px solid var(--line)',order:mobile?-1:0}}>
          <h3 style={{fontSize:18,marginBottom:14}}>Your Order ({cart.length})</h3>
          <div style={{maxHeight:280,overflowY:'auto'}}>
            {cart.map(it => (
              <div key={it.cartId} style={{display:'flex',gap:12,padding:'10px 0',borderBottom:'1px dashed var(--line)'}}>
                <div style={{width:54,height:54,borderRadius:6,overflow:'hidden',position:'relative'}}><CartItemImage it={it} size={36}/><span style={{position:'absolute',top:-4,right:-4,background:'var(--ink)',color:'var(--bg)',fontSize:10,minWidth:18,height:18,borderRadius:9,display:'grid',placeItems:'center',padding:'0 5px'}}>{it.qty}</span></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:13}}>{it.name}</div>
                  <div style={{fontSize:11,color:'var(--ink-mute)'}}>{it.finish} · {it.size}</div>
                </div>
                <div style={{fontSize:13,fontWeight:500}}>₹{(it.price*it.qty).toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>
          <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid var(--line)'}}>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}><span style={{color:'var(--ink-mute)'}}>Subtotal</span><span>₹{sub.toLocaleString('en-IN')}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}><span style={{color:'var(--ink-mute)'}}>Shipping</span><span>{ship===0?'FREE':`₹${ship}`}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:10}}><span style={{color:'var(--ink-mute)'}}>GST</span><span>₹{tax}</span></div>
            <div style={{display:'flex',justifyContent:'space-between',fontFamily:'var(--display)',fontSize:22,paddingTop:10,borderTop:'1px dashed var(--line)'}}><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          </div>
        </aside>
      </div>
    </>
  );
}

export function PaymentPage({ cart, go, address, onPlaceOrder, mobile }) {
  const [method, setMethod] = React.useState('upi');
  const [upi, setUpi] = React.useState('aarav@okhdfc');
  const [card, setCard] = React.useState({ num:'', name:'', exp:'', cvv:'' });
  const [processing, setProcessing] = React.useState(false);
  const sub = cart.reduce((s,it)=>s+it.price*it.qty,0);
  const ship = sub > 999 ? 0 : 99;
  const tax = Math.round(sub * 0.05);
  const total = sub + ship + tax;

  function pay() {
    setProcessing(true);
    setTimeout(() => { onPlaceOrder && onPlaceOrder(); go('confirmation'); }, 1600);
  }

  const methods = [
    { id:'upi', label:'UPI', sub:'GPay, PhonePe, Paytm', icon:'⚡' },
    { id:'card', label:'Credit/Debit Card', sub:'Visa, Mastercard, Rupay', icon:'💳' },
    { id:'netbanking', label:'Net Banking', sub:'All major Indian banks', icon:'🏦' },
    { id:'wallet', label:'Wallets', sub:'Paytm, Mobikwik, Amazon Pay', icon:'👛' },
    { id:'cod', label:'Cash on Delivery', sub:'Pay when you receive · ₹49 fee', icon:'💵' },
  ];

  return (
    <>
      <StepBar step={1} mobile={mobile}/>
      <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1.4fr 1fr',gap:mobile?24:40,padding:mobile?'24px 20px 60px':'40px 40px 70px'}}>
        <div>
          <h1 style={{fontSize:mobile?28:36,marginBottom:8}}>Payment <span className="italic">Method</span></h1>
          <p style={{fontSize:13,color:'var(--ink-mute)',marginBottom:24,display:'flex',alignItems:'center',gap:8}}><Icon.Lock s={14}/> Encrypted via TLS · PCI DSS compliant</p>

          <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
            {methods.map(m => (
              <label key={m.id} style={{display:'flex',padding:16,border:`2px solid ${method===m.id?'var(--accent)':'var(--line)'}`,borderRadius:12,cursor:'pointer',background: method===m.id?'rgba(217,119,6,.04)':'var(--bg)',gap:14,alignItems:'center'}}>
                <input type="radio" checked={method===m.id} onChange={()=>setMethod(m.id)} style={{accentColor:'var(--accent)'}}/>
                <span style={{fontSize:24}}>{m.icon}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:15,fontWeight:500}}>{m.label}</div>
                  <div style={{fontSize:12,color:'var(--ink-mute)'}}>{m.sub}</div>
                </div>
                {m.id === 'upi' && <span className="chip chip-peacock">RECOMMENDED</span>}
              </label>
            ))}
          </div>

          {method === 'upi' && (
            <div style={{padding:24,background:'var(--bg-soft)',borderRadius:12,marginBottom:24}}>
              <h4 style={{fontFamily:'var(--display)',fontSize:18,marginBottom:14}}>Pay via UPI</h4>
              <div className="field" style={{marginBottom:14}}>
                <label>UPI ID</label>
                <input value={upi} onChange={e=>setUpi(e.target.value)} placeholder="yourname@bank"/>
              </div>
              <div style={{display:'flex',gap:10}}>
                {['GPay','PhonePe','Paytm','BHIM'].map(a => (
                  <button key={a} className="btn btn-ghost btn-sm" style={{flex:1}}>{a}</button>
                ))}
              </div>
            </div>
          )}
          {method === 'card' && (
            <div style={{padding:mobile?16:24,background:'var(--bg-soft)',borderRadius:12,marginBottom:24}}>
              <h4 style={{fontFamily:'var(--display)',fontSize:18,marginBottom:14}}>Card Details</h4>
              <div style={{display:'grid',gridTemplateColumns:mobile?'1fr 1fr':'1fr 1fr',gap:14}}>
                <div className="field" style={{gridColumn:'span 2'}}><label>Card Number</label><input value={card.num} onChange={e=>setCard({...card,num:e.target.value})} placeholder="1234 5678 9012 3456" maxLength={19}/></div>
                <div className="field" style={{gridColumn:'span 2'}}><label>Cardholder Name</label><input value={card.name} onChange={e=>setCard({...card,name:e.target.value})} placeholder="AARAV SHARMA"/></div>
                <div className="field"><label>Expiry (MM/YY)</label><input value={card.exp} onChange={e=>setCard({...card,exp:e.target.value})} placeholder="08/29" maxLength={5}/></div>
                <div className="field"><label>CVV</label><input value={card.cvv} onChange={e=>setCard({...card,cvv:e.target.value})} type="password" maxLength={4} placeholder="•••"/></div>
              </div>
              <label style={{display:'flex',gap:8,marginTop:14,fontSize:13,alignItems:'center'}}><input type="checkbox" style={{accentColor:'var(--accent)'}}/>Save card securely for future payments</label>
            </div>
          )}
          {method === 'cod' && (
            <div style={{padding:24,background:'var(--bg-soft)',borderRadius:12,marginBottom:24,fontSize:13,color:'var(--ink-soft)',lineHeight:1.6}}>Cash on Delivery is available for orders below ₹15,000. A nominal fee of ₹49 will be added. Please keep exact change ready.</div>
          )}

          <div style={{padding:18,background:'rgba(14,107,107,.06)',border:'1px solid rgba(14,107,107,.2)',borderRadius:12,display:'flex',gap:12,marginBottom:24}}>
            <Icon.Shield s={20}/>
            <div style={{fontSize:13,color:'var(--ink-soft)'}}>Your payment is protected by <strong>Razorpay's 256-bit encryption</strong> and <strong>2-factor verification</strong>. We never store full card details.</div>
          </div>

          <div style={{display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap'}}>
            <button onClick={()=>go('checkout')} className="btn btn-ghost"><Icon.ArrowLeft/> Back</button>
            <button onClick={pay} disabled={processing} className="btn btn-primary btn-lg" style={mobile?{flex:1}:{}}>
              {processing ? (
                <><span className="spin" style={{display:'inline-block',width:16,height:16,border:'2px solid rgba(255,255,255,.3)',borderTopColor:'#fff',borderRadius:'50%'}}/> Processing securely...</>
              ) : (
                <><Icon.Lock s={14}/> Pay ₹{total.toLocaleString('en-IN')} <Icon.ArrowRight/></>
              )}
            </button>
          </div>
        </div>

        <aside style={{padding:mobile?18:24,background:'var(--bg-soft)',borderRadius:14,position:mobile?'static':'sticky',top:90,border:'1px solid var(--line)',height:'fit-content',order:mobile?-1:0}}>
          <h3 style={{fontSize:18,marginBottom:14}}>Order Total</h3>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}><span style={{color:'var(--ink-mute)'}}>Items ({cart.length})</span><span>₹{sub.toLocaleString('en-IN')}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:6}}><span style={{color:'var(--ink-mute)'}}>Shipping</span><span>{ship===0?'FREE':`₹${ship}`}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:10}}><span style={{color:'var(--ink-mute)'}}>GST (5%)</span><span>₹{tax}</span></div>
          <div style={{display:'flex',justifyContent:'space-between',fontFamily:'var(--display)',fontSize:24,paddingTop:10,borderTop:'1px dashed var(--line)'}}><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          {address && (
            <div style={{marginTop:18,paddingTop:18,borderTop:'1px solid var(--line)',fontSize:12}}>
              <div style={{color:'var(--ink-mute)',letterSpacing:'.14em',textTransform:'uppercase',marginBottom:6}}>Deliver to</div>
              <div style={{fontWeight:500}}>{address.name}</div>
              <div style={{color:'var(--ink-soft)',lineHeight:1.5}}>{address.line}, {address.city}, {address.state} – {address.pin}</div>
              <div style={{color:'var(--ink-mute)',marginTop:4}}>{address.phone}</div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}

export function ConfirmationPage({ cart, address, go, mobile }) {
  const sub = cart.reduce((s,it)=>s+it.price*it.qty,0);
  const ship = sub > 999 ? 0 : 99;
  const tax = Math.round(sub * 0.05);
  const total = sub + ship + tax;
  const orderId = React.useMemo(() => 'SAI-2087-' + Math.floor(4500 + Math.random()*500), []);

  return (
    <>
      <StepBar step={2} mobile={mobile}/>
      <div style={{padding:mobile?'30px 20px 60px':'50px 40px 70px',maxWidth:760,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:mobile?28:40}}>
          <div className="bouncein" style={{width:96,height:96,borderRadius:'50%',background:'rgba(14,107,107,.1)',border:'2px solid var(--peacock)',margin:'0 auto 18px',display:'grid',placeItems:'center',position:'relative'}}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" stroke="var(--peacock)" strokeWidth="3" className="check-anim"><path d="m10 20 7 7 14-15" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <div className="ornament" style={{maxWidth:140,margin:'0 auto 14px'}}>श्री</div>
          <h1 style={{fontSize:mobile?32:48,marginBottom:10}}>Thank you, <span className="italic" style={{color:'var(--accent)'}}>{address?.name?.split(' ')[0] || 'friend'}</span></h1>
          <p style={{fontSize:16,color:'var(--ink-soft)',maxWidth:480,margin:'0 auto'}}>Your order has been placed. A confirmation has been sent to your email and mobile.</p>
        </div>

        <div style={{padding:28,background:'var(--bg-soft)',borderRadius:14,marginBottom:24,border:'1px solid var(--line)'}}>
          <div style={{display:'flex',justifyContent:'space-between',marginBottom:18,paddingBottom:18,borderBottom:'1px dashed var(--line)',flexWrap:'wrap',gap:14}}>
            <div>
              <div style={{fontSize:11,letterSpacing:'.16em',color:'var(--ink-mute)',marginBottom:4}}>ORDER ID</div>
              <div style={{fontFamily:'var(--mono)',fontSize:18,fontWeight:600}}>{orderId}</div>
            </div>
            <div>
              <div style={{fontSize:11,letterSpacing:'.16em',color:'var(--ink-mute)',marginBottom:4}}>EXPECTED DELIVERY</div>
              <div style={{fontFamily:'var(--display)',fontSize:18}}>Wed, 29 Apr 2026</div>
            </div>
            <div>
              <div style={{fontSize:11,letterSpacing:'.16em',color:'var(--ink-mute)',marginBottom:4}}>AMOUNT PAID</div>
              <div style={{fontFamily:'var(--display)',fontSize:18,color:'var(--accent)'}}>₹{total.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {cart.map(it => (
            <div key={it.cartId} style={{display:'flex',gap:14,padding:'12px 0',alignItems:'center'}}>
              <div style={{width:60,height:60,borderRadius:8,overflow:'hidden'}}><CartItemImage it={it} size={42}/></div>
              <div style={{flex:1}}>
                <div style={{fontFamily:'var(--display)',fontSize:15}}>{it.name}</div>
                <div style={{fontSize:12,color:'var(--ink-mute)'}}>{it.finish} · {it.size} · Qty {it.qty}</div>
              </div>
              <div style={{fontWeight:500}}>₹{(it.price*it.qty).toLocaleString('en-IN')}</div>
            </div>
          ))}

          {address && (
            <div style={{marginTop:18,paddingTop:18,borderTop:'1px dashed var(--line)',fontSize:13}}>
              <div style={{fontSize:11,letterSpacing:'.16em',color:'var(--ink-mute)',marginBottom:6}}>SHIPPING TO</div>
              <div>{address.name} · {address.phone}</div>
              <div style={{color:'var(--ink-soft)'}}>{address.line}, {address.city}, {address.state} – {address.pin}</div>
            </div>
          )}
        </div>

        <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1fr 1fr',gap:14,marginBottom:30}}>
          <button onClick={()=>go('tracking')} className="btn btn-primary btn-lg">Track Order <Icon.ArrowRight/></button>
          <button onClick={()=>go('home')} className="btn btn-ghost btn-lg">Continue Shopping</button>
        </div>

        <div style={{padding:24,background:'rgba(217,119,6,.06)',border:'1px dashed rgba(217,119,6,.3)',borderRadius:12,textAlign:'center'}}>
          <p style={{fontFamily:'var(--display)',fontStyle:'italic',fontSize:18,color:'var(--ink-soft)',marginBottom:6}}>"Brass remembers the hand that shaped it."</p>
          <p style={{fontSize:12,color:'var(--ink-mute)'}}>A note from our workshop in Moradabad will arrive with your parcel.</p>
        </div>
      </div>
    </>
  );
}

export function TrackingPage({ go, mobile }) {
  const steps = [
    { t:'Order Placed', d:'21 Apr · 14:30', done:true, sub:'Confirmation sent to email & SMS' },
    { t:'Preparing in Workshop', d:'22 Apr · Moradabad', done:true, sub:'Polished by artisan Manjeet Tamrakar' },
    { t:'Shipped via BlueDart', d:'24 Apr · AWB 88412390-IN', done:true, sub:'Out of facility, en route to Bengaluru' },
    { t:'Out for Delivery', d:'Expected 29 Apr', done:false, sub:'Riders arrive between 10 AM and 6 PM' },
    { t:'Delivered', d:'Expected 29 Apr', done:false, sub:'Please be available to accept' },
  ];
  return (
    <div style={{padding:mobile?'24px 20px 60px':'40px 40px 80px',maxWidth:880,margin:'0 auto'}}>
      <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)',marginBottom:8}}>HOME · ACCOUNT · TRACK ORDER</div>
      <h1 style={{fontSize:mobile?28:42,marginBottom:6}}>Track <span className="italic">your order</span></h1>
      <div style={{fontFamily:'var(--mono)',fontSize:mobile?12:14,color:'var(--ink-soft)',marginBottom:mobile?20:30}}>SAI-2087-4412 · placed on 21 Apr 2026</div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:mobile?10:14,marginBottom:mobile?20:30}}>
        {[
          {l:'Carrier', v:'BlueDart Express'},
          {l:'AWB / Tracking', v:'88412390-IN'},
          {l:'Expected', v:'29 Apr 2026'},
          {l:'Items', v:'2 pieces'},
        ].map(x => (
          <div key={x.l} style={{padding:16,background:'var(--bg-soft)',borderRadius:10,border:'1px solid var(--line-soft)'}}>
            <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)',marginBottom:6}}>{x.l.toUpperCase()}</div>
            <div style={{fontSize:15,fontWeight:500}}>{x.v}</div>
          </div>
        ))}
      </div>

      <div style={{padding:mobile?20:30,background:'var(--bg)',border:'1px solid var(--line)',borderRadius:14}}>
        <h3 style={{fontSize:22,marginBottom:24}}>Journey of your parcel</h3>
        {steps.map((s,i) => (
          <div key={s.t} style={{display:'flex',gap:18,position:'relative',paddingBottom: i<steps.length-1?28:0}}>
            <div style={{position:'relative',display:'flex',flexDirection:'column',alignItems:'center'}}>
              <div style={{width:24,height:24,borderRadius:'50%',background: s.done?'var(--peacock)':'var(--bg)',border: s.done?'2px solid var(--peacock)':'2px solid var(--line)',color:'#fff',display:'grid',placeItems:'center',zIndex:2}}>
                {s.done && <Icon.Check s={12}/>}
              </div>
              {i < steps.length-1 && <div style={{flex:1,width:2,background: s.done?'var(--peacock)':'var(--line)',marginTop:2}}/>}
            </div>
            <div style={{flex:1,paddingBottom: i<steps.length-1?6:0}}>
              <div style={{fontFamily:'var(--display)',fontSize:18,color: s.done?'var(--ink)':'var(--ink-mute)'}}>{s.t}</div>
              <div style={{fontSize:12,color:'var(--ink-mute)',margin:'4px 0'}}>{s.d}</div>
              <div style={{fontSize:13,color:'var(--ink-soft)'}}>{s.sub}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{display:'flex',gap:12,marginTop:24,justifyContent:'center'}}>
        <button className="btn btn-ghost"><Icon.Phone/> Call support</button>
        <button className="btn btn-ghost">Need help?</button>
      </div>
    </div>
  );
}

export function LoginPage({ go, mobile }) {
  const [mode, setMode] = React.useState('signin');
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [stage, setStage] = React.useState('phone');
  const [err, setErr] = React.useState('');

  return (
    <div style={{minHeight:mobile?'auto':600,display:'grid',gridTemplateColumns:mobile?'1fr':'1fr 1fr'}}>
      <div style={{padding:mobile?'30px 24px 50px':'70px 70px',display:'flex',flexDirection:'column',justifyContent:'center',background:'var(--bg)'}}>
        <SaiMark/>
        <div style={{marginTop:mobile?28:50}}>
          <div className="tiny" style={{color:'var(--accent)',marginBottom:10}}>{mode==='signin'?'WELCOME BACK':'BEGIN YOUR JOURNEY'}</div>
          <h1 style={{fontSize:mobile?30:42,marginBottom:8,lineHeight:1.05}}>{mode==='signin' ? <>Sign in to <span className="italic">Sai Store</span></> : <>Create your <span className="italic">account</span></>}</h1>
          <p style={{fontSize:14,color:'var(--ink-mute)',marginBottom:30}}>{mode==='signin'?'We\'ll send a one-time code to your mobile.':'Join 32k+ households who treasure heritage utensils.'}</p>

          {stage === 'phone' && (
            <>
              {mode === 'signup' && (
                <>
                  <div className="field" style={{marginBottom:14}}><label>Full Name</label><input placeholder="Aarav Sharma"/></div>
                  <div className="field" style={{marginBottom:14}}><label>Email</label><input type="email" placeholder="you@example.com"/></div>
                </>
              )}
              <div className="field" style={{marginBottom:14}}>
                <label>Mobile number</label>
                <div style={{display:'flex',gap:8}}>
                  <select style={{width:90,padding:'12px 10px',border:'1px solid var(--line)',borderRadius:8,fontSize:14,fontFamily:'var(--body)',background:'var(--bg)'}}><option>+91</option></select>
                  <input value={phone} onChange={e=>{setPhone(e.target.value);setErr('');}} placeholder="98765 43210" maxLength={10} style={{flex:1}}/>
                </div>
                {err && <div className="err">{err}</div>}
              </div>
              {mode === 'signup' && (
                <>
                  <div className="field" style={{marginBottom:14}}><label>Date of birth</label><input type="date"/></div>
                  <label style={{display:'flex',gap:8,fontSize:12,color:'var(--ink-mute)',marginBottom:18}}><input type="checkbox" style={{accentColor:'var(--accent)'}}/>I agree to the Terms of Service & Privacy Policy</label>
                </>
              )}
              <button onClick={()=>{ if(!/^\d{10}$/.test(phone)) { setErr('Enter 10-digit mobile'); return; } setStage('otp'); }} className="btn btn-primary btn-lg btn-block">Send OTP <Icon.ArrowRight/></button>
            </>
          )}

          {stage === 'otp' && (
            <>
              <div style={{padding:14,background:'var(--bg-soft)',borderRadius:8,fontSize:13,marginBottom:20,color:'var(--ink-soft)'}}>OTP sent to <strong>+91 {phone}</strong> · <span style={{color:'var(--accent)',cursor:'pointer'}} onClick={()=>setStage('phone')}>Change</span></div>
              <div className="field" style={{marginBottom:14}}>
                <label>One-time code</label>
                <div style={{display:'flex',gap:8,justifyContent:'center'}}>
                  {[0,1,2,3,4,5].map(i => (
                    <input key={i} maxLength={1} value={otp[i]||''} onChange={e=>{const v = otp.slice(0,i)+e.target.value+otp.slice(i+1);setOtp(v);if(e.target.value && e.target.nextSibling) e.target.nextSibling.focus();}} style={{width:48,height:54,textAlign:'center',fontSize:22,fontFamily:'var(--display)',border:'1px solid var(--line)',borderRadius:8,background:'var(--bg)'}}/>
                  ))}
                </div>
              </div>
              <div style={{textAlign:'center',fontSize:12,color:'var(--ink-mute)',marginBottom:20}}>Resend in <span style={{color:'var(--accent)'}}>00:24</span></div>
              <button onClick={()=>go('account')} className="btn btn-primary btn-lg btn-block">Verify & Continue <Icon.ArrowRight/></button>
            </>
          )}

          <div style={{display:'flex',alignItems:'center',gap:10,margin:'24px 0',color:'var(--ink-mute)',fontSize:12}}>
            <div style={{flex:1,height:1,background:'var(--line)'}}/>OR<div style={{flex:1,height:1,background:'var(--line)'}}/>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            <button className="btn btn-ghost" onClick={()=>api.loginGoogle()}>Google</button>
            <button className="btn btn-ghost" disabled>Apple</button>
          </div>

          <div style={{marginTop:30,fontSize:13,color:'var(--ink-soft)',textAlign:'center'}}>
            {mode==='signin' ? <>New here? <span style={{color:'var(--accent)',cursor:'pointer',fontWeight:500}} onClick={()=>{setMode('signup');setStage('phone');}}>Create an account</span></> : <>Already have one? <span style={{color:'var(--accent)',cursor:'pointer',fontWeight:500}} onClick={()=>{setMode('signin');setStage('phone');}}>Sign in</span></>}
          </div>
        </div>
      </div>
      {!mobile && <div style={{position:'relative',background:'var(--bg-deep)',display:'grid',placeItems:'center',overflow:'hidden'}}>
        <ProdImg kind="diya" material="brass" big size={180} ratio="auto" label=""/>
        <div style={{position:'absolute',inset:0,padding:60,display:'flex',flexDirection:'column',justifyContent:'flex-end',background:'linear-gradient(to top, rgba(20,15,10,.6), transparent 60%)',color:'#fff'}}>
          <div className="ornament" style={{maxWidth:120,marginBottom:14,color:'var(--marigold)'}}>श्री</div>
          <h2 style={{fontSize:36,maxWidth:380,lineHeight:1.05}}>“The fire is older than most of us — only the hands change.”</h2>
          <p style={{fontSize:13,marginTop:14,opacity:.8}}>— Manjeet Tamrakar, Master Brass Artisan, Moradabad</p>
        </div>
      </div>}
    </div>
  );
}

export function AccountPage({ go, mobile }) {
  const { user, refresh, logout } = React.useContext(AuthContext);
  const initialTab = user && !user.profile_complete ? 'settings' : 'orders';
  const [tab, setTab] = React.useState(initialTab);
  const [orders, setOrders] = React.useState([]);
  const [addresses, setAddresses] = React.useState([]);

  React.useEffect(() => {
    if (!user) return;
    api.listOrders().then(setOrders).catch(() => setOrders([]));
    api.listAddresses().then(setAddresses).catch(() => setAddresses([]));
  }, [user]);

  if (!user) return null;

  const displayName = user.name || user.email || 'friend';
  const memberSince = formatMemberSince(user.created_at);
  const orderCount = orders.length;
  const incomplete = !user.profile_complete;

  const productThumb = ['lota','bottle','thali','diya'];
  const materialThumb = ['brass','copper'];

  return (
    <div style={{padding:mobile?'24px 20px 60px':'40px 40px 80px'}}>
      <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)',marginBottom:6}}>HOME · MY ACCOUNT</div>
      <h1 style={{fontSize:mobile?32:48,marginBottom:8}}>Namaste, <span className="italic" style={{color:'var(--accent)'}}>{firstName(displayName)}</span></h1>
      <p style={{fontSize:14,color:'var(--ink-mute)',marginBottom:30}}>
        {memberSince ? `Member since ${memberSince}` : 'Welcome to Sai Store'} · {orderCount} order{orderCount===1?'':'s'} · Heritage Member
      </p>

      {incomplete && (
        <div style={{padding:'14px 18px',background:'rgba(217,119,6,.08)',border:'1px solid rgba(217,119,6,.3)',borderRadius:10,marginBottom:24,display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
          <div style={{fontSize:13,color:'var(--ink-soft)'}}>
            <strong style={{color:'var(--ink)'}}>Complete your profile</strong> — we need a few details to ship orders, send updates, and personalise festive picks.
          </div>
          <button onClick={()=>setTab('settings')} className="btn btn-primary btn-sm">Complete profile <Icon.ArrowRight/></button>
        </div>
      )}

      <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'240px 1fr',gap:mobile?20:32}}>
        <aside style={mobile?{display:'flex',flexDirection:'column',gap:0,overflowX:'visible'}:undefined}>
          <div style={{padding:18,background:'var(--bg-soft)',borderRadius:12,marginBottom:14}}>
            {user.avatar_url
              ? <img src={user.avatar_url} alt="" style={{width:48,height:48,borderRadius:'50%',objectFit:'cover',marginBottom:10}}/>
              : <div style={{width:48,height:48,borderRadius:'50%',background:'var(--accent)',color:'#fff',display:'grid',placeItems:'center',fontFamily:'var(--display)',fontSize:22,marginBottom:10}}>{initials(user.name, user.email)}</div>
            }
            <div style={{fontFamily:'var(--display)',fontSize:18}}>{displayName}</div>
            <div style={{fontSize:12,color:'var(--ink-mute)'}}>{user.email}</div>
          </div>
          {[
            {id:'orders',label:'My Orders',n:orderCount},
            {id:'addresses',label:'Addresses',n:addresses.length},
            {id:'wishlist',label:'Wishlist'},
            {id:'rewards',label:'Heritage Points'},
            {id:'settings',label:'Settings'},
          ].map(t => (
            <div key={t.id} onClick={()=>setTab(t.id)} style={{padding:'12px 14px',cursor:'pointer',borderRadius:8,display:'flex',justifyContent:'space-between',fontSize:14,marginBottom:2,background: tab===t.id?'var(--bg-soft)':'transparent',color: tab===t.id?'var(--ink)':'var(--ink-soft)',fontWeight: tab===t.id?500:400}}>
              {t.label}{t.n != null && <span style={{color:'var(--ink-mute)',fontSize:12}}>{t.n}</span>}
            </div>
          ))}
          <button onClick={async ()=>{ await logout(); go('home'); }} style={{padding:'12px 14px',marginTop:14,background:'none',border:0,color:'var(--ink-mute)',fontSize:13,cursor:'pointer',width:'100%',textAlign:'left'}}>Sign out →</button>
        </aside>

        <div>
          {tab === 'orders' && (
            <>
              <h2 style={{fontSize:24,marginBottom:18}}>Order History</h2>
              {orders.length === 0 ? (
                <div className="card" style={{padding:30,textAlign:'center',color:'var(--ink-mute)'}}>
                  <p style={{fontSize:14,marginBottom:14}}>No orders yet. Discover something heirloom-worthy.</p>
                  <button onClick={()=>go('shop')} className="btn btn-primary btn-sm">Shop the collection <Icon.ArrowRight/></button>
                </div>
              ) : (
                <div style={{display:'flex',flexDirection:'column',gap:12}}>
                  {orders.map((o, i) => {
                    const placed = o.placed_at ? new Date(o.placed_at).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '';
                    return (
                      <div key={o.id} className="card" style={{padding:mobile?14:20,display:'grid',gridTemplateColumns:mobile?'auto 1fr auto':'auto 1fr auto auto',gap:mobile?12:20,alignItems:'center'}}>
                        <div style={{width:60,height:60,borderRadius:8,overflow:'hidden'}}><ProdImg kind={productThumb[i % 4]} material={materialThumb[i % 2]} size={40}/></div>
                        <div>
                          <div style={{fontFamily:'var(--mono)',fontSize:12,color:'var(--ink-mute)'}}>{o.id}</div>
                          <div style={{fontSize:15,marginTop:2}}>{o.items} item{o.items>1?'s':''} · ₹{Number(o.total).toLocaleString('en-IN')}</div>
                          <div style={{fontSize:12,color:'var(--ink-mute)',marginTop:2}}>Placed on {placed}</div>
                        </div>
                        <span className="chip chip-peacock">{o.status}</span>
                        <button onClick={()=>go('tracking')} className="btn btn-ghost btn-sm">View →</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
          {tab === 'addresses' && (
            <>
              <h2 style={{fontSize:24,marginBottom:18}}>Saved Addresses</h2>
              <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1fr 1fr',gap:14}}>
                {addresses.map(a => (
                  <div key={a.id} className="card" style={{padding:20,position:'relative'}}>
                    <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
                      <span style={{fontFamily:'var(--display)',fontSize:18}}>{a.label || 'Address'}</span>
                      {a.is_default && <span className="chip chip-accent">DEFAULT</span>}
                    </div>
                    <div style={{fontSize:13,marginBottom:4}}>{a.name}</div>
                    <div style={{fontSize:13,color:'var(--ink-soft)',lineHeight:1.5,marginBottom:6}}>{a.line}, {a.city}, {a.state} – {a.pin}</div>
                    <div style={{fontSize:12,color:'var(--ink-mute)'}}>{a.phone}</div>
                  </div>
                ))}
                {addresses.length === 0 && (
                  <div className="card" style={{padding:20,gridColumn:'span 2',color:'var(--ink-mute)',fontSize:13}}>No saved addresses yet. Add one at checkout.</div>
                )}
              </div>
            </>
          )}
          {tab === 'wishlist' && (
            <>
              <h2 style={{fontSize:24,marginBottom:18}}>My Wishlist</h2>
              <div className="card" style={{padding:30,textAlign:'center',color:'var(--ink-mute)',fontSize:13}}>Wishlist coming soon.</div>
            </>
          )}
          {tab === 'rewards' && (
            <div style={{padding:30,background:'linear-gradient(135deg, var(--accent), var(--terracotta))',borderRadius:14,color:'#fff'}}>
              <div className="tiny" style={{opacity:.85,marginBottom:8}}>HERITAGE MEMBER</div>
              <h2 style={{fontSize:48,fontFamily:'var(--display)'}}>0 <span style={{fontSize:18,fontStyle:'italic',opacity:.9}}>points</span></h2>
              <p style={{maxWidth:400,fontSize:14,opacity:.9,marginTop:8}}>Earn 1 point per ₹100 spent. Redeem 100 points for ₹50 off your next order.</p>
            </div>
          )}
          {tab === 'settings' && <AccountSettings user={user} refresh={refresh} mobile={mobile}/>}
        </div>
      </div>
    </div>
  );
}

function AccountSettings({ user, refresh, mobile }) {
  const [form, setForm] = React.useState({
    name: user.name || '',
    phone: user.phone || '',
    dob: user.dob ? String(user.dob).slice(0, 10) : '',
    gender: user.gender || '',
  });
  const [saving, setSaving] = React.useState(false);
  const [msg, setMsg] = React.useState('');

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setMsg(''); }

  async function save() {
    setSaving(true); setMsg('');
    try {
      await api.updateMe({
        name: form.name.trim() || null,
        phone: form.phone.trim() || null,
        dob: form.dob || null,
        gender: form.gender || null,
      });
      await refresh();
      setMsg('Saved');
    } catch (e) {
      setMsg(`Could not save — ${e?.message || 'try again.'}`);
    } finally {
      setSaving(false);
    }
  }

  const missing = !user.profile_complete;

  return (
    <>
      <h2 style={{fontSize:24,marginBottom:6}}>Account Settings</h2>
      <p style={{fontSize:13,color:'var(--ink-mute)',marginBottom:18}}>
        {missing ? 'Please complete the fields below — we use these to ship orders and send delivery updates.' : 'Update your details any time.'}
      </p>
      <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1fr 1fr',gap:14,maxWidth:600}}>
        <div className="field"><label>Full Name *</label><input value={form.name} onChange={e=>set('name', e.target.value)} placeholder="Your full name"/></div>
        <div className="field"><label>Email</label><input value={user.email || ''} disabled/></div>
        <div className="field"><label>Mobile *</label><input value={form.phone} onChange={e=>set('phone', e.target.value)} placeholder="+91 98765 43210"/></div>
        <div className="field"><label>Date of birth *</label><input type="date" value={form.dob} onChange={e=>set('dob', e.target.value)}/></div>
        <div className="field" style={{gridColumn:'span 2'}}>
          <label>Gender</label>
          <select value={form.gender} onChange={e=>set('gender', e.target.value)} style={{padding:'12px',border:'1px solid var(--line)',borderRadius:8,fontSize:14,background:'var(--bg)'}}>
            <option value="">Prefer not to say</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={{gridColumn:'span 2',display:'flex',gap:14,alignItems:'center'}}>
          <button onClick={save} disabled={saving} className="btn btn-primary">{saving ? 'Saving…' : 'Save changes'}</button>
          {msg && <span style={{fontSize:13,color: msg==='Saved' ? 'var(--peacock)' : 'var(--terracotta)'}}>{msg}</span>}
        </div>
      </div>
    </>
  );
}
