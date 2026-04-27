import { Router } from 'express';
import { query } from '../db/pool.js';
import { requireAuth } from '../auth.js';

export const addressesRouter = Router();
addressesRouter.use(requireAuth);

addressesRouter.get('/', async (req, res) => {
  const { rows } = await query(
    'SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at',
    [req.user.id]
  );
  res.json(rows);
});

addressesRouter.post('/', async (req, res) => {
  const { label, name, line, city, state, pin, phone, is_default } = req.body;
  if (!name || !line || !city || !state || !pin) {
    return res.status(400).json({ error: 'missing fields' });
  }
  if (is_default) {
    await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [req.user.id]);
  }
  const { rows } = await query(
    `INSERT INTO addresses (user_id, label, name, line, city, state, pin, phone, is_default)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [req.user.id, label, name, line, city, state, pin, phone, !!is_default]
  );
  res.json(rows[0]);
});

addressesRouter.delete('/:id', async (req, res) => {
  await query('DELETE FROM addresses WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
  res.json({ ok: true });
});
