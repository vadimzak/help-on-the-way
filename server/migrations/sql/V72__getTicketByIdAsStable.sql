create or replace function help."getTicketByIdForVolunteer"(ticket_id bigint) returns help.ticket_for_volunteer as $$
    select
        *
    from
        help.ticket_for_volunteer tbl
    where
        tbl.id = ticket_id;
$$ language sql stable security definer;

REVOKE ALL ON FUNCTION help."getTicketByIdForVolunteer"(ticket_id bigint) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION help."getTicketByIdForVolunteer"(ticket_id bigint) TO "VOLUNTEER";