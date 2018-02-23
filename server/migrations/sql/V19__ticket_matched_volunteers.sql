create table help.ticket_matched_volunteers (
    ticket_id bigint references help.ticket(id),
    volunteer_id integer references help.person(id),
    constraint ticket_volunteer_id PRIMARY KEY (ticket_id, volunteer_id)
);
