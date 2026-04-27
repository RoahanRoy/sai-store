import { Router } from 'express';
import { pool, query } from '../db/pool.js';
import { requireAuth } from '../auth.js';

export const ordersRouter = Router();
ordersRouter.use(requireAuth);

ordersRouter.get('/', async (req, res) => {
  const { rows } = await query(
    `SELECT o.*, COUNT(oi.id)::int AS items
     FROM orders o
     LEFT JOIN order_items oi ON oi.order_id = o.id
     WHERE o.user_id = $1
     GROUP BY o.id
     ORDER BY o.placed_at DESC`,
    [req.user.id]
  );
  res.json(rows);
});

ordersRouter.get('/:id', async (req, res) => {
  const { rows: [order] } = await query(
    'SELECT * FROM orders WHERE id = $1 AND user_id = $2',
    [req.params.id, req.user.id]
  );
  if (!order) return res.status(404).json({ error: 'not_found' });
  const { rows: items } = await query('SELECT * FROM order_items WHERE order_id = $1', [order.id]);
  res.json({ ...order, items });
});

// Place an order from current cart
ordersRouter.post('/', async (req, res) => {
  const { address_id } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { rows: cart } = await client.query(
      `SELECT c.product_id, c.size, c.finish, c.qty, p.name, p.price
       FROM cart_items c JOIN products p ON p.id = c.product_id
       WHERE c.user_id = $1`,
      [req.user.id]
    );
    if (cart.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'cart_empty' });
    }
    const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
    const orderId = `SAI-${Date.now().toString().slice(-7)}-${Math.floor(Math.random() * 9000 + 1000)}`;

    await client.query(
      `INSERT INTO orders (id, user_id, address_id, total, status, step)
       VALUES ($1, $2, $3, $4, 'Placed', 1)`,
      [orderId, req.user.id, address_id || null, total]
    );

    for (const it of cart) {
      await client.query(
        `INSERT INTO order_items (order_id, product_id, name, size, finish, qty, unit_price)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [orderId, it.product_id, it.name, it.size, it.finish, it.qty, it.price]
      );
    }
    await client.query('DELETE FROM cart_items WHERE user_id = $1', [req.user.id]);
    await client.query('COMMIT');
    res.json({ id: orderId, total, items: cart.length });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'order_failed' });
  } finally {
    client.release();
  }
});
