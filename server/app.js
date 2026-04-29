import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import ConnectPgSimple from 'connect-pg-simple';
import passport from 'passport';
import cors from 'cors';
import { pool } from './db/pool.js';
import { configurePassport, isAdminUser } from './auth.js';
import { productsRouter } from './routes/products.js';
import { categoriesRouter } from './routes/categories.js';
import { cartRouter } from './routes/cart.js';
import { addressesRouter } from './routes/addresses.js';
import { ordersRouter } from './routes/orders.js';
import { adminRouter } from './routes/admin.js';

const app = express();

const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
const isProd = process.env.NODE_ENV === 'production' || !!process.env.VERCEL;

if (isProd) app.set('trust proxy', 1);

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

const PgSession = ConnectPgSimple(session);
app.use(session({
  store: new PgSession({ pool, tableName: 'session', createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'lax' : 'lax',
    maxAge: 1000 * 60 * 60 * 24 * 30,
  },
}));

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: `${CLIENT_ORIGIN}/?login=failed` }),
  (_req, res) => res.redirect(`${CLIENT_ORIGIN}/?login=success`));

app.post('/auth/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => res.json({ ok: true }));
  });
});

function publicUser(u) {
  if (!u) return null;
  const { id, email, name, avatar_url, phone, dob, gender, created_at } = u;
  return {
    id, email, name, avatar_url, phone, dob, gender, created_at,
    is_admin: isAdminUser(u),
    profile_complete: !!(name && phone && dob),
  };
}

app.get('/auth/me', (req, res) => {
  res.json(publicUser(req.user));
});

app.patch('/auth/me', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'unauthorized' });
  const { name, phone, dob, gender } = req.body || {};
  try {
    const { rows } = await pool.query(
      `UPDATE users SET
          name   = COALESCE($1, name),
          phone  = COALESCE($2, phone),
          dob    = COALESCE($3, dob),
          gender = COALESCE($4, gender),
          updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [name ?? null, phone ?? null, dob || null, gender ?? null, req.user.id]
    );
    res.json(publicUser(rows[0]));
  } catch (err) {
    console.error('[PATCH /auth/me]', err);
    const msg = err?.code === '42703'
      ? 'profile columns missing — run migration 0004_user_profile.sql'
      : (err?.message || 'update failed');
    res.status(500).json({ error: msg });
  }
});

app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/addresses', addressesRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

export default app;
