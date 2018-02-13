CREATE FUNCTION help.find_user_by_social (
  type help_private.social_account_type,
  p_id text
) RETURNS help.person as $$
  SELECT 
    person.* 
  FROM 
    help_private.social_account social_account
    inner join help.person person on social_account.person_id = person.id
  WHERE data #>> '{profile,id}' = p_id
  LIMIT 1;
$$ language sql strict security definer;
