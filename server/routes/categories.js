import { Router } from 'express';
import { query } from '../db/pool.js';

export const categoriesRouter = Router();

categoriesRouter.get('/', async (_req, res) => {
  const { rows } = await query('SELECT * FROM categories ORDER BY name');
  res.json(rows);
});
