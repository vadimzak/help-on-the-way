create table help.persons_relation (
    elder_id integer references help.person(id),
    person_id integer references help.person(id),
    type help.person_relation_type not null,
    constraint elder_person_id PRIMARY KEY (elder_id, person_id)
);
