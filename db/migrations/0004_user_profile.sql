-- Extra profile fields collected at signup or in account settings.
ALTER TABLE users ADD COLUMN IF NOT EXISTS dob DATE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS gender TEXT;
