CREATE TABLE help_private.person_account (
  person_id integer primary key references help.person(id) on delete cascade,
  username text not null,
  password_hash text not null
);