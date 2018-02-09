alter table help.ticket
rename address_id to start_address_id;

alter table help.ticket
add destination_address_id integer references help.address(id),
add end_address_id integer references help.address(id);