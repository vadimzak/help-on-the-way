alter table help.ticket alter column created_by drop not null;

create function help_private.update_created_by() returns trigger as $$
  var rows = plv8.execute( "select current_setting('jwt.claims.person_id') as person_id");

  if (!rows || rows.length == 0) {
      return NEW;
  }

  NEW.created_by = rows[0].person_id;
  return NEW;
$$ language plv8;

CREATE TRIGGER update_ticket_created_by BEFORE INSERT ON help.ticket
FOR EACH ROW
EXECUTE PROCEDURE help_private.update_created_by();