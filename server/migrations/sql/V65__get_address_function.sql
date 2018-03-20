alter table help.address add constraint unique_address unique (city, street, house_number, enterance, floor, geom);

alter table help.address 
    alter column geom set not null;

update help.address set 
    city=coalesce(city, ''), 
    street=coalesce(street, ''),
    house_number=coalesce(house_number, ''), 
    enterance=coalesce(enterance, ''),
    floor=coalesce(floor, -100),
    geom=coalesce(geom, ST_SetSRID(ST_Point(29,34),4326));

CREATE OR REPLACE FUNCTION help.get_address (address help.address) RETURNS help.address as $$
    var emptyAddressColumns = { city: '', street: '', house_number: '', enterance: '', floor: -100 };
    var columns = plv8.execute("SELECT column_name FROM information_schema.columns WHERE table_schema = 'help' AND table_name = 'address' and not column_name = 'id'").map(function(x){
        return x.column_name;
    });
    var firstColumn = columns[0];
    var columnsStr = columns.join();
    var columnsValuesStr = columns.map(function(x, i){
        return '$' + (i+1).join();
    });
    var valuesArr = columns.map(function(x){
        return address[x] || emptyAddressColumns[x];
    });
    var sql = "insert into help.address (" + columnsStr + ") values (" + columnsValuesStr + ") on conflict on constraint unique_address do update set " + 
        firstColumn + " = $1 returning *";

    var rows = plv8.execute(sql, valuesArr);

    return rows[0];
$$ LANGUAGE plv8;
