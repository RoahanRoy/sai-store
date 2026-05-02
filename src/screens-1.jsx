// Screens part 1: Home, Shop, Product, About, Gifts
import React from 'react';
import { CATEGORIES, REVIEWS_SAMPLE } from './data.js';
import { Icon, ProdImg, Stars } from './primitives.jsx';
import { ProductCard } from './chrome.jsx';
import { AdminEditProductButton } from './admin.jsx';
import { useProducts, useProduct } from './products-store.js';

function Hero({ variant = 'editorial', go, mobile }) {
  const heroProduct = useProduct('p2');
  const heroImg = (heroProduct?.images || []).find(Boolean);
  if (variant === 'split') {
    return (
      <section style={{display:'grid',gridTemplateColumns: mobile?'1fr':'1fr 1fr',minHeight: mobile?'auto':520,borderBottom:'1px solid var(--line)'}}>
        <div style={{padding: mobile?'40px 20px':'80px 60px',display:'flex',flexDirection:'column',justifyContent:'center',background:'var(--bg-soft)'}}>
          <div className="chip chip-accent" style={{alignSelf:'flex-start',marginBottom: mobile?16:24}}>✦ Akshaya Tritiya Edit</div>
          <h1 style={{fontSize: mobile?40:64,marginBottom: mobile?14:18,lineHeight:1}}>Vessels with<br/><span className="italic" style={{color:'var(--accent)'}}>a soul.</span></h1>
          <p style={{fontSize:mobile?14:16,color:'var(--ink-soft)',maxWidth:440,lineHeight:1.6,marginBottom: mobile?20:30}}>
            Brass, copper and steel utensils — slow-made by ten generations of metal-smiths in Moradabad and Tanjore. Heirlooms in waiting.
          </p>
          <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
            <button onClick={()=>go('shop')} className="btn btn-primary btn-lg">Shop the Collection <Icon.ArrowRight/></button>
            <button onClick={()=>go('about')} className="btn btn-ghost btn-lg">Our Story</button>
          </div>
          <div style={{display:'flex',gap: mobile?20:32,marginTop: mobile?28:40,fontSize:12,color:'var(--ink-mute)'}}>
            <div><div style={{fontFamily:'var(--display)',fontSize:24,color:'var(--ink)'}}>140+</div>artisan families</div>
            <div><div style={{fontFamily:'var(--display)',fontSize:24,color:'var(--ink)'}}>1962</div>since</div>
            <div><div style={{fontFamily:'var(--display)',fontSize:24,color:'var(--ink)'}}>4.8★</div>32k reviews</div>
          </div>
        </div>
        <div style={{position:'relative',background:'var(--bg-deep)',display:'grid',placeItems:'center',minHeight: mobile?320:'auto'}}>
          <ProdImg kind="lota" material="brass" big size={mobile?100:140} ratio="auto" label=""/>
          <div style={{position:'absolute',inset:0,display:'grid',placeItems:'center',pointerEvents:'none'}}>
            <div style={{width:mobile?180:240,height:mobile?180:240,border:'1px dashed rgba(217,119,6,.4)',borderRadius:'50%',position:'absolute'}}/>
            <div style={{width:mobile?260:340,height:mobile?260:340,border:'1px dashed rgba(217,119,6,.25)',borderRadius:'50%',position:'absolute'}}/>
          </div>
          <div style={{position:'absolute',bottom: mobile?16:30,left: mobile?16:30,right: mobile?16:30,display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
            <div>
              <div style={{fontSize:11,letterSpacing:'.2em',color:'var(--ink-mute)',marginBottom:4}}>FEATURED</div>
              <div style={{fontFamily:'var(--display)',fontSize:mobile?18:22}}>Sanchi Brass Lota</div>
              <div style={{fontSize:13,color:'var(--ink-mute)',fontStyle:'italic'}}>From ₹1,240</div>
            </div>
            <button onClick={()=>go('product','p1')} className="btn btn-dark btn-sm">View →</button>
          </div>
        </div>
      </section>
    );
  }
  if (variant === 'minimal') {
    return (
      <section style={{padding:mobile?'60px 20px 50px':'120px 40px 80px',textAlign:'center',borderBottom:'1px solid var(--line)'}}>
        <div className="ornament" style={{maxWidth:200,margin:'0 auto 24px'}}>✦</div>
        <h1 style={{fontSize:mobile?44:88,maxWidth:1000,margin:'0 auto 24px',lineHeight:.95}}>The art of <span className="italic" style={{color:'var(--accent)'}}>everyday rituals</span></h1>
        <p style={{fontSize:mobile?15:17,color:'var(--ink-soft)',maxWidth:560,margin:'0 auto 36px',lineHeight:1.6}}>Brass, copper and steel utensils — hand-forged for the kitchen, the temple and the table.</p>
        <button onClick={()=>go('shop')} className="btn btn-primary btn-lg">Browse the Edit <Icon.ArrowRight/></button>
      </section>
    );
  }
  return (
    <section style={{position:'relative',padding:mobile?'30px 20px 50px':'70px 40px 90px',background:'var(--bg-soft)',borderBottom:'1px solid var(--line)',overflow:'hidden'}}>
      <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1.1fr 1fr',gap:mobile?30:60,alignItems:'center',position:'relative',zIndex:2}}>
        <div>
          <div className="chip chip-plum" style={{marginBottom:22}}>✦ NEW · Akshaya Tritiya Edit</div>
          <h1 style={{fontSize:mobile?44:74,marginBottom:20,lineHeight:.98}}>
            Heirloom<br/>vessels for the<br/><span className="italic" style={{color:'var(--accent)'}}>modern home.</span>
          </h1>
          <p style={{fontSize:mobile?14:16,color:'var(--ink-soft)',maxWidth:480,lineHeight:1.65,marginBottom:24}}>
            Hand-crafted brass, copper and steel utensils — sourced directly from artisan families across Moradabad, Tanjore and Pembarthi since 1962.
          </p>
          <div style={{display:'flex',gap:12,marginBottom:24,flexWrap:'wrap'}}>
            <button onClick={()=>go('shop')} className="btn btn-primary btn-lg">Shop the Edit <Icon.ArrowRight/></button>
            <button onClick={()=>go('gifts')} className="btn btn-ghost btn-lg">Gift Hampers</button>
          </div>
          <div style={{display:'flex',gap:mobile?14:24,fontSize:11,color:'var(--ink-mute)',letterSpacing:'.12em',textTransform:'uppercase',flexWrap:'wrap'}}>
            <span>✓ Lifetime tin re-coating</span>
            <span>✓ COD across India</span>
          </div>
        </div>
        <div onClick={()=>go('product','p2')} style={{position:'relative',aspectRatio:'4/5',cursor:'pointer'}}>
          <div style={{position:'absolute',inset:0,background:'var(--bg-deep)',borderRadius:'200px 200px 12px 12px',overflow:'hidden'}}>
            {heroImg
              ? <img src={heroImg} alt={heroProduct?.name || 'Tamra Copper Bottle'} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
              : <ProdImg kind="bottle" material="copper" big size={180} ratio="auto" label=""/>}
          </div>
          <div style={{position:'absolute',top:30,right:-20,width:120,height:120,background:'var(--accent)',color:'#fff',borderRadius:'50%',display:'grid',placeItems:'center',textAlign:'center',fontFamily:'var(--display)',fontStyle:'italic',fontSize:13,padding:14,lineHeight:1.2,transform:'rotate(8deg)'}}>
            <div>Tamra<br/>Copper Bottle<br/><span style={{fontStyle:'normal',fontSize:11,letterSpacing:'.1em'}}>FROM ₹1,899</span></div>
          </div>
          <div style={{position:'absolute',bottom:-10,left:-10,fontFamily:'var(--display)',fontStyle:'italic',fontSize:60,color:'rgba(217,119,6,.15)',pointerEvents:'none'}}>est. 1962</div>
        </div>
      </div>
      {!mobile && <div style={{position:'absolute',top:20,left:40,opacity:.3,fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.2em'}}>VOL · 26 · 04</div>}
      {!mobile && <div style={{position:'absolute',top:20,right:40,opacity:.3,fontFamily:'var(--mono)',fontSize:10,letterSpacing:'.2em'}}>BHARAT · 🇮🇳</div>}
    </section>
  );
}

function ValuesStrip({ mobile }) {
  const items = [
    { icon: 'Truck', title: 'Free Shipping', sub: 'On orders above ₹999' },
    { icon: 'Shield', title: 'Lifetime Care', sub: 'Free tin re-coating' },
    { icon: 'Leaf', title: 'Ayurveda Approved', sub: 'Doctor-recommended copper' },
    { icon: 'Gift', title: 'Gift-Ready', sub: 'Wrapped & engraved free' },
  ];
  return (
    <section style={{padding:mobile?'20px':'28px 40px',borderBottom:'1px solid var(--line)',background:'var(--bg)'}}>
      <div style={{display:'grid',gridTemplateColumns:mobile?'repeat(2,1fr)':'repeat(4,1fr)',gap:mobile?16:30}}>
        {items.map(it => {
          const I = Icon[it.icon];
          return (
            <div key={it.title} style={{display:'flex',alignItems:'center',gap:14}}>
              <div style={{width:42,height:42,borderRadius:'50%',border:'1px solid var(--line)',display:'grid',placeItems:'center',color:'var(--accent)'}}><I s={20}/></div>
              <div>
                <div style={{fontSize:14,fontWeight:500}}>{it.title}</div>
                <div style={{fontSize:12,color:'var(--ink-mute)'}}>{it.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function CategoryGrid({ go, mobile }) {
  return (
    <section style={{padding:mobile?'40px 20px':'70px 40px',borderBottom:'1px solid var(--line)'}}>
      <div style={{textAlign:'center',marginBottom:mobile?24:40}}>
        <div className="ornament" style={{maxWidth:140,margin:'0 auto 12px'}}>श्री</div>
        <h2 style={{fontSize:mobile?28:42,marginBottom:8}}>Shop by <span className="italic" style={{color:'var(--accent)'}}>collection</span></h2>
        <p style={{color:'var(--ink-mute)',fontSize:14}}>Six curated edits across brass, copper and steel.</p>
      </div>
      <div style={{display:'grid',gridTemplateColumns:mobile?'repeat(2,1fr)':'repeat(3,1fr)',gap:mobile?12:18}}>
        {CATEGORIES.map((c, i) => (
          <div key={c.id} onClick={()=>go('shop',c.id)} className="card" style={{cursor:'pointer',padding:0,position:'relative',aspectRatio: i<3?'4/5':'4/3'}}>
            <ProdImg kind={c.kind} material={c.material} ratio="auto" big size={i<3?80:60}/>
            <div style={{position:'absolute',bottom:0,left:0,right:0,padding:20,background:'linear-gradient(to top, rgba(20,15,10,.7), transparent)',color:'#fff',display:'flex',justifyContent:'space-between',alignItems:'flex-end'}}>
              <div>
                <h3 style={{fontSize:24,marginBottom:2}}>{c.name}</h3>
                <div style={{fontSize:11,opacity:.8,letterSpacing:'.1em'}}>{c.count} PIECES</div>
              </div>
              <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,.15)',backdropFilter:'blur(8px)',display:'grid',placeItems:'center'}}><Icon.ArrowRight/></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeaturedProducts({ go, onAdd, cardVariant, mobile }) {
  const products = useProducts();
  return (
    <section style={{padding:mobile?'40px 20px':'70px 40px',borderBottom:'1px solid var(--line)',background:'var(--bg-soft)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:mobile?'flex-start':'flex-end',marginBottom:mobile?24:36,flexDirection:mobile?'column':'row',gap:mobile?10:0}}>
        <div>
          <div className="tiny" style={{color:'var(--accent)',marginBottom:8}}>✦ The Edit</div>
          <h2 style={{fontSize:mobile?28:42}}>This week's <span className="italic">favourites</span></h2>
        </div>
        <button onClick={()=>go('shop')} className="btn btn-link">View all 159 →</button>
      </div>
      <div style={{display:'grid',gridTemplateColumns:mobile?'repeat(2,1fr)':'repeat(4,1fr)',gap:mobile?12:18}}>
        {products.slice(0,4).map(p => <ProductCard key={p.id} p={p} onClick={()=>go('product',p.id)} onAdd={onAdd} variant={cardVariant}/>)}
      </div>
    </section>
  );
}

function ArtisanStory({ go, mobile }) {
  return (
    <section style={{padding:mobile?'50px 20px':'90px 40px',display:'grid',gridTemplateColumns:mobile?'1fr':'1fr 1.1fr',gap:mobile?28:60,alignItems:'center',borderBottom:'1px solid var(--line)'}}>
      <div style={{position:'relative',aspectRatio:'5/6',background:'var(--bg-deep)',borderRadius:'12px 12px 200px 200px',overflow:'hidden'}}>
        <ProdImg kind="kadhai" material="brass" ratio="auto" big size={150} label="WORKSHOP · MORADABAD"/>
        <div style={{position:'absolute',top:20,left:20,fontFamily:'var(--mono)',fontSize:9,letterSpacing:'.2em',background:'var(--bg)',padding:'4px 8px',borderRadius:3,color:'var(--ink-soft)'}}>FILM 35MM · 04 / 12</div>
      </div>
      <div>
        <div className="tiny" style={{color:'var(--accent)',marginBottom:14}}>OUR ARTISANS</div>
        <h2 style={{fontSize:mobile?32:48,marginBottom:18,lineHeight:1.05}}>Made by <span className="italic" style={{color:'var(--accent)'}}>hands,</span><br/>not by haste.</h2>
        <p style={{fontSize:16,color:'var(--ink-soft)',lineHeight:1.7,marginBottom:18,maxWidth:500}}>
          Every Sai Store piece passes through the workshop of a single artisan family — from sand-casting to scaling, polishing to engraving. A copper bottle takes three days. A wedding thali, eleven.
        </p>
        <p style={{fontSize:16,color:'var(--ink-soft)',lineHeight:1.7,marginBottom:28,maxWidth:500,fontFamily:'var(--display)',fontStyle:'italic'}}>
          “Brass remembers the hand that shaped it. Steel remembers the fire.”
        </p>
        <button onClick={()=>go('about')} className="btn btn-ghost">Meet the artisans <Icon.ArrowRight/></button>
      </div>
    </section>
  );
}

function ReviewsSection({ mobile }) {
  return (
    <section style={{padding:mobile?'50px 20px':'80px 40px',borderBottom:'1px solid var(--line)'}}>
      <div style={{textAlign:'center',marginBottom:mobile?24:40}}>
        <Stars value={4.8} size={18} count={false}/>
        <div style={{fontSize:13,color:'var(--ink-mute)',marginTop:6,marginBottom:12}}>4.8 from 32,418 verified reviews</div>
        <h2 style={{fontSize:mobile?26:36}}>What our <span className="italic">family</span> says</h2>
      </div>
      <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'repeat(3,1fr)',gap:mobile?12:18}}>
        {REVIEWS_SAMPLE.map(r => (
          <div key={r.name} className="card" style={{padding:24}}>
            <Stars value={r.rating} size={13} count={false}/>
            <h4 style={{fontFamily:'var(--display)',fontSize:18,margin:'12px 0 8px'}}>{r.title}</h4>
            <p style={{fontSize:13,color:'var(--ink-soft)',lineHeight:1.6,marginBottom:14}}>{r.body}</p>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--ink-mute)',paddingTop:12,borderTop:'1px solid var(--line-soft)'}}>
              <span>{r.name} · {r.loc}</span><span>{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomePage({ go, onAdd, heroVariant, cardVariant, mobile }) {
  return (
    <>
      <Hero variant={heroVariant} go={go} mobile={mobile}/>
      <ValuesStrip mobile={mobile}/>
      <CategoryGrid go={go} mobile={mobile}/>
      <FeaturedProducts go={go} onAdd={onAdd} cardVariant={cardVariant} mobile={mobile}/>
      <ArtisanStory go={go} mobile={mobile}/>
      <ReviewsSection mobile={mobile}/>
    </>
  );
}

export function ShopPage({ go, onAdd, cardVariant, mobile }) {
  const products = useProducts();
  const [filterMat, setFilterMat] = React.useState('all');
  const [sort, setSort] = React.useState('featured');
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  const filtered = filterMat === 'all' ? products : products.filter(p => p.material === filterMat);
  return (
    <>
      <div style={{padding:mobile?'24px 20px 16px':'40px 40px 24px',borderBottom:'1px solid var(--line)',background:'var(--bg-soft)'}}>
        <div style={{fontSize:11,letterSpacing:'.16em',color:'var(--ink-mute)',marginBottom:12}}>HOME · SHOP ALL</div>
        <h1 style={{fontSize:mobile?36:54,marginBottom:8}}>The <span className="italic" style={{color:'var(--accent)'}}>Collection</span></h1>
        <p style={{fontSize:14,color:'var(--ink-soft)',maxWidth:500}}>159 hand-crafted vessels across brass, copper and steel.</p>
      </div>
      {mobile && (
        <div style={{display:'flex',gap:8,padding:'12px 20px',borderBottom:'1px solid var(--line-soft)',background:'var(--bg)',position:'sticky',top:57,zIndex:20}}>
          <button onClick={()=>setFiltersOpen(true)} className="btn btn-ghost btn-sm" style={{flex:1}}>Filter · {filterMat==='all'?'All':filterMat}</button>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={{flex:1,border:'1px solid var(--line)',padding:'6px 10px',borderRadius:999,fontSize:13,background:'var(--bg)',fontFamily:'var(--body)',color:'var(--ink)'}}>
            <option>Featured</option><option>Newest</option><option>Price: Low to High</option><option>Best Selling</option>
          </select>
        </div>
      )}
      {mobile && filtersOpen && (
        <div onClick={()=>setFiltersOpen(false)} style={{position:'fixed',inset:0,background:'rgba(20,15,10,.5)',zIndex:90,display:'flex',alignItems:'flex-end'}}>
          <div onClick={e=>e.stopPropagation()} style={{width:'100%',maxHeight:'80vh',background:'var(--bg)',borderRadius:'18px 18px 0 0',padding:'18px 20px 28px',overflowY:'auto'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <h3 style={{fontSize:20}}>Filter</h3>
              <button onClick={()=>setFiltersOpen(false)} style={{background:'none',border:0,cursor:'pointer',color:'var(--ink)',padding:6}}><Icon.X/></button>
            </div>
            <h4 style={{fontSize:13,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:10}}>Material</h4>
            {[
              {id:'all',label:'All Materials',count:159},
              {id:'brass',label:'Brass',count:74},
              {id:'copper',label:'Copper',count:38},
              {id:'steel',label:'Steel',count:47},
            ].map(m => (
              <label key={m.id} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',cursor:'pointer',fontSize:14,color:filterMat===m.id?'var(--accent)':'var(--ink)'}}>
                <span style={{display:'flex',alignItems:'center',gap:10}}>
                  <input type="radio" checked={filterMat===m.id} onChange={()=>setFilterMat(m.id)} style={{accentColor:'var(--accent)'}}/>{m.label}
                </span>
                <span style={{color:'var(--ink-mute)',fontSize:12}}>({m.count})</span>
              </label>
            ))}
            <button onClick={()=>setFiltersOpen(false)} className="btn btn-primary btn-block btn-lg" style={{marginTop:18}}>Show {filtered.length} results</button>
          </div>
        </div>
      )}
      <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'240px 1fr',gap:mobile?0:32,padding:mobile?'20px':'32px 40px'}}>
        {!mobile && <aside>
          <div style={{position:'sticky',top:90}}>
            <h4 style={{fontSize:13,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--ink-mute)',marginBottom:14}}>Material</h4>
            {[
              {id:'all',label:'All Materials',count:159},
              {id:'brass',label:'Brass',count:74},
              {id:'copper',label:'Copper',count:38},
              {id:'steel',label:'Steel',count:47},
            ].map(m => (
              <label key={m.id} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',cursor:'pointer',fontSize:14,color:filterMat===m.id?'var(--accent)':'var(--ink)'}}>
                <span style={{display:'flex',alignItems:'center',gap:10}}>
                  <input type="radio" checked={filterMat===m.id} onChange={()=>setFilterMat(m.id)} style={{accentColor:'var(--accent)'}}/>{m.label}
                </span>
                <span style={{color:'var(--ink-mute)',fontSize:12}}>({m.count})</span>
              </label>
            ))}

            <h4 style={{fontSize:13,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--ink-mute)',margin:'24px 0 14px'}}>Category</h4>
            {['Pooja & Ritual','Wellness','Serveware','Cookware','Storage','Gifts'].map(c => (
              <label key={c} style={{display:'flex',padding:'7px 0',cursor:'pointer',fontSize:14,gap:10,alignItems:'center'}}>
                <input type="checkbox" style={{accentColor:'var(--accent)'}}/>{c}
              </label>
            ))}

            <h4 style={{fontSize:13,letterSpacing:'.16em',textTransform:'uppercase',color:'var(--ink-mute)',margin:'24px 0 14px'}}>Price</h4>
            <div style={{padding:'4px 0'}}>
              <input type="range" min="0" max="10000" defaultValue="5000" style={{width:'100%',accentColor:'var(--accent)'}}/>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'var(--ink-mute)',marginTop:4}}><span>₹0</span><span>₹10,000+</span></div>
            </div>
          </div>
        </aside>}
        <div>
          {!mobile && <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20,paddingBottom:14,borderBottom:'1px solid var(--line-soft)'}}>
            <div style={{fontSize:13,color:'var(--ink-mute)'}}>Showing <strong style={{color:'var(--ink)'}}>{filtered.length}</strong> of {products.length}</div>
            <div style={{display:'flex',gap:14,alignItems:'center'}}>
              <span style={{fontSize:12,color:'var(--ink-mute)'}}>Sort:</span>
              <select value={sort} onChange={e=>setSort(e.target.value)} style={{border:'1px solid var(--line)',padding:'6px 10px',borderRadius:6,fontSize:13,background:'var(--bg)',fontFamily:'var(--body)'}}>
                <option>Featured</option><option>Newest</option><option>Price: Low to High</option><option>Best Selling</option>
              </select>
            </div>
          </div>}
          {mobile && <div style={{fontSize:12,color:'var(--ink-mute)',marginBottom:14}}>Showing <strong style={{color:'var(--ink)'}}>{filtered.length}</strong> of {products.length}</div>}
          <div style={{display:'grid',gridTemplateColumns:mobile?'repeat(2,1fr)':'repeat(3,1fr)',gap:mobile?12:18}}>
            {filtered.map(p => <ProductCard key={p.id} p={p} onClick={()=>go('product',p.id)} onAdd={onAdd} variant={cardVariant}/>)}
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductPage({ id, go, onAdd, addPing, mobile }) {
  const products = useProducts();
  const p = useProduct(id);
  const [size, setSize] = React.useState(p.size[0]);
  const [finish, setFinish] = React.useState(p.finish[0]);
  const [qty, setQty] = React.useState(1);
  const [tab, setTab] = React.useState('details');
  const [imgIdx, setImgIdx] = React.useState(0);
  const off = Math.round((1 - p.price/p.mrp)*100);
  const images = (p.images || []).filter(Boolean);
  const angles = ['Front', 'Side', '3/4', 'Detail'];
  const thumbs = images.length ? images.slice(0, 6) : angles;
  const activeIdx = Math.min(imgIdx, thumbs.length - 1);
  const heroImg = images[activeIdx];

  return (
    <>
      <div style={{fontSize:11,letterSpacing:'.14em',color:'var(--ink-mute)',padding:mobile?'12px 20px':'18px 40px',borderBottom:'1px solid var(--line-soft)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
        HOME · SHOP · {p.cat.toUpperCase()} · <span style={{color:'var(--ink)'}}>{p.name.toUpperCase()}</span>
      </div>
      <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1.05fr 1fr',gap:mobile?24:50,padding:mobile?'20px 20px 40px':'36px 40px 60px'}}>
        <div style={{display:'flex',gap:mobile?10:14,flexDirection:mobile?'column-reverse':'row'}}>
          <div style={{display:'flex',flexDirection:mobile?'row':'column',gap:10,overflowX:mobile?'auto':'visible'}}>
            {thumbs.map((t,i) => (
              <div key={i} onClick={()=>setImgIdx(i)} style={{width:mobile?56:64,height:mobile?56:80,borderRadius:8,overflow:'hidden',border: activeIdx===i?'2px solid var(--accent)':'1px solid var(--line)',cursor:'pointer',flexShrink:0}}>
                {images.length
                  ? <img src={t} alt="" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                  : <ProdImg kind={p.kind} material={p.material} ratio="auto" size={36} label=""/>}
              </div>
            ))}
          </div>
          <div style={{flex:1,position:'relative'}}>
            {heroImg
              ? <div style={{aspectRatio:'4/5',background:'var(--bg-soft)',borderRadius:12,overflow:'hidden'}}>
                  <img src={heroImg} alt={p.name} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                </div>
              : <ProdImg kind={p.kind} material={p.material} big size={180} ratio="4/5" label={angles[activeIdx] || ''}/>}
            {p.badge && <div className="chip chip-plum" style={{position:'absolute',top:18,left:18}}>{p.badge}</div>}
          </div>
        </div>

        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:12,marginBottom:8}}>
            <div className="tiny" style={{color:'var(--accent)'}}>{p.cat}</div>
            <AdminEditProductButton product={p}/>
          </div>
          <h1 style={{fontSize:mobile?30:42,marginBottom:6}}>{p.name}</h1>
          <p style={{fontStyle:'italic',color:'var(--ink-mute)',marginBottom:14,fontSize:15}}>{p.sub}</p>
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24}}>
            <Stars value={p.rating} size={14}/>
            <span style={{fontSize:12,color:'var(--ink-mute)'}}>{p.rating} · {p.reviews} reviews</span>
          </div>

          <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:6}}>
            <span style={{fontFamily:'var(--display)',fontSize:mobile?28:38,color:'var(--accent)'}}>₹{p.price.toLocaleString('en-IN')}</span>
            <span className="strike">₹{p.mrp.toLocaleString('en-IN')}</span>
            <span className="chip chip-accent">SAVE {off}%</span>
          </div>
          <div style={{fontSize:12,color:'var(--ink-mute)',marginBottom:26}}>Inclusive of all taxes · Free shipping above ₹999</div>

          <div style={{marginBottom:22}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <span className="tiny" style={{color:'var(--ink-soft)'}}>Finish</span>
              <span style={{fontSize:12,color:'var(--ink-mute)'}}>{finish}</span>
            </div>
            <div style={{display:'flex',gap:8}}>
              {p.finish.map(f => (
                <button key={f} onClick={()=>setFinish(f)} style={{padding:'10px 16px',border:`1px solid ${finish===f?'var(--ink)':'var(--line)'}`,background:finish===f?'var(--ink)':'var(--bg)',color:finish===f?'var(--bg)':'var(--ink)',borderRadius:8,cursor:'pointer',fontSize:13,fontFamily:'var(--body)'}}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{marginBottom:26}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <span className="tiny" style={{color:'var(--ink-soft)'}}>Size</span>
              <span style={{fontSize:12,color:'var(--accent)',cursor:'pointer'}}>Size guide ↗</span>
            </div>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {p.size.map(s => (
                <button key={s} onClick={()=>setSize(s)} style={{padding:'10px 18px',border:`1px solid ${size===s?'var(--ink)':'var(--line)'}`,background:size===s?'var(--ink)':'var(--bg)',color:size===s?'var(--bg)':'var(--ink)',borderRadius:8,cursor:'pointer',fontSize:13,fontFamily:'var(--body)'}}>{s}</button>
              ))}
            </div>
          </div>

          <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:18}}>
            <div style={{display:'inline-flex',alignItems:'center',border:'1px solid var(--line)',borderRadius:999}}>
              <button onClick={()=>setQty(Math.max(1,qty-1))} style={{background:'none',border:0,padding:'12px 14px',cursor:'pointer'}}><Icon.Minus/></button>
              <span style={{padding:'0 14px',fontSize:14,minWidth:30,textAlign:'center'}}>{qty}</span>
              <button onClick={()=>setQty(qty+1)} style={{background:'none',border:0,padding:'12px 14px',cursor:'pointer'}}><Icon.Plus/></button>
            </div>
            <button onClick={()=>{onAdd({...p, finish, size, qty}); addPing && addPing();}} className="btn btn-primary btn-lg" style={{flex:1,position:'relative'}}>
              <Icon.Cart s={16}/> Add to Cart · ₹{(p.price*qty).toLocaleString('en-IN')}
            </button>
          </div>
          <button onClick={()=>{onAdd({...p, finish, size, qty}); go('checkout');}} className="btn btn-dark btn-block btn-lg" style={{marginBottom:18}}>Buy It Now</button>

          <div style={{padding:14,background:'var(--bg-soft)',borderRadius:10,fontSize:12,display:'flex',gap:10,alignItems:'center',marginBottom:24}}>
            <Icon.MapPin/>
            <div style={{flex:1}}>Delivery to <strong>560038</strong> by <strong>Wed, 29 Apr</strong> · COD available</div>
            <span style={{color:'var(--accent)',cursor:'pointer'}}>Change</span>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
            {[
              {i:'Truck',t:'Free shipping',s:'Above ₹999'},
              {i:'Shield',t:'Lifetime tin re-coat',s:'On copper & brass'},
              {i:'Leaf',t:'Ayurveda-grade',s:'Food-safe certified'},
            ].map(x => {
              const I = Icon[x.i];
              return (
                <div key={x.t} style={{padding:14,border:'1px solid var(--line)',borderRadius:10}}>
                  <I s={18}/>
                  <div style={{fontSize:13,marginTop:8,fontWeight:500}}>{x.t}</div>
                  <div style={{fontSize:11,color:'var(--ink-mute)'}}>{x.s}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{padding:mobile?'0 20px':'0 40px',borderTop:'1px solid var(--line)'}}>
        <div style={{display:'flex',gap:mobile?16:30,borderBottom:'1px solid var(--line)',overflowX:'auto'}}>
          {['details','care','reviews','ayurveda'].map(t => (
            <button key={t} onClick={()=>setTab(t)} style={{background:'none',border:0,padding:'18px 0',cursor:'pointer',fontSize:13,letterSpacing:'.12em',textTransform:'uppercase',color:tab===t?'var(--ink)':'var(--ink-mute)',borderBottom:tab===t?'2px solid var(--accent)':'2px solid transparent',marginBottom:-1,fontFamily:'var(--body)'}}>{t === 'ayurveda' ? 'Health Benefits' : t}</button>
          ))}
        </div>
        <div style={{padding:'30px 0 50px'}}>
          {tab === 'details' && (
            <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'1fr 1fr',gap:mobile?20:40}}>
              <div>
                <p style={{fontSize:15,lineHeight:1.7,color:'var(--ink-soft)'}}>The Sanchi Lota is shaped from a single sheet of brass — no joints, no welds. Hand-spun on a wooden lathe by Manjeet Tamrakar of Moradabad, whose family has been at this craft since 1881. Each piece carries the artisan's stamp on the base.</p>
              </div>
              <div>
                <table style={{width:'100%',fontSize:13,borderCollapse:'collapse'}}>
                  <tbody>
                    {[['Material','Pure brass (not plated)'],['Origin','Moradabad, Uttar Pradesh'],['Weight','420 grams'],['Capacity','500 ml'],['Crafting','Hand-spun, single-sheet'],['Food safe','Yes — internally tinned']].map(r => (
                      <tr key={r[0]}><td style={{padding:'10px 0',color:'var(--ink-mute)',width:'40%'}}>{r[0]}</td><td style={{padding:'10px 0'}}>{r[1]}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === 'care' && (
            <div style={{maxWidth:700,fontSize:14,lineHeight:1.8,color:'var(--ink-soft)'}}>
              <p><strong style={{color:'var(--ink)'}}>Daily care:</strong> Rinse with warm water and a soft cloth. Avoid steel scrubbers.</p>
              <p><strong style={{color:'var(--ink)'}}>Polishing:</strong> Use a paste of tamarind and salt, or our Heritage Brass Polish (sold separately).</p>
              <p><strong style={{color:'var(--ink)'}}>Lifetime tin re-coating:</strong> Free service every 2 years. Just ship it back; we cover return courier.</p>
            </div>
          )}
          {tab === 'reviews' && (
            <div>
              <div style={{display:'flex',gap:mobile?20:50,marginBottom:30,alignItems:'center',flexWrap:'wrap'}}>
                <div style={{textAlign:'center'}}>
                  <div style={{fontFamily:'var(--display)',fontSize:64,color:'var(--accent)',lineHeight:1}}>{p.rating}</div>
                  <Stars value={p.rating} size={14}/>
                  <div style={{fontSize:12,color:'var(--ink-mute)',marginTop:4}}>{p.reviews} reviews</div>
                </div>
                <div style={{flex:1}}>
                  {[5,4,3,2,1].map(n => {
                    const w = n===5?78:n===4?16:n===3?4:n===2?1:1;
                    return (
                      <div key={n} style={{display:'flex',alignItems:'center',gap:10,fontSize:12,marginBottom:4}}>
                        <span style={{width:20}}>{n}★</span>
                        <div style={{flex:1,height:6,background:'var(--bg-soft)',borderRadius:3,overflow:'hidden'}}><div style={{width:`${w}%`,height:'100%',background:'var(--accent)'}}/></div>
                        <span style={{width:30,color:'var(--ink-mute)'}}>{w}%</span>
                      </div>
                    );
                  })}
                </div>
                <button className="btn btn-ghost">Write a review</button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'repeat(2,1fr)',gap:mobile?12:18}}>
                {REVIEWS_SAMPLE.slice(0,2).map(r => (
                  <div key={r.name} style={{padding:18,border:'1px solid var(--line)',borderRadius:10}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}><Stars value={r.rating} size={12} count={false}/><span className="chip" style={{fontSize:9}}>VERIFIED</span></div>
                    <h4 style={{fontFamily:'var(--display)',fontSize:16,margin:'10px 0 6px'}}>{r.title}</h4>
                    <p style={{fontSize:13,color:'var(--ink-soft)',lineHeight:1.6}}>{r.body}</p>
                    <div style={{fontSize:11,color:'var(--ink-mute)',marginTop:10}}>{r.name} · {r.date}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tab === 'ayurveda' && (
            <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'repeat(3,1fr)',gap:mobile?12:18}}>
              {[
                {h:'Trace Mineral Infusion',b:'Brass and copper release essential micro-minerals into water — supporting digestion and metabolic balance, as documented in classical Ayurveda.'},
                {h:'Antimicrobial by Nature',b:'The oligodynamic effect of copper has been shown to neutralize bacteria within hours, making it ideal for storing drinking water.'},
                {h:'Ritual & Routine',b:'Drinking from a copper vessel at sunrise is a 3,000-year practice — said to balance the three doshas: vata, pitta and kapha.'},
              ].map(b => (
                <div key={b.h} style={{padding:22,background:'var(--bg-soft)',borderRadius:12}}>
                  <Icon.Leaf s={22}/>
                  <h4 style={{fontFamily:'var(--display)',fontSize:18,margin:'10px 0 8px'}}>{b.h}</h4>
                  <p style={{fontSize:13,color:'var(--ink-soft)',lineHeight:1.6}}>{b.b}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{padding:mobile?'30px 20px 50px':'50px 40px 70px',borderTop:'1px solid var(--line)',background:'var(--bg-soft)'}}>
        <h3 style={{fontSize:mobile?22:28,marginBottom:mobile?16:24}}>You may also <span className="italic">cherish</span></h3>
        <div style={{display:'grid',gridTemplateColumns:mobile?'repeat(2,1fr)':'repeat(4,1fr)',gap:mobile?12:18}}>
          {products.filter(x=>x.id!==p.id).slice(0,4).map(x => <ProductCard key={x.id} p={x} onClick={()=>go('product',x.id)} onAdd={onAdd}/>)}
        </div>
      </div>
    </>
  );
}

export function AboutPage({ go, mobile }) {
  return (
    <>
      <section style={{padding:mobile?'50px 20px 40px':'80px 40px 70px',textAlign:'center',borderBottom:'1px solid var(--line)',background:'var(--bg-soft)'}}>
        <div className="ornament" style={{maxWidth:200,margin:'0 auto 18px'}}>श्री</div>
        <h1 style={{fontSize:mobile?40:72,marginBottom:18,maxWidth:900,margin:'0 auto 18px',lineHeight:1}}>A workshop, not a <span className="italic" style={{color:'var(--accent)'}}>warehouse.</span></h1>
        <p style={{fontSize:mobile?15:18,color:'var(--ink-soft)',maxWidth:600,margin:'0 auto',lineHeight:1.6}}>Three generations of Sharmas, ten generations of metal-smiths, and one belief: the kitchen deserves better than aluminium.</p>
      </section>
      <section style={{padding:mobile?'40px 20px':'80px 40px',display:'grid',gridTemplateColumns:mobile?'1fr':'1fr 1.1fr',gap:mobile?28:60,alignItems:'center'}}>
        <div style={{aspectRatio:'4/5',background:'var(--bg-deep)',borderRadius:12,position:'relative',overflow:'hidden'}}>
          <ProdImg kind="thali" material="brass" big size={140} ratio="auto" label="EST. 1962 · BENGALURU"/>
        </div>
        <div>
          <div className="tiny" style={{color:'var(--accent)',marginBottom:12}}>1962 — TODAY</div>
          <h2 style={{fontSize:mobile?28:42,marginBottom:18,lineHeight:1.05}}>How a small <span className="italic">Bengaluru</span> shop became a heritage house.</h2>
          <p style={{fontSize:15,lineHeight:1.7,color:'var(--ink-soft)',marginBottom:14}}>It began in 1962 with a single-room shop on Avenue Road, where Krishnaiah Sharma sold brass tumblers from his uncle's foundry in Pembarthi. Sixty-four years later, his grandson Aarav runs Sai Store from the same lane — but now we ship to 1,400+ pin codes.</p>
          <p style={{fontSize:15,lineHeight:1.7,color:'var(--ink-soft)'}}>What hasn't changed: every piece is still made by hand, by a named artisan, in a small workshop where the fire is older than most of us.</p>
        </div>
      </section>
      <section style={{padding:mobile?'40px 20px':'70px 40px',background:'var(--ink)',color:'var(--bg)'}}>
        <div style={{textAlign:'center',marginBottom:mobile?28:50}}>
          <h2 style={{fontSize:mobile?28:42}}>Our <span className="italic" style={{color:'var(--marigold)'}}>artisan circle</span></h2>
          <p style={{fontSize:14,opacity:.7,marginTop:8}}>Three workshops · 140 families · 12 craft traditions</p>
        </div>
        <div style={{display:'grid',gridTemplateColumns:mobile?'1fr':'repeat(3,1fr)',gap:mobile?14:30}}>
          {[
            {city:'Moradabad',craft:'Brass spinning & engraving',count:62,years:160},
            {city:'Tanjore',craft:'Copper ridging & Tanjore plates',count:38,years:300},
            {city:'Pembarthi',craft:'Sheet-metal repoussé',count:41,years:400},
          ].map(w => (
            <div key={w.city} style={{padding:24,border:'1px solid rgba(255,255,255,.12)',borderRadius:12}}>
              <div style={{fontFamily:'var(--display)',fontStyle:'italic',color:'var(--marigold)',fontSize:14,marginBottom:6}}>since {2026 - w.years}</div>
              <h3 style={{fontSize:28,marginBottom:8}}>{w.city}</h3>
              <p style={{fontSize:13,opacity:.7,marginBottom:20}}>{w.craft}</p>
              <div style={{fontSize:12,letterSpacing:'.14em',color:'var(--marigold)'}}>{w.count} ARTISAN FAMILIES</div>
            </div>
          ))}
        </div>
      </section>
      <section style={{padding:mobile?'40px 20px':'80px 40px',textAlign:'center',background:'var(--bg-soft)'}}>
        <h2 style={{fontSize:mobile?26:36,marginBottom:18}}>Bring home a <span className="italic">slow-made</span> piece.</h2>
        <button onClick={()=>go('shop')} className="btn btn-primary btn-lg">Shop the Collection <Icon.ArrowRight/></button>
      </section>
    </>
  );
}

export function GiftsPage({ go, onAdd, mobile }) {
  const hampers = [
    { id:'h1', name:'Mangalam Wedding', sub:'8-piece curation', price:7990, kind:'gift', material:'brass' },
    { id:'h2', name:'Griha Pravesh', sub:'House-warming set', price:4290, kind:'thali', material:'brass' },
    { id:'h3', name:'Tamra Wellness', sub:'Copper trio + recipe book', price:3490, kind:'bottle', material:'copper' },
    { id:'h4', name:'Diwali Deepak', sub:'12 diyas + coral box', price:1890, kind:'diya', material:'brass' },
  ];
  return (
    <>
      <section style={{padding:mobile?'50px 20px 40px':'80px 40px',background:'linear-gradient(180deg, var(--bg-deep), var(--bg-soft))',borderBottom:'1px solid var(--line)',textAlign:'center'}}>
        <div className="chip chip-plum" style={{marginBottom:16}}>✦ The Gifting Edit</div>
        <h1 style={{fontSize:mobile?40:72,marginBottom:18,lineHeight:1}}>Gifts that <span className="italic" style={{color:'var(--accent)'}}>last generations.</span></h1>
        <p style={{fontSize:mobile?14:17,color:'var(--ink-soft)',maxWidth:560,margin:'0 auto 28px',lineHeight:1.6}}>Hand-curated hampers for weddings, house-warmings and festivals — wrapped in khadi, sealed with wax, delivered with a hand-written note.</p>
        <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
          <button className="btn btn-primary btn-lg">Shop Hampers</button>
          <button className="btn btn-ghost btn-lg">Build Your Own</button>
        </div>
      </section>

      <section style={{padding:mobile?'30px 20px':'60px 40px',display:'grid',gridTemplateColumns:mobile?'repeat(2,1fr)':'repeat(4,1fr)',gap:mobile?12:18}}>
        {hampers.map(h => (
          <article key={h.id} className="card" style={{padding:0,cursor:'pointer'}}>
            <ProdImg kind={h.kind} material={h.material} big size={70}/>
            <div style={{padding:18}}>
              <h3 style={{fontSize:20,marginBottom:4}}>{h.name}</h3>
              <p style={{fontSize:12,color:'var(--ink-mute)',fontStyle:'italic',marginBottom:12}}>{h.sub}</p>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <span style={{fontSize:16,fontWeight:600,color:'var(--accent)'}}>₹{h.price.toLocaleString('en-IN')}</span>
                <Icon.ArrowRight/>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section style={{padding:mobile?'40px 20px':'70px 40px',background:'var(--bg-soft)',borderTop:'1px solid var(--line)'}}>
        <h2 style={{fontSize:mobile?26:36,textAlign:'center',marginBottom:mobile?24:40}}>How it <span className="italic">arrives</span></h2>
        <div style={{display:'grid',gridTemplateColumns:mobile?'repeat(2,1fr)':'repeat(4,1fr)',gap:mobile?16:30}}>
          {[
            {n:'01',t:'Khadi-wrapped',s:'Each piece nested in handwoven cloth.'},
            {n:'02',t:'Wax-sealed box',s:'Mango-wood box with our brass seal.'},
            {n:'03',t:'Hand-written note',s:'Complimentary calligraphy in Devanagari or English.'},
            {n:'04',t:'Free engraving',s:'Up to 24 characters — name, date or blessing.'},
          ].map(s => (
            <div key={s.n}>
              <div style={{fontFamily:'var(--display)',fontStyle:'italic',color:'var(--accent)',fontSize:32,marginBottom:6}}>{s.n}</div>
              <h4 style={{fontSize:18,marginBottom:6}}>{s.t}</h4>
              <p style={{fontSize:13,color:'var(--ink-soft)',lineHeight:1.6}}>{s.s}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
