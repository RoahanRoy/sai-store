import { Router } from 'express';
import { query } from '../db/pool.js';

export const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  const { category, material } = req.query;
  const where = [];
  const params = [];
  if (category) { params.push(category); where.push(`category_id = $${params.length}`); }
  if (material) { params.push(material); where.push(`material = $${params.length}`); }
  const sql = `SELECT * FROM products ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at`;
  const { rows } = await query(sql, params);
  res.json(rows);
});

productsRouter.get('/:id', async (req, res) => {
  const { rows } = await query('SELECT * FROM products WHERE id = $1', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'not_found' });
  res.json(rows[0]);
});

productsRouter.get('/:id/reviews', async (req, res) => {
  const { rows } = await query(
    'SELECT id, name, loc, rating, title, body, created_at FROM reviews WHERE product_id = $1 ORDER BY created_at DESC',
    [req.params.id]
  );
  res.json(rows);
});
