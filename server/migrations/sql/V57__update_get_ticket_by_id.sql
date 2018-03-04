drop function if exists help."getTicketById"(bigint);
drop type help.ticket_for_volunteer;

create type help.ticket_for_volunteer as (
    ticket_id bigint,
    description text,
    duration_eta numeric(3,1),
    issuing_institue text,
    due_date timestamp,
    status help.ticket_status,
    max_volunteers integer,
    elder_id integer,
    elder_first_name text,
    elder_last_name text,
    elder_phone_number text,
    start_address_id integer,
    start_address_city text,
    start_address_street text,
    start_address_house_number text,
    start_address_enteranced text,
    destination_address_id integer,
    destination_address_city text,
    destination_address_street text,
    destination_address_house_number text,
    destination_address_enteranced text,
    end_address_id integer,
    end_address_city text,
    end_address_street text,
    end_address_house_number text,
    end_address_enteranced text
);

create or replace function help."getTicketById"(ticket_id bigint) returns help.ticket_for_volunteer as $$
SELECT 
	ticket.id as ticket_id, 
	ticket.description, 
	ticket.duration_eta, 
	ticket.issuing_institue, 
	ticket.due_date, 
	ticket.status,
	ticket.max_volunteers,

	elder.id as elder_id, 
	elder.first_name as elder_first_name,
	elder.last_name as elder_last_name, 
	elder.phone_number as elder_phone_number, 
    
    start_address.id as start_address_id, 
    start_address.city as start_address_city, 
    start_address.street as start_address_street, 
    start_address.house_number as start_address_house_number, 
    start_address.enterance as start_address_enteranced,
    
    destination_address.id as destination_address_id, 
    destination_address.city as destination_address_city, 
    destination_address.street as destination_address_street, 
    destination_address.house_number as destination_address_house_number, 
    destination_address.enterance as destination_address_enteranced,
    
    end_address.id as end_address_id, 
    end_address.city as end_address_city, 
    end_address.street as end_address_street, 
    end_address.house_number as end_address_house_number, 
    end_address.enterance as end_address_enteranced
FROM 
	help.ticket ticket
	left join help.person elder on ticket.elder_id = elder.id
	left join help.address start_address on ticket.start_address_id = start_address.id
	left join help.address destination_address on ticket.destination_address_id = destination_address.id
	left join help.address end_address on ticket.end_address_id = end_address.id
$$ language sql strict security definer;

REVOKE ALL ON FUNCTION help."getTicketById"(ticket_id bigint) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION help."getTicketById"(ticket_id bigint) TO "VOLUNTEER";