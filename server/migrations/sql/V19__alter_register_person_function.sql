DROP FUNCTION help.register_person;

CREATE FUNCTION help.register_person (
  first_name text,
  last_name text,
  type help_private.social_account_type,
  data jsonb
) RETURNS help.person as $$
DECLARE
  person help.person;
BEGIN
  INSERT INTO help.person (first_name, last_name, type) VALUES
    (first_name, last_name, 'volunteer')
    RETURNING * INTO person;

  INSERT INTO help_private.social_account (person_id, type, data) VALUES
    (person.id, type, data);

  return person;
end;
$$ language plpgsql strict security definer;