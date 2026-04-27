-- Extra fields needed for full product detail editing
ALTER TABLE products ADD COLUMN IF NOT EXISTS description       TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS long_description  TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS images            TEXT[] NOT NULL DEFAULT '{}';
