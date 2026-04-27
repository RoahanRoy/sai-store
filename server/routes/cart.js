import { Router } from 'express';
import { query } from '../db/pool.js';
import { requireAuth } from '../auth.js';

export const cartRouter = Router();

cartRouter.use(requireAuth);

cartRouter.get('/', async (req, res) => {
  const { rows } = await query(
    `SELECT c.id, c.product_id, c.size, c.finish, c.qty,
            p.name, p.price, p.mrp, p.material, p.kind
     FROM cart_items c
     JOIN products p ON p.id = c.product_id
     WHERE c.user_id = $1
     ORDER BY c.created_at`,
    [req.user.id]
  );
  res.json(rows);
});

cartRouter.post('/', async (req, res) => {
  const { product_id, size, finish, qty = 1 } = req.body;
  if (!product_id) return res.status(400).json({ error: 'product_id required' });
  const { rows } = await query(
    `INSERT INTO cart_items (user_id, product_id, size, finish, qty)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (user_id, product_id, size, finish)
     DO UPDATE SET qty = cart_items.qty + EXCLUDED.qty
     RETURNING *`,
    [req.user.id, product_id, size || null, finish || null, qty]
  );
  res.json(rows[0]);
});

cartRouter.patch('/:id', async (req, res) => {
  const { qty } = req.body;
  if (!qty || qty < 1) return res.status(400).json({ error: 'qty must be >= 1' });
  const { rows } = await query(
    'UPDATE cart_items SET qty = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
    [qty, req.params.id, req.user.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'not_found' });
  res.json(rows[0]);
});

cartRouter.delete('/:id', async (req, res) => {
  await query('DELETE FROM cart_items WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
  res.json({ ok: true });
});

cartRouter.delete('/', async (req, res) => {
  await query('DELETE FROM cart_items WHERE user_id = $1', [req.user.id]);
  res.json({ ok: true });
});
