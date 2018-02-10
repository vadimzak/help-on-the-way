CREATE TABLE help_private.social_account (
  person_id integer primary key references help.person(id) on delete cascade,
  type help_private.social_account_type,
  data jsonb
);