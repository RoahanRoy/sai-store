import React from 'react';
import { Icon } from './primitives.jsx';
import { FestiveStrip, TopStrip, Header, Footer, SearchOverlay, CartDrawer, MobileMenu } from './chrome.jsx';
import { HomePage, ShopPage, ProductPage, AboutPage, GiftsPage } from './screens-1.jsx';
import { CartPage, CheckoutPage, PaymentPage, ConfirmationPage, TrackingPage, LoginPage, AccountPage } from './screens-2.jsx';
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

function StoreApp({ initialRoute = 'home', initialId, initialCart, mobile = false, theme, typeset, hero, card, dark, festive }) {
  const [route, setRoute] = React.useState(initialRoute);
  const [productId, setProductId] = React.useState(initialId);
  const [cart, setCart] = React.useState(initialCart || []);
  const [search, setSearch] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);
  const [menu, setMenu] = React.useState(false);
  const [address, setAddress] = React.useState(null);
  const [pinging, setPinging] = React.useState(false);
  const [user, setUser] = React.useState(null);

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
  if (route === 'home') body = <HomePage go={go} onAdd={onAdd} heroVariant={hero} cardVariant={card}/>;
  else if (route === 'shop') body = <ShopPage go={go} onAdd={onAdd} cardVariant={card}/>;
  else if (route === 'product') body = <ProductPage id={productId} go={go} onAdd={onAdd}/>;
  else if (route === 'cart') body = <CartPage cart={cart} setCart={setCart} go={go}/>;
  else if (route === 'checkout') body = <CheckoutPage cart={cart} go={go} address={address} setAddress={setAddress}/>;
  else if (route === 'payment') body = <PaymentPage cart={cart} go={go} address={address} onPlaceOrder={()=>{}}/>;
  else if (route === 'confirmation') body = <ConfirmationPage cart={cart} address={address} go={go}/>;
  else if (route === 'tracking') body = <TrackingPage go={go}/>;
  else if (route === 'login') body = <LoginPage go={go}/>;
  else if (route === 'account') body = user ? <AccountPage go={go}/> : <LoginPage go={go}/>;
  else if (route === 'about') body = <AboutPage go={go}/>;
  else if (route === 'gifts') body = <GiftsPage go={go} onAdd={onAdd}/>;

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
    </div>
    </AuthContext.Provider>
  );
}

export default function App() {
  return <StoreApp {...DEFAULTS}/>;
}
