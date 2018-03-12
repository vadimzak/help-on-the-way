DROP TABLE help.url;
DROP SEQUENCE help.url_sequence;

CREATE SEQUENCE help_private.url_sequence;

CREATE TABLE help_private.url (
    id TEXT PRIMARY KEY default help_private.stringify_bigint(help_private.pseudo_encrypt(nextval('help_private.url_sequence')::int)),
    metadata jsonb,
    url TEXT NOT NULL,
    unique (metadata, url)
);

CREATE EXTENSION IF NOT EXISTS plv8;

CREATE FUNCTION help.get_short_url (
  metadata jsonb
) RETURNS TEXT as $$
    if (!metadata.ticket_id) throw 'metadata must have ticket_id property.';

    var url = 'https://app.dorldor.org.il/ticket/' + metadata.ticket_id;
    var rows = plv8.execute( "SELECT id from help_private.url where metadata = $1 and url = $2", metadata, url);

    if (rows.length == 0) {
        rows = plv8.execute( "INSERT into help_private.url (metadata, url) values ($1, $2) returning id", metadata, url);
    }

    return 'https://url.dorldor.org.il/' + rows[0].id;
$$ LANGUAGE plv8;
