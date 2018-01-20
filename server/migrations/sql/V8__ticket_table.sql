create table help.ticket (
    id serial primary key,
    elder_id integer not null references help.person(id),
    description text,
    duration_eta text,
    issuing_institue text,
    due_date timestamp,
    address_id integer not null references help.address(id),
    status help.ticket_status not null,
    created_by integer not null references help.person(id),
    max_volunteers int
);