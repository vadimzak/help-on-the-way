create table help.ticket_tags (
    constraint ticket_tag primary key (ticket_id, tag_id),
    ticket_id integer not null references help.ticket(id),
    tag_id integer not null reference help.tag_value(id)
);