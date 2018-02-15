create table help.tag_value (
    id serial primary key,
    value text not null,
    type integer not null references help.tag_type(id)
);