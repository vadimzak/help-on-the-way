CREATE SEQUENCE help.ticket_sequence;

create table help.ticket (
    id bigint primary key default help_private.pseudo_encrypt(nextval('help.ticket_sequence')::int),
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
