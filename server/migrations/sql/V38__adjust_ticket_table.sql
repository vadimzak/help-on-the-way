ALTER TABLE help.ticket
ADD COLUMN issuing_person integer references help.person(id),
ADD COLUMN is_indoor boolean,
ADD COLUMN is_urgent boolean,
ADD COLUMN fixed_due_date boolean,
ADD COLUMN category help.ticket_category_type,
ADD COLUMN sub_category help.ticket_sub_category_type,
ADD COLUMN transport help.ticket_transport_type,
ADD COLUMN elder_mobility help.elder_mobility_type,
ADD COLUMN created_at TIMESTAMP,
ALTER COLUMN created_at SET DEFAULT now(),
ADD COLUMN remarks jsonb,
ADD COLUMN details jsonb;


