CREATE OR REPLACE FUNCTION help.get_person_by_condition(data jsonb)
RETURNS SETOF help.person AS $$
    return plv8.execute('select * from help_private.get_table_results_by_dynamic_conditions($1, \'help.person\', null::help.person)', data);
$$ LANGUAGE plv8;
