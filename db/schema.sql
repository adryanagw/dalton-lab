-- Dalton Lab — Postgres schema (Neon).
--
-- This file is a reference / manual-run copy of the same statements
-- api/_db.js runs automatically (as CREATE TABLE IF NOT EXISTS) the first
-- time the app touches the database after DATABASE_URL is set — so you do
-- NOT have to paste this in by hand. It's kept here so the schema is
-- readable in one place and so you can re-run it yourself in the Neon SQL
-- editor if you ever want to inspect or reset things manually.

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  username      TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  nama          TEXT NOT NULL,
  expires_at    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id           SERIAL PRIMARY KEY,
  order_id     TEXT UNIQUE NOT NULL,
  username     TEXT NOT NULL,
  nama         TEXT NOT NULL,
  whatsapp     TEXT NOT NULL,
  paket        TEXT NOT NULL,
  durasi_hari  INTEGER NOT NULL,
  harga        INTEGER NOT NULL,
  status       TEXT NOT NULL DEFAULT 'pending', -- pending | approved
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  approved_at  TIMESTAMPTZ,
  new_password TEXT -- set once if approving created a brand-new account; shown to admin to relay via WhatsApp
);

CREATE TABLE IF NOT EXISTS progress (
  username   TEXT NOT NULL,
  bab_id     TEXT NOT NULL,
  status     TEXT NOT NULL, -- started | completed
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (username, bab_id)
);

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
  topik       TEXT, -- set for leveled-exercise submissions ("Latihan Bertingkat"), null for the plain chapter quiz
  level       TEXT, -- e.g. "Dasar" / "Menengah" / "Lanjutan", null for the plain chapter quiz
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_quiz_results_username ON quiz_results (username);
