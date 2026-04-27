import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import ConnectPgSimple from 'connect-pg-simple';
import passport from 'passport';
import cors from 'cors';
import { pool } from './db/pool.js';
import { configurePassport } from './auth.js';
import { productsRouter } from './routes/products.js';
import { categoriesRouter } from './routes/categories.js';
import { cartRouter } from './routes/cart.js';
import { addressesRouter } from './routes/addresses.js';
import { ordersRouter } from './routes/orders.js';

const app = express();
const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());

const PgSession = ConnectPgSimple(session);
app.use(session({
  store: new PgSession({ pool, tableName: 'session', createTableIfMissing: true }),
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, secure: false, maxAge: 1000 * 60 * 60 * 24 * 30 },
}));

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

// Auth routes
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

app.get('/auth/me', (req, res) => {
  if (!req.user) return res.json(null);
  const { id, email, name, avatar_url, phone } = req.user;
  res.json({ id, email, name, avatar_url, phone });
});

// API
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/cart', cartRouter);
app.use('/api/addresses', addressesRouter);
app.use('/api/orders', ordersRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`▲ Sai Store API running on http://localhost:${PORT}`);
});
