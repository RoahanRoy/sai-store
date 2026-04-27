// Main app — Sai Store
// Brings together all screens, routing, cart state, search overlay, mobile frames, design canvas

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "warm",
  "typeset": "classic",
  "hero": "editorial",
  "card": "default",
  "dark": false,
  "festive": true
}/*EDITMODE-END*/;

function StoreApp({ initialRoute = 'home', initialId, initialCart, mobile = false, theme, typeset, hero, card, dark, festive, scope }) {
  const [route, setRoute] = React.useState(initialRoute);
  const [productId, setProductId] = React.useState(initialId);
  const [cart, setCart] = React.useState(initialCart || []);
  const [search, setSearch] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [address, setAddress] = React.useState(null);
  const [pinging, setPinging] = React.useState(false);

  function go(r, id) {
    setRoute(r);
    if (id) setProductId(id);
    if (scope) scope.scrollTop = 0;
  }

  function onAdd(p) {
    setCart(c => {
      const cartId = `${p.id}-${p.size||''}-${p.finish||''}`;
      const existing = c.find(it => it.cartId === cartId);
      if (existing) return c.map(it => it.cartId === cartId ? {...it, qty: it.qty + (p.qty||1)} : it);
      return [...c, { ...p, cartId, qty: p.qty||1, finish: p.finish||p.finish?.[0]||'Mirror', size: p.size||p.size?.[0]||'Standard' }];
    });
    setPinging(true);
    setTimeout(()=>setPinging(false), 600);
  }

  const cartCount = cart.reduce((s,it) => s + it.qty, 0);

  let body;
  if (route === 'home') body = <HomePage go={go} onAdd={onAdd} heroVariant={hero} cardVariant={card}/>;
  else if (route === 'shop') body = <ShopPage go={go} onAdd={onAdd} cardVariant={card}/>;
  else if (route === 'product') body = <ProductPage id={productId} go={go} onAdd={onAdd}/>;
  else if (route === 'cart') body = <CartPage cart={cart} setCart={setCart} go={go}/>;
  else if (route === 'checkout') body = <CheckoutPage cart={cart} go={go} address={address} setAddress={setAddress}/>;
  else if (route === 'payment') body = <PaymentPage cart={cart} go={go} address={address} onPlaceOrder={()=>{}}/>;
  else if (route === 'confirmation') body = <ConfirmationPage cart={cart} address={address} go={go}/>;
  else if (route === 'tracking') body = <TrackingPage go={go}/>;
  else if (route === 'login') body = <LoginPage go={go}/>;
  else if (route === 'account') body = <AccountPage go={go}/>;
  else if (route === 'about') body = <AboutPage go={go}/>;
  else if (route === 'gifts') body = <GiftsPage go={go} onAdd={onAdd}/>;

  const themeAttr = dark ? 'dark' : theme;
  const showHeader = route !== 'login';

  return (
    <div className="sai" data-theme={themeAttr} data-typeset={typeset} style={{minHeight:'100%',background:'var(--bg)',color:'var(--ink)',position:'relative'}}>
      {showHeader && festive && <FestiveStrip show={festive}/>}
      {showHeader && !mobile && <TopStrip/>}
      {showHeader && <Header onSearch={()=>setSearch(true)} onCart={()=>setDrawer(true)} onMenu={()=>setMenu(true)} cartCount={cartCount} route={route} go={go} mobile={mobile}/>}
      <main>{body}</main>
      {showHeader && <Footer mobile={mobile}/>}
      <SearchOverlay open={search} onClose={()=>setSearch(false)} go={go}/>
      <CartDrawer open={drawer} onClose={()=>setDrawer(false)} cart={cart} setCart={setCart} go={go}/>
      <MobileMenu open={menu} onClose={()=>setMenu(false)} go={go} route={route}/>
      {pinging && <div style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:'var(--peacock)',color:'#fff',padding:'12px 20px',borderRadius:999,fontSize:13,fontWeight:500,zIndex:100,display:'flex',alignItems:'center',gap:8,boxShadow:'var(--shadow-lg)'}} className="bouncein"><Icon.Check s={16}/> Added to cart</div>}
    </div>
  );
}

// Sample seed cart (so cart/checkout artboards have content)
const SEED_CART = [
  { ...PRODUCTS[1], cartId: 'p2-1L-Hammered', finish: 'Hammered', size: '1L', qty: 1 },
  { ...PRODUCTS[5], cartId: 'p6-Large-Polished', finish: 'Polished', size: 'Large', qty: 2 },
];

// ─── Mobile-frame wrapper ─── (IOSDevice already scrolls internally)
function MobileShell({ children }) {
  return (
    <div style={{width:'100%',background:'var(--bg)'}} className="no-scroll">
      {React.cloneElement(children, { mobile: true })}
    </div>
  );
}

// ─── App with Tweaks ───
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const tweaksProps = {
    theme: tweaks.theme,
    typeset: tweaks.typeset,
    hero: tweaks.hero,
    card: tweaks.card,
    dark: tweaks.dark,
    festive: tweaks.festive,
  };

  // Common shell: design canvas with all screens as artboards
  return (
    <>
      <DesignCanvas>
        {/* INTRO */}
        <DCSection id="intro" title="Sai Store · Heritage Boutique E-commerce" subtitle="Hand-crafted brass · copper · steel utensils · 12 screens × desktop + mobile">
          <DCArtboard id="legend" label="Design System · Read me first" width={1100} height={680}>
            <BrandLegend/>
          </DCArtboard>
        </DCSection>

        {/* DESKTOP — DISCOVERY */}
        <DCSection id="desktop-discovery" title="Desktop · Discovery & Browse" subtitle="Home, Shop, Product, About, Gifts">
          <DCArtboard id="d-home" label="01 · Home" width={1280} height={2400}>
            <StoreApp initialRoute="home" {...tweaksProps}/>
          </DCArtboard>
          <DCArtboard id="d-shop" label="02 · Shop / Category" width={1280} height={1500}>
            <StoreApp initialRoute="shop" {...tweaksProps}/>
          </DCArtboard>
          <DCArtboard id="d-product" label="03 · Product Detail" width={1280} height={2200}>
            <StoreApp initialRoute="product" initialId="p1" {...tweaksProps}/>
          </DCArtboard>
          <DCArtboard id="d-about" label="04 · About / Story" width={1280} height={1500}>
            <StoreApp initialRoute="about" {...tweaksProps}/>
          </DCArtboard>
          <DCArtboard id="d-gifts" label="05 · Gift Hampers" width={1280} height={1400}>
            <StoreApp initialRoute="gifts" {...tweaksProps}/>
          </DCArtboard>
        </DCSection>

        {/* DESKTOP — PURCHASE */}
        <DCSection id="desktop-buy" title="Desktop · Buying Flow" subtitle="Cart → Address → Payment → Confirmation → Tracking">
          <DCArtboard id="d-cart" label="06 · Cart" width={1280} height={900}>
            <StoreApp initialRoute="cart" initialCart={SEED_CART} {...tweaksProps}/>
          </DCArtboard>
          <DCArtboard id="d-checkout" label="07 · Checkout · Address" width={1280} height={1100}>
            <StoreApp initialRoute="checkout" initialCart={SEED_CART} {...tweaksProps}/>
          </DCArtboard>
          <DCArtboard id="d-payment" label="08 · Payment" width={1280} height={1100}>
            <StoreApp initialRoute="payment" initialCart={SEED_CART} {...tweaksProps}/>
          </DCArtboard>
          <DCArtboard id="d-confirmation" label="09 · Order Confirmation" width={1280} height={1100}>
            <StoreApp initialRoute="confirmation" initialCart={SEED_CART} {...tweaksProps}/>
          </DCArtboard>
          <DCArtboard id="d-tracking" label="10 · Order Tracking" width={1280} height={1000}>
            <StoreApp initialRoute="tracking" {...tweaksProps}/>
          </DCArtboard>
        </DCSection>

        {/* DESKTOP — ACCOUNT */}
        <DCSection id="desktop-account" title="Desktop · Account" subtitle="Login, signup, account dashboard">
          <DCArtboard id="d-login" label="11 · Login / Signup" width={1280} height={760}>
            <StoreApp initialRoute="login" {...tweaksProps}/>
          </DCArtboard>
          <DCArtboard id="d-account" label="12 · My Account" width={1280} height={900}>
            <StoreApp initialRoute="account" {...tweaksProps}/>
          </DCArtboard>
        </DCSection>

        {/* MOBILE — DISCOVERY */}
        <DCSection id="mobile-discovery" title="Mobile · Discovery" subtitle="iPhone 15 frame · 393 × 852">
          <DCArtboard id="m-home" label="01 · Home" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="home" {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
          <DCArtboard id="m-shop" label="02 · Shop" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="shop" {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
          <DCArtboard id="m-product" label="03 · Product" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="product" initialId="p2" {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
          <DCArtboard id="m-about" label="04 · About" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="about" {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
          <DCArtboard id="m-gifts" label="05 · Gift Hampers" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="gifts" {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
        </DCSection>

        {/* MOBILE — PURCHASE */}
        <DCSection id="mobile-buy" title="Mobile · Buy Flow" subtitle="Touch-optimized">
          <DCArtboard id="m-cart" label="06 · Cart" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="cart" initialCart={SEED_CART} {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
          <DCArtboard id="m-checkout" label="07 · Checkout" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="checkout" initialCart={SEED_CART} {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
          <DCArtboard id="m-payment" label="08 · Payment" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="payment" initialCart={SEED_CART} {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
          <DCArtboard id="m-confirmation" label="09 · Confirmation" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="confirmation" initialCart={SEED_CART} {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
          <DCArtboard id="m-tracking" label="10 · Tracking" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="tracking" {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
        </DCSection>

        {/* MOBILE — ACCOUNT */}
        <DCSection id="mobile-account" title="Mobile · Account" subtitle="">
          <DCArtboard id="m-login" label="11 · Login" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="login" {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
          <DCArtboard id="m-account" label="12 · Account" width={393} height={852}>
            <IOSDevice><MobileShell><StoreApp initialRoute="account" {...tweaksProps}/></MobileShell></IOSDevice>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Visual Theme">
          <TweakRadio label="Color theme" value={tweaks.theme} options={[{label:'Warm',value:'warm'},{label:'Cool',value:'cool'},{label:'Mono',value:'mono'}]} onChange={v=>setTweak('theme',v)}/>
          <TweakToggle label="Dark mode" value={tweaks.dark} onChange={v=>setTweak('dark',v)}/>
          <TweakToggle label="Festive overlay (Akshaya Tritiya)" value={tweaks.festive} onChange={v=>setTweak('festive',v)}/>
        </TweakSection>
        <TweakSection title="Typography">
          <TweakSelect label="Type pairing" value={tweaks.typeset} options={[
            {label:'Classic — Fraunces × Inter', value:'classic'},
            {label:'Editorial — Cormorant × Work Sans', value:'editorial'},
            {label:'Modern — Playfair × DM Sans', value:'modern'},
            {label:'Bold — Bricolage × Inter', value:'bold'},
          ]} onChange={v=>setTweak('typeset',v)}/>
        </TweakSection>
        <TweakSection title="Layouts">
          <TweakRadio label="Hero variant" value={tweaks.hero} options={[{label:'Editorial',value:'editorial'},{label:'Split',value:'split'},{label:'Minimal',value:'minimal'}]} onChange={v=>setTweak('hero',v)}/>
          <TweakRadio label="Product card" value={tweaks.card} options={[{label:'Default',value:'default'},{label:'Editorial',value:'editorial'},{label:'Minimal',value:'minimal'}]} onChange={v=>setTweak('card',v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// ─── Brand legend / cover artboard ───
function BrandLegend() {
  return (
    <div className="sai" data-theme="warm" style={{padding:50,height:'100%',background:'var(--bg)',display:'flex',flexDirection:'column',gap:32,overflowY:'auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:30,paddingBottom:24,borderBottom:'1px solid var(--line)'}}>
        <div>
          <div className="tiny" style={{color:'var(--accent)',marginBottom:10}}>HERITAGE BOUTIQUE · E-COMMERCE</div>
          <h1 style={{fontSize:54,marginBottom:8,fontFamily:'var(--display)',lineHeight:1}}>Sai <span className="italic" style={{color:'var(--accent)'}}>Store</span></h1>
          <p style={{fontSize:14,color:'var(--ink-soft)',maxWidth:560}}>Hand-crafted brass, copper and steel utensils — slow-made by artisan families across India. 24 artboards (12 screens × desktop + mobile) with full clicking flow, live cart, search, address validation, and payment processing.</p>
        </div>
        <SaiMark size="lg"/>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:30}}>
        <div>
          <div className="tiny" style={{color:'var(--ink-mute)',marginBottom:14}}>PALETTE</div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8}}>
            {[
              {n:'Saffron',c:'#d97706',l:'#fff'},
              {n:'Peacock',c:'#0e6b6b',l:'#fff'},
              {n:'Plum',c:'#6b1f3a',l:'#fff'},
              {n:'Gold',c:'#b8852a',l:'#fff'},
              {n:'Cream',c:'#faf6ef',l:'#1a1410'},
              {n:'Sand',c:'#ebe1cd',l:'#1a1410'},
              {n:'Ink',c:'#1a1410',l:'#fff'},
              {n:'Terracotta',c:'#b8431f',l:'#fff'},
            ].map(s => (
              <div key={s.n} style={{aspectRatio:'1/1',background:s.c,borderRadius:10,padding:12,color:s.l,display:'flex',flexDirection:'column',justifyContent:'space-between',fontSize:11}}>
                <span style={{letterSpacing:'.1em',textTransform:'uppercase'}}>{s.n}</span>
                <span style={{fontFamily:'var(--mono)',opacity:.85}}>{s.c}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="tiny" style={{color:'var(--ink-mute)',marginBottom:14}}>TYPOGRAPHY</div>
          <div style={{padding:24,border:'1px solid var(--line)',borderRadius:12,marginBottom:10}}>
            <div style={{fontSize:11,letterSpacing:'.16em',color:'var(--ink-mute)',marginBottom:6}}>FRAUNCES · DISPLAY</div>
            <div style={{fontFamily:'var(--display)',fontSize:42,lineHeight:1.05}}>Heirloom <span className="italic" style={{color:'var(--accent)'}}>vessels</span></div>
          </div>
          <div style={{padding:24,border:'1px solid var(--line)',borderRadius:12}}>
            <div style={{fontSize:11,letterSpacing:'.16em',color:'var(--ink-mute)',marginBottom:6}}>INTER · BODY</div>
            <p style={{fontFamily:'var(--body)',fontSize:14,lineHeight:1.65,color:'var(--ink-soft)'}}>Brass, copper and steel utensils — slow-made by artisan families across Moradabad, Tanjore and Pembarthi since 1962.</p>
          </div>
        </div>
      </div>

      <div>
        <div className="tiny" style={{color:'var(--ink-mute)',marginBottom:14}}>VESSEL LIBRARY · 9 ORIGINAL SVGS × 3 MATERIALS</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(9,1fr)',gap:8}}>
          {['lota','tumbler','bottle','thali','dabba','kadhai','diya','spoon','gift'].map(k => (
            <div key={k} style={{aspectRatio:'1/1',borderRadius:10,overflow:'hidden'}}>
              <ProdImg kind={k} material={['brass','copper','steel'][Math.floor(Math.random()*3)]} ratio="auto" big size={50} label={k}/>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'18px 24px',background:'var(--bg-soft)',borderRadius:12,fontSize:13,color:'var(--ink-soft)',display:'flex',gap:30,flexWrap:'wrap'}}>
        <span>✦ <strong>Click any card</strong> to expand to fullscreen.</span>
        <span>✦ <strong>Toggle Tweaks</strong> in the toolbar to switch theme, type, hero, dark mode.</span>
        <span>✦ All flows are clickable — try add-to-cart from Home, then go to Cart → Checkout → Payment.</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
