CREATE OR REPLACE FUNCTION help.update_ticket_for_volunteer_by_id(id bigint, data jsonb)
RETURNS help.ticket_for_volunteer AS $$
    var ALLOWED_COLUMNS = ['due_date', 'due_time', 'status']

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