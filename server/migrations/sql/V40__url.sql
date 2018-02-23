CREATE FUNCTION help_private.stringify_bigint(n bigint) RETURNS text AS $$
DECLARE
  alphabet text:='abcdefghjkmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
  base int:=length(alphabet); 
  _n bigint:=abs(n);
  output text:='';
BEGIN
  LOOP
    output := output || substr(alphabet, 1+(_n%base)::int, 1);
    _n := _n / base; 
    EXIT WHEN _n=0;
  END LOOP;
  RETURN output;
END $$ LANGUAGE plpgsql IMMUTABLE STRICT;

CREATE SEQUENCE help.url_sequence;

CREATE TABLE help.url (
    id text PRIMARY KEY default help_private.stringify_bigint(help_private.pseudo_encrypt(nextval('help.url_sequence')::int)),
    ticket_id bigint not null,
    metadata jsonb,
    url text not null,
    unique (ticket_id, metadata)
);