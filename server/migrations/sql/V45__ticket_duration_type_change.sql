ALTER TABLE help.ticket
DROP COLUMN duration_eta,
ADD COLUMN duration_eta numeric(3,1);