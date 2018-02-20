CREATE FUNCTION help.get_or_create_user_by_social (
  profile_input jsonb,
  tokens_input jsonb
) RETURNS help.person as $$
DECLARE
  person_var help.person;
  social_account_var help_private.social_account;
BEGIN
  SELECT * INTO social_account_var 
  FROM help_private.social_account sa
  WHERE 
    (profile_input->>'provider')::help_private.social_account_type = sa.type
    AND (profile_input->>'id')::text = (sa.data->>'id')::text;

  IF social_account_var.person_id IS NOT NULL THEN
    UPDATE help_private.social_account 
    SET 
      data = profile_input, 
      tokens = tokens_input
    WHERE 
      id = social_account_var.id;

    SELECT * INTO person_var
    FROM help.person p 
    WHERE p.id = social_account_var.person_id;  
  ELSE
    INSERT INTO help.person (first_name, last_name, type) 
    VALUES (
      substr(profile_input->>'displayName', 1, strpos(profile_input->>'displayName', ' ') - 1),
      substr(profile_input->>'displayName', strpos(profile_input->>'displayName', ' ') + 1),
      'volunteer'
    )
    RETURNING * INTO person_var;

    INSERT INTO help_private.social_account (person_id, type, data, tokens) 
    VALUES
      (person_var.id, (profile_input->>'provider')::help_private.social_account_type, 
      profile_input, 
      tokens_input);
  END IF;
  RETURN person_var;
END;
$$ language plpgsql strict security definer;