create table help.ticket_groups (
    constraint ticket_group primary key (ticket_id, group_id),
    ticket_id bigint not null references help.ticket(id),
    group_id integer not null references help.group(id)
);