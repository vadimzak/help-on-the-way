alter table help.ticket_matched_volunteers rename to ticket_assigned_volunteers;

drop function if exists help."getTicketById"(bigint);
drop type if exists help.ticket_for_volunteer;

create or replace view help.ticket_for_volunteer as
SELECT
    ticket.*,
    (max_volunteers >= (select count(tbl.*) as total from help.ticket_assigned_volunteers tbl where tbl.ticket_id = ticket.id))::bool as can_be_assigned,
    elder.first_name as elder_first_name,
    elder.last_name as elder_last_name,
    elder.phone_number as elder_phone_number,
    elder.gender as elder_gender,
    start_address.city as start_address_city,
    start_address.street as start_address_street,
    start_address.house_number as start_address_house_number,
    start_address.enterance as start_address_enteranced,
    destination_address.city as destination_address_city,
    destination_address.street as destination_address_street,
    destination_address.house_number as destination_address_house_number,
    destination_address.enterance as destination_address_enteranced,
    end_address.city as end_address_city,
    end_address.street as end_address_street,
    end_address.house_number as end_address_house_number,
    end_address.enterance as end_address_enteranced
FROM
    help.ticket ticket
    left join help.person elder on ticket.elder_id = elder.id
    left join help.address start_address on ticket.start_address_id = start_address.id
    left join help.address destination_address on ticket.destination_address_id = destination_address.id
    left join help.address end_address on ticket.end_address_id = end_address.id;
    
create or replace function help."getTicketById"(ticket_id bigint) returns help.ticket_for_volunteer as $$
    select
        *
    from
        help.ticket_for_volunteer tbl
    where
        tbl.id = ticket_id;
$$ language sql strict security definer;

REVOKE ALL ON FUNCTION help."getTicketById"(ticket_id bigint) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION help."getTicketById"(ticket_id bigint) TO "VOLUNTEER";