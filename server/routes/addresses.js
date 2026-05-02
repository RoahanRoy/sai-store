import { Router } from 'express';
import { query } from '../db/pool.js';
import { requireAuth } from '../auth.js';

export const addressesRouter = Router();
addressesRouter.use(requireAuth);

const ALLOWED_PIN = '248001';
const ALLOWED_CITY = 'dehradun';

function validate(body) {
  const { name, line, city, pin } = body || {};
  if (!name || !line || !city || !pin) return 'missing fields';
  if (String(pin).trim() !== ALLOWED_PIN) return `We only deliver to PIN ${ALLOWED_PIN} (Dehradun) at this time.`;
  if (String(city).trim().toLowerCase() !== ALLOWED_CITY) return 'City must be Dehradun.';
  return null;
}

addressesRouter.get('/', async (req, res) => {
  const { rows } = await query(
    'SELECT * FROM addresses WHERE user_id = $1 ORDER BY is_default DESC, created_at',
    [req.user.id]
  );
  res.json(rows);
});

addressesRouter.post('/', async (req, res) => {
  const err = validate(req.body);
  if (err) return res.status(400).json({ error: err });
  const { label, name, line, city, state, pin, phone, is_default } = req.body;
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

addressesRouter.put('/:id', async (req, res) => {
  const err = validate(req.body);
  if (err) return res.status(400).json({ error: err });
  const { label, name, line, city, state, pin, phone, is_default } = req.body;
  if (is_default) {
    await query('UPDATE addresses SET is_default = FALSE WHERE user_id = $1', [req.user.id]);
  }
  const { rows } = await query(
    `UPDATE addresses SET label=$1, name=$2, line=$3, city=$4, state=$5, pin=$6, phone=$7, is_default=$8
     WHERE id=$9 AND user_id=$10 RETURNING *`,
    [label, name, line, city, state, pin, phone, !!is_default, req.params.id, req.user.id]
  );
  if (!rows[0]) return res.status(404).json({ error: 'not found' });
  res.json(rows[0]);
});

addressesRouter.delete('/:id', async (req, res) => {
  await query('DELETE FROM addresses WHERE id = $1 AND user_id = $2', [req.params.id, req.user.id]);
  res.json({ ok: true });
});
