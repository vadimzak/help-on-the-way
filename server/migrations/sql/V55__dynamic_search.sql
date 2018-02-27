grant usage on schema help_private to "SPECIALIST";

CREATE OR REPLACE FUNCTION help_private.create_where_clause_from_json(data jsonb)
RETURNS text AS $$
    var OPERATIORS_MAP = { 'gt': '>', 'gte': '>=', 'lt': '<', 'lte': '>=', 'ne': '!=', 'eq': '=', 'not': 'is not', 'like': 'like', 'notLike': 'not like', 'ilike': 'ilike', 'notilike': 'not ilike' };
    var COMPOSE_OPERATIORS_MAP = { 'or': 'OR', 'and': 'AND'};

    return build(data);

    function build(data) {
        if (typeof data == 'string') return "'" + data.replace(/'/g, "''") + "'";
        else if (typeof data !== 'object') return JSON.stringify(data);

        var dataKeys = Object.keys(data);
        if (dataKeys.length == 0) return 'true';
        if (dataKeys.length > 1) throw 'objects with multiple properties are unsupported';

        var key = dataKeys[0];
        var value = data[key];
        key = camelCaseToUnderscore(key);
        if (COMPOSE_OPERATIORS_MAP[key]) {
            return '(' + value.map(build).join(') ' + COMPOSE_OPERATIORS_MAP[key] + ' (') + ')';
        } else if (OPERATIORS_MAP[key]) {
            return ' ' + OPERATIORS_MAP[key] + ' ' + build(value) + ' ';
        } else if (typeof value !== 'object') {
            return ' ' + key + ' = ' + build(value) + ' ';
        } else {
            return ' ' + key + ' ' + build(value) + ' ';
        }
    }

    function camelCaseToUnderscore(myStr) {
        return myStr.replace( /([a-z])([A-Z])/g, '$1_$2' ).toLowerCase();
    }

$$ LANGUAGE plv8;
GRANT EXECUTE ON FUNCTION help_private.create_where_clause_from_json(data jsonb) TO "SPECIALIST";

CREATE OR REPLACE FUNCTION help_private.get_table_results_by_dynamic_conditions(data jsonb, table_name text, _table_type anyelement)
RETURNS SETOF anyelement AS $$
    var where = plv8.execute('select help_private.create_where_clause_from_json($1) as value', data)[0].value;
    return plv8.execute('select * from ' + table_name + ' WHERE ' + where);
$$ LANGUAGE plv8;
GRANT EXECUTE ON FUNCTION help_private.get_table_results_by_dynamic_conditions(data jsonb, table_name text, _table_type anyelement) TO "SPECIALIST";

CREATE OR REPLACE FUNCTION help.get_ticket_by_condition(data jsonb)
RETURNS SETOF help.ticket AS $$
    return plv8.execute('select * from help_private.get_table_results_by_dynamic_conditions($1, \'help.ticket\', null::help.ticket)', data);
$$ LANGUAGE plv8;
