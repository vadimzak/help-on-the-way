CREATE OR REPLACE FUNCTION help.get_address (address help.address) RETURNS help.address as $$
    var emptyAddressColumns = { city: '', street: '', house_number: '', enterance: '', floor: -100 };
    var columns = plv8.execute("SELECT column_name FROM information_schema.columns WHERE table_schema = 'help' AND table_name = 'address' and not column_name = 'id'").map(function(x){
        return x.column_name;
    });
    var firstColumn = columns[0];
    var columnsStr = columns.join();
    var columnsValuesStr = columns.map(function(x, i){
        return '$' + (i+1);
    }).join();
    var valuesArr = columns.map(function(x){
        return address[x] || emptyAddressColumns[x];
    });
    var sql = "insert into help.address (" + columnsStr + ") values (" + columnsValuesStr + ") on conflict on constraint unique_address do update set " + 
        firstColumn + " = $1 returning *";

    var rows = plv8.execute(sql, valuesArr);

    return rows[0];
$$ LANGUAGE plv8;

create or replace function help.address_location(a help.address)
returns jsonb as $$
declare
	geo_json jsonb;
begin
select help.ST_AsGeoJSON(a.geom)::jsonb into geo_json;
 return (select json_build_object(
  'lat', geo_json->'coordinates'->>1,
  'lng', geo_json->'coordinates'->>0
  ));
end;
$$ language plpgsql strict stable;
comment on function help.address_location (a help.address) is 'a coumputed column, that returns the geom field value, as a readable points json';
