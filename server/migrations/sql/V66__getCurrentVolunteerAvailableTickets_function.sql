create or replace function help."getCurrentVolunteerAvailableTickets"() returns help.ticket_for_volunteer as $$
select t.* 
from 
	help.ticket_for_volunteer t
	inner join help.ticket_groups tg on tg.ticket_id = t.id
	inner join help.group g on g.id = tg.group_id
	inner join help.group_volunteers gv on tg.group_id = g.id
	inner join help.person p on p.id = gv.volunteer_id
where
	p.id = help_private.getCurrentUserId()
	and t.status = 'open'
$$ language sql stable security definer;
