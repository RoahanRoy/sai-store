import { Router } from 'express';
import { query } from '../db/pool.js';
import { requireAdmin } from '../auth.js';

export const adminRouter = Router();
adminRouter.use(requireAdmin);

adminRouter.get('/stats', async (_req, res) => {
  const [{ rows: u }, { rows: o }, { rows: r }, { rows: today }] = await Promise.all([
    query('SELECT COUNT(*)::int AS n FROM users'),
    query('SELECT COUNT(*)::int AS n, COALESCE(SUM(total),0)::int AS revenue FROM orders'),
    query("SELECT COUNT(*)::int AS n FROM users WHERE created_at >= NOW() - INTERVAL '7 days'"),
    query("SELECT COUNT(*)::int AS n, COALESCE(SUM(total),0)::int AS revenue FROM orders WHERE placed_at >= NOW() - INTERVAL '24 hours'"),
  ]);
  res.json({
    users_total: u[0].n,
    users_last_7d: r[0].n,
    orders_total: o[0].n,
    revenue_total: o[0].revenue,
    orders_last_24h: today[0].n,
    revenue_last_24h: today[0].revenue,
  });
});

adminRouter.get('/signups', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 100, 500);
  const { rows } = await query(
    `SELECT u.id, u.email, u.name, u.avatar_url, u.phone, u.is_admin,
            u.created_at, u.updated_at,
            COUNT(DISTINCT o.id)::int AS orders_count,
            COALESCE(SUM(o.total),0)::int AS lifetime_value
       FROM users u
       LEFT JOIN orders o ON o.user_id = u.id
      GROUP BY u.id
      ORDER BY u.created_at DESC
      LIMIT $1`,
    [limit]
  );
  res.json(rows);
});

adminRouter.get('/orders', async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit) || 100, 500);
  const status = req.query.status;
  const params = [limit];
  let where = '';
  if (status) { params.push(status); where = `WHERE o.status = $2`; }
  const { rows } = await query(
    `SELECT o.id, o.total, o.status, o.step, o.placed_at,
            u.email AS user_email, u.name AS user_name, u.id AS user_id,
            COUNT(oi.id)::int AS items_count,
            COALESCE(SUM(oi.qty),0)::int AS units
       FROM orders o
       JOIN users u ON u.id = o.user_id
       LEFT JOIN order_items oi ON oi.order_id = o.id
       ${where}
      GROUP BY o.id, u.email, u.name, u.id
      ORDER BY o.placed_at DESC
      LIMIT $1`,
    params
  );
  res.json(rows);
});

adminRouter.get('/orders/:id', async (req, res) => {
  const { rows: [order] } = await query(
    `SELECT o.*, u.email AS user_email, u.name AS user_name,
            a.label, a.name AS ship_name, a.line, a.city, a.state, a.pin, a.phone AS ship_phone
       FROM orders o
       JOIN users u ON u.id = o.user_id
       LEFT JOIN addresses a ON a.id = o.address_id
      WHERE o.id = $1`,
    [req.params.id]
  );
  if (!order) return res.status(404).json({ error: 'not_found' });
  const { rows: items } = await query(
    'SELECT * FROM order_items WHERE order_id = $1 ORDER BY name',
    [order.id]
  );
  res.json({ ...order, items });
});

// ---- Products ----

const PRODUCT_FIELDS = [
  'id', 'name', 'sub', 'material', 'kind', 'category_id',
  'price', 'mrp', 'rating', 'reviews', 'finish', 'size', 'badge',
  'description', 'long_description', 'images',
];

function normalizeProductBody(body) {
  const out = {};
  for (const f of PRODUCT_FIELDS) {
    if (body[f] === undefined) continue;
    let v = body[f];
    if (f === 'finish' || f === 'size' || f === 'images') {
      if (typeof v === 'string') v = v.split(',').map(s => s.trim()).filter(Boolean);
      if (!Array.isArray(v)) v = [];
    }
    if (f === 'price' || f === 'mrp' || f === 'reviews') v = v == null || v === '' ? null : parseInt(v, 10);
    if (f === 'rating') v = v == null || v === '' ? null : parseFloat(v);
    if (v === '') v = null;
    out[f] = v;
  }
  return out;
}

adminRouter.get('/products', async (_req, res) => {
  const { rows } = await query(
    `SELECT p.*, c.name AS category_name
       FROM products p
       LEFT JOIN categories c ON c.id = p.category_id
      ORDER BY p.created_at DESC`
  );
  res.json(rows);
});

adminRouter.get('/products/:id', async (req, res) => {
  const { rows } = await query('SELECT * FROM products WHERE id = $1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'not_found' });
  res.json(rows[0]);
});

adminRouter.post('/products', async (req, res) => {
  const data = normalizeProductBody(req.body);
  if (!data.id || !data.name || data.price == null) {
    return res.status(400).json({ error: 'id, name, and price are required' });
  }
  const cols = Object.keys(data);
  const placeholders = cols.map((_, i) => `$${i + 1}`);
  const values = cols.map(c => data[c]);
  try {
    const { rows } = await query(
      `INSERT INTO products (${cols.join(', ')}) VALUES (${placeholders.join(', ')}) RETURNING *`,
      values
    );
    res.json(rows[0]);
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'product id already exists' });
    console.error(e);
    res.status(500).json({ error: 'create_failed', detail: e.message });
  }
});

adminRouter.patch('/products/:id', async (req, res) => {
  const data = normalizeProductBody(req.body);
  delete data.id;
  const cols = Object.keys(data);
  if (!cols.length) return res.status(400).json({ error: 'no_fields' });
  const sets = cols.map((c, i) => `${c} = $${i + 1}`);
  const values = cols.map(c => data[c]);
  values.push(req.params.id);
  const { rows } = await query(
    `UPDATE products SET ${sets.join(', ')}, updated_at = NOW()
      WHERE id = $${values.length} RETURNING *`,
    values
  );
  if (!rows[0]) return res.status(404).json({ error: 'not_found' });
  res.json(rows[0]);
});

adminRouter.delete('/products/:id', async (req, res) => {
  const r = await query('DELETE FROM products WHERE id = $1', [req.params.id]);
  if (!r.rowCount) return res.status(404).json({ error: 'not_found' });
  res.json({ ok: true });
});

adminRouter.get('/categories', async (_req, res) => {
  const { rows } = await query('SELECT * FROM categories ORDER BY name');
  res.json(rows);
});

adminRouter.patch('/orders/:id', async (req, res) => {
  const { status, step } = req.body;
  const fields = [];
  const params = [];
  if (status) { params.push(status); fields.push(`status = $${params.length}`); }
  if (step != null) { params.push(step); fields.push(`step = $${params.length}`); }
  if (!fields.length) return res.status(400).json({ error: 'no_fields' });
  params.push(req.params.id);
  const { rows: [order] } = await query(
    `UPDATE orders SET ${fields.join(', ')} WHERE id = $${params.length} RETURNING *`,
    params
  );
  if (!order) return res.status(404).json({ error: 'not_found' });
  res.json(order);
});
