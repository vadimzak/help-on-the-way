alter table help.ticket ALTER COLUMN max_volunteers SET DEFAULT 1;
update help.ticket set max_volunteers=1 where max_volunteers is null;

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
$$ language plv8 security definer;

REVOKE ALL ON FUNCTION help."assignCurrentUserToTicket"(ticket_id bigint) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION help."assignCurrentUserToTicket"(ticket_id bigint) TO "VOLUNTEER";