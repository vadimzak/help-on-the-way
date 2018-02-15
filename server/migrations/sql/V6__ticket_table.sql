CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

create table help.ticket (
    id uuid primary key default uuid_generate_v1(),
    elder_id integer not null references help.person(id),
    description text,
    duration_eta text,
    issuing_institue text,
    due_date timestamp,
    start_address_id integer not null references help.address(id),
    destination_address_id integer references help.address(id),
    end_address_id integer references help.address(id),
    status help.ticket_status not null,
    created_by integer not null references help.person(id),
    max_volunteers int
);