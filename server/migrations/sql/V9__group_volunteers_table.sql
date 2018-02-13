create table group_volunteers (
    group_id integer references help.group(id),
    volunteer_id integer references help.person(id),
    constraint id PRIMARY KEY (group_id, volunteer_id)
);
