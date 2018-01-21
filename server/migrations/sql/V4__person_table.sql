CREATE TABLE help.person (
  id serial primary key,
  first_name text not null check (char_length(first_name) < 80),
  last_name text check (char_length(last_name) < 80),
  phone_number text,
  address_id integer not null references help.address(id),
  type help.person_type
);