alter table help.ticket_assigned_volunteers
add column created_at timestamptz,
alter column created_at SET DEFAULT now();