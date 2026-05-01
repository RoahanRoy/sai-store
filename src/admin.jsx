import React from 'react';
import { api } from './api.js';
import { AuthContext } from './App.jsx';

const ORDER_STATUSES = ['Placed', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];

const fmtMoney = (n) => '₹' + (n || 0).toLocaleString('en-IN');
const fmtDate = (d) => {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
};

function StatCard({ label, value, sub }) {
  return (
    <div style={{padding:'18px 20px',border:'1px solid var(--line)',borderRadius:12,background:'var(--bg-soft)'}}>
      <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)',textTransform:'uppercase'}}>{label}</div>
      <div style={{fontSize:28,fontFamily:'var(--display)',marginTop:6}}>{value}</div>
      {sub && <div style={{fontSize:12,color:'var(--ink-mute)',marginTop:4}}>{sub}</div>}
    </div>
  );
}

function Tabs({ tab, setTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'signups', label: 'Signups' },
    { id: 'orders',  label: 'Orders' },
    { id: 'products', label: 'Products' },
  ];
  return (
    <div style={{display:'flex',gap:4,borderBottom:'1px solid var(--line)',marginBottom:24}}>
      {tabs.map(t => (
        <button key={t.id} onClick={()=>setTab(t.id)}
          style={{
            background:'none',border:0,padding:'12px 18px',cursor:'pointer',
            fontSize:13,letterSpacing:'.08em',textTransform:'uppercase',
            borderBottom:tab===t.id?'2px solid var(--accent)':'2px solid transparent',
            color:tab===t.id?'var(--ink)':'var(--ink-mute)',
            marginBottom:-1
          }}>{t.label}</button>
      ))}
    </div>
  );
}

function Overview({ stats }) {
  if (!stats) return <div style={{color:'var(--ink-mute)'}}>Loading…</div>;
  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:14}}>
      <StatCard label="Total signups" value={stats.users_total} sub={`+${stats.users_last_7d} in last 7 days`}/>
      <StatCard label="Total orders" value={stats.orders_total} sub={`${stats.orders_last_24h} in last 24h`}/>
      <StatCard label="Lifetime revenue" value={fmtMoney(stats.revenue_total)}/>
      <StatCard label="Revenue (24h)" value={fmtMoney(stats.revenue_last_24h)}/>
    </div>
  );
}

function Signups() {
  const [rows, setRows] = React.useState(null);
  const [q, setQ] = React.useState('');
  React.useEffect(() => { api.adminSignups(200).then(setRows).catch(()=>setRows([])); }, []);
  if (!rows) return <div style={{color:'var(--ink-mute)'}}>Loading signups…</div>;
  const filtered = q
    ? rows.filter(r => (r.email||'').toLowerCase().includes(q.toLowerCase()) ||
                       (r.name||'').toLowerCase().includes(q.toLowerCase()))
    : rows;
  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
        <div style={{fontSize:13,color:'var(--ink-mute)'}}>{filtered.length} of {rows.length} users</div>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search email or name"
          style={{padding:'8px 12px',border:'1px solid var(--line)',borderRadius:8,fontSize:13,minWidth:240}}/>
      </div>
      <div style={{border:'1px solid var(--line)',borderRadius:12,overflow:'hidden'}}>
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
          <thead style={{background:'var(--bg-soft)'}}>
            <tr style={{textAlign:'left'}}>
              <Th>User</Th><Th>Email</Th><Th>Joined</Th><Th>Orders</Th><Th>LTV</Th><Th>Phone</Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{borderTop:'1px solid var(--line-soft)'}}>
                <Td>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    {u.avatar_url
                      ? <img src={u.avatar_url} alt="" width={28} height={28} style={{borderRadius:'50%'}}/>
                      : <div style={{width:28,height:28,borderRadius:'50%',background:'var(--bg-soft)',display:'grid',placeItems:'center',fontSize:11,color:'var(--ink-mute)'}}>{(u.name||u.email||'?')[0].toUpperCase()}</div>}
                    <span>{u.name || '—'}</span>
                    {u.is_admin && <span style={{fontSize:10,padding:'2px 6px',borderRadius:4,background:'var(--accent)',color:'#fff',letterSpacing:'.08em'}}>ADMIN</span>}
                  </div>
                </Td>
                <Td>{u.email}</Td>
                <Td>{fmtDate(u.created_at)}</Td>
                <Td>{u.orders_count}</Td>
                <Td>{fmtMoney(u.lifetime_value)}</Td>
                <Td>{u.phone || '—'}</Td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><Td colSpan={6} style={{textAlign:'center',color:'var(--ink-mute)',padding:24}}>No signups found.</Td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Orders() {
  const [rows, setRows] = React.useState(null);
  const [status, setStatus] = React.useState('');
  const [open, setOpen] = React.useState(null);

  const load = React.useCallback(() => {
    setRows(null);
    api.adminOrders(status ? { status } : {}).then(setRows).catch(()=>setRows([]));
  }, [status]);

  React.useEffect(() => { load(); }, [load]);

  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:14,alignItems:'center'}}>
        <span style={{fontSize:12,letterSpacing:'.1em',color:'var(--ink-mute)',textTransform:'uppercase'}}>Filter:</span>
        <select value={status} onChange={e=>setStatus(e.target.value)}
          style={{padding:'8px 10px',border:'1px solid var(--line)',borderRadius:8,fontSize:13}}>
          <option value="">All statuses</option>
          {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={load} style={{marginLeft:'auto',padding:'8px 14px',border:'1px solid var(--line)',borderRadius:8,background:'var(--bg-soft)',cursor:'pointer',fontSize:13}}>Refresh</button>
      </div>
      {!rows ? <div style={{color:'var(--ink-mute)'}}>Loading orders…</div> : (
        <div style={{border:'1px solid var(--line)',borderRadius:12,overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
            <thead style={{background:'var(--bg-soft)'}}>
              <tr style={{textAlign:'left'}}>
                <Th>Order</Th><Th>Customer</Th><Th>Placed</Th><Th>Items</Th><Th>Total</Th><Th>Status</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {rows.map(o => (
                <tr key={o.id} style={{borderTop:'1px solid var(--line-soft)'}}>
                  <Td><code style={{fontSize:12}}>{o.id}</code></Td>
                  <Td>
                    <div>{o.user_name || '—'}</div>
                    <div style={{fontSize:11,color:'var(--ink-mute)'}}>{o.user_email}</div>
                  </Td>
                  <Td>{fmtDate(o.placed_at)}</Td>
                  <Td>{o.items_count} ({o.units} units)</Td>
                  <Td>{fmtMoney(o.total)}</Td>
                  <Td><StatusPill status={o.status}/></Td>
                  <Td>
                    <button onClick={()=>setOpen(o.id)} style={{padding:'6px 10px',border:'1px solid var(--line)',borderRadius:6,background:'var(--bg)',cursor:'pointer',fontSize:12}}>View</button>
                  </Td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><Td colSpan={7} style={{textAlign:'center',color:'var(--ink-mute)',padding:24}}>No orders.</Td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {open && <OrderModal id={open} onClose={()=>{ setOpen(null); load(); }}/>}
    </div>
  );
}

function StatusPill({ status }) {
  const tone = {
    'Placed': '#6b7280', 'Packed': '#0891b2', 'Shipped': '#2563eb',
    'Out for Delivery': '#d97706', 'Delivered': '#16a34a', 'Cancelled': '#dc2626'
  }[status] || '#6b7280';
  return (
    <span style={{display:'inline-block',padding:'3px 10px',borderRadius:999,background:tone+'22',color:tone,fontSize:11,letterSpacing:'.06em',fontWeight:500}}>
      {status}
    </span>
  );
}

function OrderModal({ id, onClose }) {
  const [order, setOrder] = React.useState(null);
  const [saving, setSaving] = React.useState(false);

  const load = React.useCallback(() => {
    api.adminOrder(id).then(setOrder);
  }, [id]);
  React.useEffect(() => { load(); }, [load]);

  async function updateStatus(newStatus) {
    setSaving(true);
    try {
      const step = ORDER_STATUSES.indexOf(newStatus) + 1;
      await api.adminUpdateOrder(id, { status: newStatus, step });
      load();
    } finally { setSaving(false); }
  }

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',zIndex:200,display:'grid',placeItems:'center',padding:20}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'var(--bg)',borderRadius:14,maxWidth:720,width:'100%',maxHeight:'85vh',overflow:'auto',padding:28}}>
        {!order ? <div>Loading…</div> : (
          <>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18}}>
              <div>
                <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)'}}>ORDER</div>
                <h2 style={{fontSize:24,margin:'4px 0'}}>{order.id}</h2>
                <div style={{fontSize:13,color:'var(--ink-mute)'}}>{fmtDate(order.placed_at)}</div>
              </div>
              <button onClick={onClose} style={{background:'none',border:0,fontSize:22,cursor:'pointer',color:'var(--ink-mute)'}}>×</button>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:18,marginBottom:20}}>
              <Section title="Customer">
                <div>{order.user_name || '—'}</div>
                <div style={{fontSize:12,color:'var(--ink-mute)'}}>{order.user_email}</div>
              </Section>
              <Section title="Shipping">
                {order.line ? (
                  <>
                    <div>{order.ship_name}</div>
                    <div style={{fontSize:12,color:'var(--ink-mute)'}}>
                      {order.line}, {order.city}, {order.state} {order.pin}
                      {order.ship_phone ? ` · ${order.ship_phone}` : ''}
                    </div>
                  </>
                ) : <div style={{color:'var(--ink-mute)'}}>No address on file</div>}
              </Section>
            </div>

            <Section title="Items">
              <table style={{width:'100%',fontSize:13,borderCollapse:'collapse'}}>
                <thead><tr style={{textAlign:'left',color:'var(--ink-mute)',fontSize:11,letterSpacing:'.1em'}}>
                  <th style={{padding:'6px 0'}}>NAME</th><th>VARIANT</th><th>QTY</th><th style={{textAlign:'right'}}>PRICE</th>
                </tr></thead>
                <tbody>
                  {order.items.map(it => (
                    <tr key={it.id} style={{borderTop:'1px solid var(--line-soft)'}}>
                      <td style={{padding:'8px 0'}}>{it.name}</td>
                      <td style={{color:'var(--ink-mute)'}}>{[it.size, it.finish].filter(Boolean).join(' · ') || '—'}</td>
                      <td>{it.qty}</td>
                      <td style={{textAlign:'right'}}>{fmtMoney(it.unit_price * it.qty)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{marginTop:10,textAlign:'right',fontSize:15,fontWeight:500}}>Total: {fmtMoney(order.total)}</div>
            </Section>

            <Section title="Update status">
              <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                {ORDER_STATUSES.map(s => (
                  <button key={s} disabled={saving || order.status===s} onClick={()=>updateStatus(s)}
                    style={{
                      padding:'8px 12px',border:'1px solid var(--line)',borderRadius:8,
                      background: order.status===s ? 'var(--accent)' : '#fff',
                      color: order.status===s ? '#fff' : 'var(--ink)',
                      cursor: order.status===s ? 'default' : 'pointer',
                      fontSize:12, opacity: saving ? .6 : 1
                    }}>{s}</button>
                ))}
              </div>
            </Section>
          </>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{marginBottom:16}}>
      <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)',textTransform:'uppercase',marginBottom:8}}>{title}</div>
      {children}
    </div>
  );
}

const Th = ({ children }) => <th style={{padding:'10px 14px',fontSize:11,letterSpacing:'.1em',color:'var(--ink-mute)',fontWeight:500,textTransform:'uppercase'}}>{children}</th>;
const Td = ({ children, ...rest }) => <td {...rest} style={{padding:'12px 14px',verticalAlign:'middle',...(rest.style||{})}}>{children}</td>;

export function AdminPage({ go }) {
  const { user } = React.useContext(AuthContext);
  const [tab, setTab] = React.useState('overview');
  const [stats, setStats] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    api.adminStats().then(setStats).catch(e => setError(e.message || 'Failed'));
  }, []);

  if (!user) {
    return (
      <div style={{padding:'120px 40px',textAlign:'center'}}>
        <h2 style={{fontSize:32}}>Sign in required</h2>
        <p style={{color:'var(--ink-mute)',marginTop:8}}>The admin dashboard is restricted.</p>
        <button onClick={()=>go('login')} className="btn btn-primary" style={{marginTop:18}}>Sign in</button>
      </div>
    );
  }
  if (!user.is_admin) {
    return (
      <div style={{padding:'120px 40px',textAlign:'center'}}>
        <h2 style={{fontSize:32}}>Not authorised</h2>
        <p style={{color:'var(--ink-mute)',marginTop:8}}>
          Your account ({user.email}) does not have admin access.
        </p>
        <p style={{color:'var(--ink-mute)',fontSize:12,marginTop:6}}>
          Add your email to <code>ADMIN_EMAILS</code> in <code>.env</code>, or set <code>is_admin = TRUE</code> in the users table.
        </p>
      </div>
    );
  }

  return (
    <div style={{padding:'40px 40px 80px',maxWidth:1200,margin:'0 auto'}}>
      <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)',marginBottom:8}}>SAI STORE · ADMIN</div>
      <h1 style={{fontSize:42,marginBottom:24}}>Dashboard</h1>
      {error && <div style={{padding:12,background:'#fee',color:'#c00',borderRadius:8,marginBottom:16}}>{error}</div>}
      <Tabs tab={tab} setTab={setTab}/>
      {tab === 'overview' && <Overview stats={stats}/>}
      {tab === 'signups' && <Signups/>}
      {tab === 'orders' && <Orders/>}
      {tab === 'products' && <Products/>}
    </div>
  );
}

// ---------- Products ----------

const EMPTY_PRODUCT = {
  id: '', name: '', sub: '', material: 'brass', kind: 'lota', category_id: '',
  price: '', mrp: '', rating: '', reviews: 0, badge: '',
  finish: [], size: [], images: [],
  description: '', long_description: '',
};

function Products() {
  const [rows, setRows] = React.useState(null);
  const [cats, setCats] = React.useState([]);
  const [editing, setEditing] = React.useState(null); // product object or {} for new
  const [q, setQ] = React.useState('');

  const load = React.useCallback(() => {
    setRows(null);
    api.adminProducts().then(setRows).catch(()=>setRows([]));
  }, []);
  React.useEffect(() => { load(); api.adminCategories().then(setCats).catch(()=>{}); }, [load]);

  async function onDelete(p) {
    if (!confirm(`Delete product "${p.name}" (${p.id})? This cannot be undone.`)) return;
    await api.adminDeleteProduct(p.id);
    load();
  }

  const filtered = !rows ? [] : (q
    ? rows.filter(r => (r.name||'').toLowerCase().includes(q.toLowerCase()) ||
                       (r.id||'').toLowerCase().includes(q.toLowerCase()))
    : rows);

  return (
    <div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14,gap:12}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name or ID"
          style={{padding:'8px 12px',border:'1px solid var(--line)',borderRadius:8,fontSize:13,minWidth:260}}/>
        <button onClick={()=>setEditing({ ...EMPTY_PRODUCT })}
          style={{padding:'9px 16px',background:'var(--accent)',color:'#fff',border:0,borderRadius:8,cursor:'pointer',fontSize:13,fontWeight:500}}>
          + New product
        </button>
      </div>
      {!rows ? <div style={{color:'var(--ink-mute)'}}>Loading…</div> : (
        <div style={{border:'1px solid var(--line)',borderRadius:12,overflow:'hidden'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
            <thead style={{background:'var(--bg-soft)'}}>
              <tr style={{textAlign:'left'}}>
                <Th>ID</Th><Th>Name</Th><Th>Category</Th><Th>Material</Th><Th>Price</Th><Th>Images</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id} style={{borderTop:'1px solid var(--line-soft)'}}>
                  <Td><code style={{fontSize:12}}>{p.id}</code></Td>
                  <Td>
                    <div>{p.name}</div>
                    <div style={{fontSize:11,color:'var(--ink-mute)'}}>{p.sub}</div>
                  </Td>
                  <Td>{p.category_name || p.category_id || '—'}</Td>
                  <Td>{p.material || '—'}</Td>
                  <Td>{fmtMoney(p.price)} {p.mrp ? <span style={{color:'var(--ink-mute)',fontSize:11,textDecoration:'line-through',marginLeft:6}}>{fmtMoney(p.mrp)}</span> : null}</Td>
                  <Td>
                    {p.images && p.images.length
                      ? <div style={{display:'flex',gap:4}}>{p.images.slice(0,3).map((u,i) => <img key={i} src={u} alt="" width={28} height={28} style={{borderRadius:4,objectFit:'cover',border:'1px solid var(--line)'}}/>)}</div>
                      : <span style={{color:'var(--ink-mute)'}}>—</span>}
                  </Td>
                  <Td>
                    <div style={{display:'flex',gap:6}}>
                      <button onClick={()=>setEditing(p)} style={{padding:'6px 10px',border:'1px solid var(--line)',borderRadius:6,background:'var(--bg)',cursor:'pointer',fontSize:12}}>Edit</button>
                      <button onClick={()=>onDelete(p)} style={{padding:'6px 10px',border:'1px solid #dc2626',borderRadius:6,background:'var(--bg)',color:'#dc2626',cursor:'pointer',fontSize:12}}>Delete</button>
                    </div>
                  </Td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><Td colSpan={7} style={{textAlign:'center',color:'var(--ink-mute)',padding:24}}>No products.</Td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {editing && (
        <ProductForm
          initial={editing}
          isNew={!editing.created_at}
          categories={cats}
          onClose={()=>setEditing(null)}
          onSaved={()=>{ setEditing(null); load(); }}
        />
      )}
    </div>
  );
}

export function ProductForm({ initial, isNew, categories, onClose, onSaved }) {
  const [form, setForm] = React.useState(() => ({
    ...EMPTY_PRODUCT,
    ...initial,
    finish: initial.finish || [],
    size: initial.size || [],
    images: initial.images || [],
  }));
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState(null);

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function save(e) {
    e.preventDefault();
    setSaving(true); setError(null);
    try {
      const payload = {
        ...form,
        price: form.price === '' ? null : Number(form.price),
        mrp: form.mrp === '' ? null : Number(form.mrp),
        rating: form.rating === '' ? null : Number(form.rating),
        reviews: form.reviews === '' ? 0 : Number(form.reviews),
        finish: (form.finish || []).filter(Boolean),
        size: (form.size || []).filter(Boolean),
        images: (form.images || []).filter(Boolean),
      };
      if (isNew) await api.adminCreateProduct(payload);
      else await api.adminUpdateProduct(initial.id, payload);
      onSaved();
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div onClick={onClose} style={{position:'fixed',inset:0,background:'rgba(0,0,0,.5)',zIndex:200,display:'grid',placeItems:'center',padding:20}}>
      <form onClick={e=>e.stopPropagation()} onSubmit={save}
        style={{background:'var(--bg)',borderRadius:14,maxWidth:820,width:'100%',maxHeight:'90vh',overflow:'auto',padding:28}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:18}}>
          <div>
            <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)'}}>{isNew ? 'NEW PRODUCT' : 'EDIT PRODUCT'}</div>
            <h2 style={{fontSize:22,margin:'4px 0'}}>{form.name || 'Untitled product'}</h2>
          </div>
          <button type="button" onClick={onClose} style={{background:'none',border:0,fontSize:22,cursor:'pointer',color:'var(--ink-mute)'}}>×</button>
        </div>

        {error && <div style={{padding:10,background:'#fee',color:'#c00',borderRadius:8,marginBottom:14,fontSize:13}}>{error}</div>}

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
          <Field label="Product ID *" hint="Unique slug, e.g. p10">
            <input required disabled={!isNew} value={form.id} onChange={e=>set('id', e.target.value)} style={inputCss}/>
          </Field>
          <Field label="Name *">
            <input required value={form.name} onChange={e=>set('name', e.target.value)} style={inputCss}/>
          </Field>
          <Field label="Subtitle">
            <input value={form.sub || ''} onChange={e=>set('sub', e.target.value)} style={inputCss}/>
          </Field>
          <Field label="Badge" hint="e.g. Bestseller, New">
            <input value={form.badge || ''} onChange={e=>set('badge', e.target.value)} style={inputCss}/>
          </Field>
          <Field label="Category">
            <select value={form.category_id || ''} onChange={e=>set('category_id', e.target.value)} style={inputCss}>
              <option value="">— none —</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Kind" hint="e.g. lota, bottle, thali">
            <input value={form.kind || ''} onChange={e=>set('kind', e.target.value)} style={inputCss}/>
          </Field>
          <Field label="Material">
            <select value={form.material || ''} onChange={e=>set('material', e.target.value)} style={inputCss}>
              {['brass','copper','steel','silver','bronze','clay','wood'].map(m =>
                <option key={m} value={m}>{m}</option>
              )}
            </select>
          </Field>
          <Field label="Price (₹) *">
            <input required type="number" min="0" value={form.price} onChange={e=>set('price', e.target.value)} style={inputCss}/>
          </Field>
          <Field label="MRP (₹)">
            <input type="number" min="0" value={form.mrp || ''} onChange={e=>set('mrp', e.target.value)} style={inputCss}/>
          </Field>
          <Field label="Rating" hint="0–5, e.g. 4.7">
            <input type="number" step="0.1" min="0" max="5" value={form.rating || ''} onChange={e=>set('rating', e.target.value)} style={inputCss}/>
          </Field>
          <Field label="Reviews count">
            <input type="number" min="0" value={form.reviews || 0} onChange={e=>set('reviews', e.target.value)} style={inputCss}/>
          </Field>
        </div>

        <Field label="Finishes" hint="Comma-separated, e.g. Mirror, Antique">
          <input value={(form.finish || []).join(', ')} onChange={e=>set('finish', e.target.value.split(',').map(s=>s.trim()))} style={inputCss}/>
        </Field>

        <Field label="Sizes" hint="Comma-separated, e.g. 250ml, 500ml, 1L">
          <input value={(form.size || []).join(', ')} onChange={e=>set('size', e.target.value.split(',').map(s=>s.trim()))} style={inputCss}/>
        </Field>

        <Field label="Short description">
          <textarea rows={2} value={form.description || ''} onChange={e=>set('description', e.target.value)} style={{...inputCss,resize:'vertical'}}/>
        </Field>

        <Field label="Long description" hint="Shown in the details tab on the product page">
          <textarea rows={5} value={form.long_description || ''} onChange={e=>set('long_description', e.target.value)} style={{...inputCss,resize:'vertical'}}/>
        </Field>

        <ImageList images={form.images || []} onChange={imgs => set('images', imgs)}/>

        <div style={{display:'flex',justifyContent:'flex-end',gap:10,marginTop:22}}>
          <button type="button" onClick={onClose} style={{padding:'10px 18px',border:'1px solid var(--line)',borderRadius:8,background:'var(--bg)',cursor:'pointer',fontSize:13}}>Cancel</button>
          <button type="submit" disabled={saving}
            style={{padding:'10px 22px',border:0,borderRadius:8,background:'var(--accent)',color:'#fff',cursor:'pointer',fontSize:13,fontWeight:500,opacity:saving?.6:1}}>
            {saving ? 'Saving…' : (isNew ? 'Create product' : 'Save changes')}
          </button>
        </div>
      </form>
    </div>
  );
}

function ImageList({ images, onChange }) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [drag, setDrag] = React.useState(false);
  const fileInput = React.useRef(null);

  function update(i, v) { onChange(images.map((u, j) => j === i ? v : u)); }
  function add() { onChange([...images, '']); }
  function remove(i) { onChange(images.filter((_, j) => j !== i)); }
  function moveUp(i) {
    if (i === 0) return;
    const next = images.slice();
    [next[i-1], next[i]] = [next[i], next[i-1]];
    onChange(next);
  }

  async function uploadFiles(files) {
    if (!files || !files.length) return;
    setError(null); setUploading(true);
    try {
      const urls = [];
      for (const f of files) {
        if (!f.type.startsWith('image/')) throw new Error(`${f.name} is not an image`);
        const { url } = await api.adminUploadImage(f);
        urls.push(url);
      }
      onChange([...(images || []).filter(Boolean), ...urls]);
    } catch (e) {
      setError(e.message || 'Upload failed');
    } finally {
      setUploading(false);
      if (fileInput.current) fileInput.current.value = '';
    }
  }

  return (
    <Field label="Images" hint="First image is the hero. Drop files, click to pick, or paste a URL.">
      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <div
          onDragOver={e=>{e.preventDefault();setDrag(true);}}
          onDragLeave={()=>setDrag(false)}
          onDrop={e=>{e.preventDefault();setDrag(false);uploadFiles(Array.from(e.dataTransfer.files||[]));}}
          onClick={()=>fileInput.current?.click()}
          style={{
            border:`2px dashed ${drag?'var(--accent)':'var(--line)'}`,
            background:drag?'rgba(0,0,0,.02)':'var(--bg-soft)',
            borderRadius:10, padding:'18px 14px', textAlign:'center',
            cursor:'pointer', fontSize:13, color:'var(--ink-mute)'
          }}>
          {uploading ? 'Uploading…' : (drag ? 'Drop to upload' : 'Drop image files here, or click to choose')}
          <input ref={fileInput} type="file" accept="image/*" multiple style={{display:'none'}}
            onChange={e=>uploadFiles(Array.from(e.target.files||[]))}/>
        </div>
        {error && <div style={{fontSize:12,color:'#c00'}}>{error}</div>}

        {images.map((u, i) => (
          <div key={i} style={{display:'flex',gap:8,alignItems:'center'}}>
            <div style={{width:44,height:44,borderRadius:6,border:'1px solid var(--line)',overflow:'hidden',flexShrink:0,background:'var(--bg-soft)'}}>
              {u && <img src={u} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}} onError={e=>{e.target.style.display='none';}}/>}
            </div>
            <input value={u} onChange={e=>update(i, e.target.value)} placeholder="https://…" style={{...inputCss,marginTop:0}}/>
            {i === 0
              ? <span style={{fontSize:10,letterSpacing:'.1em',color:'var(--accent)',padding:'4px 6px'}}>HERO</span>
              : <button type="button" onClick={()=>moveUp(i)} title="Make hero" style={{padding:'8px 10px',border:'1px solid var(--line)',borderRadius:6,background:'var(--bg)',cursor:'pointer',fontSize:12}}>↑</button>}
            <button type="button" onClick={()=>remove(i)} style={{padding:'8px 10px',border:'1px solid var(--line)',borderRadius:6,background:'var(--bg)',cursor:'pointer',fontSize:12}}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={add}
          style={{alignSelf:'flex-start',padding:'8px 14px',border:'1px dashed var(--line)',borderRadius:8,background:'transparent',cursor:'pointer',fontSize:12}}>
          + Add image URL
        </button>
      </div>
    </Field>
  );
}

// ---- Inline Edit button for the public Shop / cards ----
// Looks up the product in the DB; if missing, prefills a "new" form from the passed object.
export function AdminEditProductButton({ product, style }) {
  const { user } = React.useContext(AuthContext);
  const [editing, setEditing] = React.useState(null);
  const [isNew, setIsNew] = React.useState(false);
  const [cats, setCats] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  if (!user || !user.is_admin) return null;

  async function open(e) {
    e.preventDefault(); e.stopPropagation();
    setLoading(true);
    try {
      const [catsRes, dbProduct] = await Promise.all([
        api.adminCategories().catch(() => []),
        api.adminProduct(product.id).catch(() => null),
      ]);
      setCats(catsRes || []);
      if (dbProduct) {
        setIsNew(false);
        setEditing(dbProduct);
      } else {
        setIsNew(true);
        setEditing({
          ...EMPTY_PRODUCT,
          id: product.id || '',
          name: product.name || '',
          sub: product.sub || '',
          material: product.material || 'brass',
          kind: product.kind || '',
          price: product.price || '',
          mrp: product.mrp || '',
          rating: product.rating || '',
          reviews: product.reviews || 0,
          finish: product.finish || [],
          size: product.size || [],
          badge: product.badge || '',
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={open} disabled={loading}
        style={{
          padding:'6px 10px', border:'1px solid var(--line)', borderRadius:6,
          background:'var(--bg)', cursor:'pointer', fontSize:11, letterSpacing:'.08em',
          textTransform:'uppercase', color:'var(--ink)',
          ...style,
        }}>
        {loading ? '…' : (isNew ? 'Edit' : 'Edit')}
      </button>
      {editing && (
        <ProductForm
          initial={editing}
          isNew={isNew}
          categories={cats}
          onClose={()=>setEditing(null)}
          onSaved={()=>setEditing(null)}
        />
      )}
    </>
  );
}

const inputCss = {
  width: '100%', padding: '9px 11px', border: '1px solid var(--line)',
  borderRadius: 8, fontSize: 13, fontFamily: 'inherit', marginTop: 4, background: '#fff',
};

function Field({ label, hint, children }) {
  return (
    <div style={{marginTop:12}}>
      <label style={{fontSize:11,letterSpacing:'.1em',color:'var(--ink-mute)',textTransform:'uppercase',display:'block'}}>{label}</label>
      {children}
      {hint && <div style={{fontSize:11,color:'var(--ink-mute)',marginTop:4}}>{hint}</div>}
    </div>
  );
}
