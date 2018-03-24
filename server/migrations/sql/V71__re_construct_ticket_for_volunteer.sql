drop function if exists help."update_ticket_due_date_for_volunteer_by_id"(id bigint, due_date timestamp);
drop function if exists help."getTicketById"(ticket_id bigint);
drop function if exists help."assignCurrentUserToTicket"(id bigint, data jsonb);
drop function if exists help."getCurrentVolunteerAvailableTickets"();
drop function if exists help."update_ticket_for_volunteer_by_id"(id bigint, data jsonb);
drop view if exists help.ticket_for_volunteer;

alter table help.ticket alter column duration_eta  type int using duration_eta::int;
alter table help.ticket drop column if exists issuing_institue;

create or replace function help_private.getCurrentUserIdGracefully() returns int as $$
    try {
        result = plv8.execute( "help_private.getCurrentUserId()");
		return result;
    } catch (e) {
		return 0;
    }
    return result;
$$ language plv8;


create or replace view help.ticket_for_volunteer as
SELECT
    ticket.*,
    (max_volunteers >= (select count(tbl.*) as total from help.ticket_assigned_volunteers tbl where tbl.ticket_id = ticket.id))::bool as can_be_assigned,
    ((select count(tbl.*) as total from help.ticket_assigned_volunteers tbl where tbl.ticket_id = ticket.id and tbl.volunteer_id = help_private.getCurrentUserIdGracefully() and tbl.volunteer_id IS NOT NULL)) >= 1 as assigned_to_current_user,
    json_build_object('firstName',  elder.first_name, 'lastName', elder.last_name, 'phoneNumber', elder.phone_number, 'gender', elder.gender) as elder,
    json_strip_nulls(json_build_object('city', start_address.city, 'street', start_address.street, 'houseNumber', start_address.house_number, 'enterance', start_address.enterance, 'floor', start_address.floor, 'location', help.address_location(start_address))) as start_address,
    json_strip_nulls(json_build_object('city', destination_address.city, 'street', destination_address.street, 'houseNumber', destination_address.house_number, 'enterance', destination_address.enterance, 'floor', destination_address.floor, 'location', help.address_location(destination_address))) as destination_address,
    json_strip_nulls(json_build_object('city', end_address.city, 'street', end_address.street, 'houseNumber', end_address.house_number, 'enterance', end_address.enterance, 'floor', end_address.floor, 'location', help.address_location(end_address))) as end_address
FROM
    help.ticket ticket
    left join help.person elder on ticket.elder_id = elder.id
    left join help.address start_address on ticket.start_address_id = start_address.id
    left join help.address destination_address on ticket.destination_address_id = destination_address.id
    left join help.address end_address on ticket.end_address_id = end_address.id;
    

create or replace function help."getTicketByIdForVolunteer"(ticket_id bigint) returns help.ticket_for_volunteer as $$
    select
        *
    from
        help.ticket_for_volunteer tbl
    where
        tbl.id = ticket_id;
$$ language sql strict security definer;

REVOKE ALL ON FUNCTION help."getTicketByIdForVolunteer"(ticket_id bigint) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION help."getTicketByIdForVolunteer"(ticket_id bigint) TO "VOLUNTEER";

create or replace function help."getCurrentVolunteerAvailableTickets"() returns setof help.ticket_for_volunteer as $$
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

REVOKE ALL ON FUNCTION help."getCurrentVolunteerAvailableTickets"() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION help."getCurrentVolunteerAvailableTickets"() TO "VOLUNTEER";

create or replace function help."assignCurrentUserToTicket"(ticket_id bigint) returns void as $$
    var currentUserId = plv8.execute("select help_private.getCurrentUserId() as current_user_id")[0].current_user_id;
    var rows = plv8.execute(`
        select ticket.max_volunteers, assignee.volunteer_id as assignee_volunteer_id
        from help.ticket ticket left join help.ticket_assigned_volunteers assignee on ticket.id = assignee.ticket_id
        where ticket.id = $1;
    `, ticket_id);
    if (!rows || rows.length == 0) {
        throw 'ticket not found'
    }
    var maxVolunteers = parseInt(rows[0].max_volunteers);
    var isCurrentUserAssignedToTicket = rows.filter(function(x) { return x.assignee_volunteer_id == currentUserId }).length > 0;
    var numberOfAssignedVolunteers = rows.filter(function(x) { return x.assignee_volunteer_id !== null; }).length;

    if (isCurrentUserAssignedToTicket) {
        return;
    } else if (numberOfAssignedVolunteers >= maxVolunteers) {
        throw 'ticket already assigned';
    }

    plv8.execute('insert into help.ticket_assigned_volunteers (ticket_id, volunteer_id) values ($1, $2)', ticket_id, currentUserId);
    plv8.execute('update help.ticket set status = (case when coalesce(fixed_due_date, false) = false then \'matched\' else \'scheduled\' end)::help.ticket_status where id = $1', ticket_id);
$$ language plv8 security definer;

REVOKE ALL ON FUNCTION help."assignCurrentUserToTicket"(ticket_id bigint) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION help."assignCurrentUserToTicket"(ticket_id bigint) TO "VOLUNTEER";

CREATE OR REPLACE FUNCTION help.update_ticket_due_date_for_volunteer_by_id(id bigint, due_date timestamp)
RETURNS help.ticket_for_volunteer AS $$
    var scheduledStatus = 'scheduled';
    var allowedStatuses = ['matched', scheduledStatus];
    var currentStatus = plv8.execute("select status from help.ticket_for_volunteer where id = $1", id)[0].status;
    if (allowedStatuses.indexOf(currentStatus) == -1) throw 'ticket status "' + currentStatus + '" is not supported in: ' + allowedStatuses.join(', ');

    var data = {"due_date": due_date, status: scheduledStatus}

    plv8.execute("select help.update_ticket_for_volunteer_by_id($1, $2);", id, data);
$$ LANGUAGE plv8 security definer;
GRANT EXECUTE ON FUNCTION help.update_ticket_due_date_for_volunteer_by_id(id bigint, due_date timestamp) TO "VOLUNTEER";

CREATE OR REPLACE FUNCTION help.update_ticket_for_volunteer_by_id(id bigint, data jsonb)
RETURNS help.ticket_for_volunteer AS $$
    var ALLOWED_COLUMNS = ['due_date', 'status']

    if (!id || !data || Object.keys(data).length == 0) throw 'you must provide id and data to update';

    var transformedKeys = [];
    var values = [];
    Object.keys(data).forEach(function(key) { 
        var newKey = camelCaseToUnderscore(key);
        var value = data[key];
        transformedKeys.push(newKey);
        values.push(value);
    });

    var deniedColumns = transformedKeys.filter(function(key) { return ALLOWED_COLUMNS.indexOf(key) == -1 });
    if (deniedColumns.length > 0) throw 'columns "' + deniedColumns.join(',') + '" are not allowed for update';

    var currentUserId = plv8.execute( "select help_private.getCurrentUserId() as person_id")[0].person_id;
    var isVolunteerAllowedToTicket = plv8.execute('select 1 from help.ticket_assigned_volunteers tbl where tbl.ticket_id = $1 and tbl.volunteer_id = $2', id, currentUserId);
    if (isVolunteerAllowedToTicket.length == 0) throw 'user "' + currentUserId + '" is unauthorized for ticket ' + id;

    var relativeUpdateStatement = transformedKeys.map(function(key, i) { return key + ' = $' + (i+1) }).join(', ');
    var updateStatement = 'update help.ticket set ' + relativeUpdateStatement + ' where id = ' + id + ' returning *';
    plv8.execute(updateStatement, values);
    var rows = plv8.execute("select * from help.ticket_for_volunteer where id = $1", id);
    return rows ? rows[0] : null;

    function camelCaseToUnderscore(myStr) {
        return myStr.replace( /([a-z])([A-Z])/g, '$1_$2' ).toLowerCase();
    }
$$ LANGUAGE plv8 security definer;

REVOKE EXECUTE ON FUNCTION help.update_ticket_for_volunteer_by_id(id bigint, data jsonb) from "VOLUNTEER";
