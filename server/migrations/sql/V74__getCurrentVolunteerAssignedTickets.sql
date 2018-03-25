create or replace function help."getCurrentVolunteerAssignedTickets"() returns setof help.ticket_for_volunteer as $$
select t.* 
from 
	help.ticket_for_volunteer t
	inner join help.ticket_assigned_volunteers ta on ta.ticket_id = t.id
	inner join help.person p on p.id = ta.volunteer_id
where
	p.id = help_private.getCurrentUserId()
$$ language sql stable security definer;

REVOKE ALL ON FUNCTION help."getCurrentVolunteerAssignedTickets"() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION help."getCurrentVolunteerAssignedTickets"() TO "VOLUNTEER";