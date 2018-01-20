CREATE FUNCTION help.register_person (
  first_name text,
  last_name text,
  phone_number text,
  city text,
  street text,
  house_number text,
  enterance text,
  username text,
  password text
) RETURNS help.person as $$
DECLARE
  person help.person;
  address help.address;
BEGIN
  INSERT INTO help.address (city, street, house_number, enterance) VALUES
    (city, street, house_number, enterance)
    RETURNING * INTO address;

  INSERT INTO help.person (first_name, last_name, phone_number, type, address_id) VALUES
    (first_name, last_name, phone_number, 'volunteer', address.id)
    RETURNING * INTO person;

  INSERT INTO help_private.person_account (person_id, username, password_hash) VALUES
    (person.id, username, password);
    -- (person.id, username, crypt(password, gen_salt('bf')));

  return person;
end;
$$ language plpgsql strict security definer;