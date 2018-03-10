alter table help.address
add column geom geometry(Point, 4326),
drop column long,
drop column lat;

alter table help.group
drop column long,
drop column lat;

comment on column help.address.geom is 'the raw location data, expects a postgis point, as SRID=4326;POINT(25800 256000) long lat, will return hex value of the location, use coordinates to get json of the points.';

create function help.address_coordinates(a help.address)
returns jsonb as $$
  select ST_AsGeoJSON(a.geom)::jsonb
$$ language sql stable;

comment on function help.address_coordinates (a help.address) is 'a coumputed column, that returns the geom field value, as a readable points json';

GRANT EXECUTE ON FUNCTION help.address_coordinates(a help.address) TO "SPECIALIST";
