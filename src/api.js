// Browser API client. Vite proxies /api and /auth to the Express server in dev.
const opts = { credentials: 'include', headers: { 'Content-Type': 'application/json' } };

async function req(path, init = {}) {
  const r = await fetch(path, { ...opts, ...init });
  if (!r.ok) {
    let detail = '';
    try { const j = await r.json(); detail = j?.error || j?.message || ''; } catch {}
    throw new Error(detail ? `${r.status} ${detail}` : `${r.status} ${r.statusText}`);
  }
  return r.status === 204 ? null : r.json();
}

export const api = {
  // auth
  me: () => req('/auth/me'),
  updateMe: (patch) => req('/auth/me', { method: 'PATCH', body: JSON.stringify(patch) }),
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

  // admin
  adminStats: () => req('/api/admin/stats'),
  adminSignups: (limit = 100) => req(`/api/admin/signups?limit=${limit}`),
  adminOrders: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return req(`/api/admin/orders${qs ? '?' + qs : ''}`);
  },
  adminOrder: (id) => req(`/api/admin/orders/${id}`),
  adminUpdateOrder: (id, patch) =>
    req(`/api/admin/orders/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  adminProducts: () => req('/api/admin/products'),
  adminProduct: (id) => req(`/api/admin/products/${id}`),
  adminCreateProduct: (p) => req('/api/admin/products', { method: 'POST', body: JSON.stringify(p) }),
  adminUpdateProduct: (id, p) => req(`/api/admin/products/${id}`, { method: 'PATCH', body: JSON.stringify(p) }),
  adminDeleteProduct: (id) => req(`/api/admin/products/${id}`, { method: 'DELETE' }),
  adminCategories: () => req('/api/admin/categories'),
};
