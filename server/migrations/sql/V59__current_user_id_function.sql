insert into help.person (id, first_name, last_name, type) values (0, 'Administrator', '', 'specialist');

create or replace function help_private.getCurrentUserId() returns int as $$
    var result, rows;
    try {
        rows = plv8.execute( "select current_setting('jwt.claims.person_id') as person_id");
        if (rows && rows[0] && rows[0].person_id) {
            result = rows[0].person_id;
        };
    } catch (e) {
        rows = plv8.execute( "select current_setting('role') as role");
        if (rows && rows[0] && rows[0].role == 'postgres') {
            result = 0;
        }
    }
    if (result == undefined) {
        throw 'no current user';
    }
    return result;
$$ language plv8;

create or replace function help_private.update_created_by() returns trigger as $$
  var rows = plv8.execute( "select help_private.getCurrentUserId() as person_id");

  if (!rows || rows.length == 0) {
      return NEW;
  }

  NEW.created_by = rows[0].person_id;
  return NEW;
$$ language plv8;
