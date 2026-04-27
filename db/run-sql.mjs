// Tiny SQL runner: node db/run-sql.mjs <file.sql> [<file.sql> ...]
// Reads DATABASE_URL from env or .env
import { readFileSync } from 'node:fs';
import { config } from 'dotenv';
import pg from 'pg';

config();
const url = process.env.DATABASE_URL;
if (!url) { console.error('DATABASE_URL is not set'); process.exit(1); }

const files = process.argv.slice(2);
if (!files.length) { console.error('Usage: node db/run-sql.mjs <file.sql> [...]'); process.exit(1); }

const client = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await client.connect();
for (const f of files) {
  const sql = readFileSync(f, 'utf8');
  console.log(`→ applying ${f}`);
  await client.query(sql);
}
await client.end();
console.log('✓ done');
