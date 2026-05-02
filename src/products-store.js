import React from 'react';
import { PRODUCTS as STATIC_PRODUCTS } from './data.js';
import { api } from './api.js';

let cache = null;
let inflight = null;
const listeners = new Set();

function merge(dbRows) {
  const byId = new Map(STATIC_PRODUCTS.map(p => [p.id, p]));
  for (const r of dbRows || []) {
    const base = byId.get(r.id) || {};
    byId.set(r.id, {
      ...base,
      ...r,
      finish: (r.finish && r.finish.length) ? r.finish : (base.finish || []),
      size: (r.size && r.size.length) ? r.size : (base.size || []),
      images: Array.isArray(r.images) ? r.images.filter(Boolean) : (base.images || []),
    });
  }
  return Array.from(byId.values());
}

function load() {
  if (inflight) return inflight;
  inflight = api.listProducts()
    .then(rows => { cache = merge(rows); listeners.forEach(fn => fn(cache)); return cache; })
    .catch(() => { cache = STATIC_PRODUCTS; listeners.forEach(fn => fn(cache)); return cache; })
    .finally(() => { inflight = null; });
  return inflight;
}

export function refreshProducts() {
  inflight = null;
  cache = null;
  return load();
}

export function useProducts() {
  const [products, setProducts] = React.useState(cache || STATIC_PRODUCTS);
  React.useEffect(() => {
    const fn = (next) => setProducts(next);
    listeners.add(fn);
    if (!cache) load();
    else setProducts(cache);
    return () => { listeners.delete(fn); };
  }, []);
  return products;
}

export function useProduct(id) {
  const products = useProducts();
  return products.find(x => x.id === id) || products[0];
}
