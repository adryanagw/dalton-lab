/**
 * Shared Neon Postgres client for the /api serverless functions.
 * Uses @neondatabase/serverless's HTTP-based driver, which needs no
 * connection pooling management — a good fit for short-lived Vercel
 * function invocations.
 *
 * Reads whichever connection-string env var is present: Vercel's native
 * Neon integration (Storage tab -> Connect Database -> Neon) sets
 * DATABASE_URL automatically, but different setups name it differently,
 * so a few common aliases are accepted as fallbacks.
 */
const { neon } = require('@neondatabase/serverless');

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL_NON_POOLING;

if (!connectionString) {
  // Don't throw at module load time (would break every function's cold
  // start with an opaque crash) — let callers surface a clear error
  // instead, via the `sql` proxy below.
  console.error('No database connection string found (DATABASE_URL not set).');
}

const sql = connectionString
  ? neon(connectionString)
  : function unconfiguredSql() {
      throw new Error('DATABASE_URL is not configured on this deployment.');
    };

let schemaEnsured = false;

/**
 * Idempotent CREATE TABLE IF NOT EXISTS for every table this app needs.
 * Called from the entry-point endpoints (login, admin login) so a fresh
 * Neon database self-provisions on first real use — no manual SQL paste
 * required. Cheap after the first run: cached per warm function instance,
 * and CREATE TABLE IF NOT EXISTS is a fast no-op once tables exist.
 */
async function ensureSchema() {
  if (schemaEnsured) return;

  await Promise.all([
    sql`
      CREATE TABLE IF NOT EXISTS users (
        id            SERIAL PRIMARY KEY,
        username      TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        nama          TEXT NOT NULL,
        expires_at    TIMESTAMPTZ,
        created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `,
    sql`
      CREATE TABLE IF NOT EXISTS orders (
        id           SERIAL PRIMARY KEY,
        order_id     TEXT UNIQUE NOT NULL,
        username     TEXT NOT NULL,
        nama         TEXT NOT NULL,
        whatsapp     TEXT NOT NULL,
        paket        TEXT NOT NULL,
        durasi_hari  INTEGER NOT NULL,
        harga        INTEGER NOT NULL,
        status       TEXT NOT NULL DEFAULT 'pending',
        created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
        approved_at  TIMESTAMPTZ,
        new_password TEXT
      )
    `,
    sql`
      CREATE TABLE IF NOT EXISTS progress (
        username   TEXT NOT NULL,
        bab_id     TEXT NOT NULL,
        status     TEXT NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        PRIMARY KEY (username, bab_id)
      )
    `,
    sql`
      CREATE TABLE IF NOT EXISTS quiz_results (
        id          SERIAL PRIMARY KEY,
        username    TEXT,
        nama        TEXT,
        kelas       TEXT,
        subject     TEXT NOT NULL,
        bab_id      TEXT NOT NULL,
        skor        INTEGER NOT NULL,
        total       INTEGER NOT NULL,
        persentase  INTEGER NOT NULL,
        topik       TEXT,
        level       TEXT,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
  ]);

  await Promise.all([
    sql`CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status)`,
    sql`CREATE INDEX IF NOT EXISTS idx_quiz_results_username ON quiz_results (username)`
  ]);

  schemaEnsured = true;
}

module.exports = { sql, ensureSchema };
