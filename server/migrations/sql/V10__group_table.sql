create table help.group (
    id serial primary key,
    type help.group_type not null,
    lat float,
    long float,
    radius float,
    channels text
);