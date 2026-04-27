// Browser API client. Vite proxies /api and /auth to the Express server in dev.
const opts = { credentials: 'include', headers: { 'Content-Type': 'application/json' } };

async function req(path, init = {}) {
  const r = await fetch(path, { ...opts, ...init });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.status === 204 ? null : r.json();
}

export const api = {
  // auth
  me: () => req('/auth/me'),
  loginGoogle: () => { window.location.href = '/auth/google'; },
  logout: () => req('/auth/logout', { method: 'POST' }),

  // catalog
  listProducts: (q = {}) => {
    const qs = new URLSearchParams(q).toString();
    return req(`/api/products${qs ? '?' + qs : ''}`);
  },
  getProduct: (id) => req(`/api/products/${id}`),
  listCategories: () => req('/api/categories'),
  productReviews: (id) => req(`/api/products/${id}/reviews`),

  // cart
  getCart: () => req('/api/cart'),
  addToCart: (item) => req('/api/cart', { method: 'POST', body: JSON.stringify(item) }),
  updateCart: (id, qty) => req(`/api/cart/${id}`, { method: 'PATCH', body: JSON.stringify({ qty }) }),
  removeFromCart: (id) => req(`/api/cart/${id}`, { method: 'DELETE' }),
  clearCart: () => req('/api/cart', { method: 'DELETE' }),

  // addresses
  listAddresses: () => req('/api/addresses'),
  addAddress: (a) => req('/api/addresses', { method: 'POST', body: JSON.stringify(a) }),
  removeAddress: (id) => req(`/api/addresses/${id}`, { method: 'DELETE' }),

  // orders
  listOrders: () => req('/api/orders'),
  getOrder: (id) => req(`/api/orders/${id}`),
  placeOrder: (address_id) => req('/api/orders', { method: 'POST', body: JSON.stringify({ address_id }) }),
};
