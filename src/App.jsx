import React from 'react';
import { Icon } from './primitives.jsx';
import { FestiveStrip, TopStrip, Header, Footer, SearchOverlay, CartDrawer, MobileMenu } from './chrome.jsx';
import { HomePage, ShopPage, ProductPage, AboutPage, GiftsPage } from './screens-1.jsx';
import { CartPage, CheckoutPage, PaymentPage, ConfirmationPage, TrackingPage, LoginPage, AccountPage } from './screens-2.jsx';
import { AdminPage } from './admin.jsx';
import { api } from './api.js';

export const AuthContext = React.createContext({ user: null, refresh: () => {}, logout: () => {} });

const DEFAULTS = {
  theme: 'warm',
  typeset: 'classic',
  hero: 'editorial',
  card: 'default',
  dark: false,
  festive: true,
};

function getInitialRoute(fallback) {
  if (typeof window === 'undefined') return fallback;
  const path = window.location.pathname || '';
  if (path.startsWith('/admin')) return 'admin';
  return fallback;
}

function useIsMobile() {
  const [mobile, setMobile] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(max-width: 760px)').matches;
  });
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const fn = (e) => setMobile(e.matches);
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);
  return mobile;
}

function StoreApp({ initialRoute = 'home', initialId, initialCart, mobile: mobileProp = false, theme, typeset, hero, card, dark: darkProp, festive }) {
  const mobileAuto = useIsMobile();
  const mobile = mobileProp || mobileAuto;
  const [route, setRoute] = React.useState(() => getInitialRoute(initialRoute));
  const [productId, setProductId] = React.useState(initialId);
  const [cart, setCart] = React.useState(initialCart || []);
  const [search, setSearch] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [address, setAddress] = React.useState(null);
  const [pinging, setPinging] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [dark, setDark] = React.useState(() => {
    if (typeof window === 'undefined') return !!darkProp;
    const stored = window.localStorage.getItem('sai:dark');
    if (stored === '1') return true;
    if (stored === '0') return false;
    return !!darkProp;
  });
  React.useEffect(() => {
    try { window.localStorage.setItem('sai:dark', dark ? '1' : '0'); } catch {}
  }, [dark]);
  // Promote theme to <html> so body / scroll background follow the dark palette.
  const themeAttrEffect = dark ? 'dark' : theme;
  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', themeAttrEffect);
    document.documentElement.setAttribute('data-typeset', typeset);
    return () => {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.removeAttribute('data-typeset');
    };
  }, [themeAttrEffect, typeset]);

  const refreshUser = React.useCallback(async () => {
    try { setUser(await api.me()); } catch { setUser(null); }
  }, []);

  React.useEffect(() => { refreshUser(); }, [refreshUser]);

  React.useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get('login') === 'success') {
      url.searchParams.delete('login');
      window.history.replaceState({}, '', url.pathname + (url.search || ''));
      refreshUser().then(() => setRoute('account'));
    }
  }, [refreshUser]);

  const logout = async () => { try { await api.logout(); } finally { setUser(null); setRoute('home'); } };

  function go(r, id) {
    setRoute(r);
    if (id) setProductId(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function onAdd(p) {
    setCart(c => {
      const cartId = `${p.id}-${p.size||''}-${p.finish||''}`;
      const existing = c.find(it => it.cartId === cartId);
      if (existing) return c.map(it => it.cartId === cartId ? {...it, qty: it.qty + (p.qty||1)} : it);
      const finish = p.finish || (Array.isArray(p.finish) ? p.finish[0] : 'Mirror');
      const size = p.size || (Array.isArray(p.size) ? p.size[0] : 'Standard');
      return [...c, { ...p, cartId, qty: p.qty||1, finish, size }];
    });
    setPinging(true);
    setTimeout(() => setPinging(false), 600);
  }

  const cartCount = cart.reduce((s, it) => s + it.qty, 0);

  let body;
  if (route === 'home') body = <HomePage go={go} onAdd={onAdd} heroVariant={hero} cardVariant={card} mobile={mobile}/>;
  else if (route === 'shop') body = <ShopPage go={go} onAdd={onAdd} cardVariant={card} mobile={mobile}/>;
  else if (route === 'product') body = <ProductPage id={productId} go={go} onAdd={onAdd} mobile={mobile}/>;
  else if (route === 'cart') body = <CartPage cart={cart} setCart={setCart} go={go} mobile={mobile}/>;
  else if (route === 'checkout') body = <CheckoutPage cart={cart} go={go} address={address} setAddress={setAddress} mobile={mobile}/>;
  else if (route === 'payment') body = <PaymentPage cart={cart} go={go} address={address} onPlaceOrder={()=>{}} mobile={mobile}/>;
  else if (route === 'confirmation') body = <ConfirmationPage cart={cart} address={address} go={go} mobile={mobile}/>;
  else if (route === 'tracking') body = <TrackingPage go={go} mobile={mobile}/>;
  else if (route === 'login') body = <LoginPage go={go} mobile={mobile}/>;
  else if (route === 'account') body = user ? <AccountPage go={go} mobile={mobile}/> : <LoginPage go={go} mobile={mobile}/>;
  else if (route === 'about') body = <AboutPage go={go} mobile={mobile}/>;
  else if (route === 'gifts') body = <GiftsPage go={go} onAdd={onAdd} mobile={mobile}/>;
  else if (route === 'admin') body = <AdminPage go={go}/>;

  const themeAttr = dark ? 'dark' : theme;
  const onLogin = route === 'login' || (route === 'account' && !user);
  const showHeader = !onLogin;

  return (
    <AuthContext.Provider value={{ user, refresh: refreshUser, logout }}>
    <div className="sai" data-theme={themeAttr} data-typeset={typeset} style={{minHeight:'100%',background:'var(--bg)',color:'var(--ink)',position:'relative'}}>
      {showHeader && festive && <FestiveStrip show={festive}/>}
      {showHeader && !mobile && <TopStrip/>}
      {showHeader && <Header onSearch={()=>setSearch(true)} onCart={()=>setDrawer(true)} onMenu={()=>setMenu(true)} cartCount={cartCount} route={route} go={go} mobile={mobile}/>}
      <main>{body}</main>
      {showHeader && <Footer mobile={mobile}/>}
      <SearchOverlay open={search} onClose={()=>setSearch(false)} go={go}/>
      <CartDrawer open={drawer} onClose={()=>setDrawer(false)} cart={cart} setCart={setCart} go={go}/>
      <MobileMenu open={menu} onClose={()=>setMenu(false)} go={go} route={route}/>
      {pinging && (
        <div className="bouncein" style={{position:'fixed',bottom:24,left:'50%',transform:'translateX(-50%)',background:'var(--peacock)',color:'#fff',padding:'12px 20px',borderRadius:999,fontSize:13,fontWeight:500,zIndex:100,display:'flex',alignItems:'center',gap:8,boxShadow:'var(--shadow-lg)'}}>
          <Icon.Check s={16}/> Added to cart
        </div>
      )}
      <button
        onClick={() => setDark(d => !d)}
        title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-label="Toggle dark mode"
        style={{
          position:'fixed', right:18, bottom:18, zIndex:120,
          width:40, height:40, borderRadius:'50%',
          background:'var(--bg)', color:'var(--ink)',
          border:'1px solid var(--line)',
          boxShadow:'var(--shadow)',
          cursor:'pointer', display:'grid', placeItems:'center',
          transition:'background .15s, color .15s, border-color .15s',
        }}>
        {dark ? <Icon.Sun s={18}/> : <Icon.Moon s={18}/>}
      </button>
    </div>
    </AuthContext.Provider>
  );
}

export default function App() {
  return <StoreApp {...DEFAULTS}/>;
}
