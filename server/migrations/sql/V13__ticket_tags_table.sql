create table help.ticket_tags (
    constraint ticket_tag primary key (ticket_id, tag_id),
    ticket_id uuid not null references help.ticket(id),
    tag_id integer not null references help.tag_value(id)
);