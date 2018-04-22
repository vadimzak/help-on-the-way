CREATE OR REPLACE FUNCTION help.get_short_url (
  metadata jsonb
) RETURNS TEXT as $$
    if (!metadata.ticket_id) throw 'metadata must have ticket_id property.';
    if (!metadata.group_id) throw 'metadata must have group_id property.';

    var url = 'https://app.dorldor.org.il/#/ticket/' + metadata.ticket_id;
    var rows = plv8.execute( "SELECT id from help_private.url where metadata = $1 and url = $2", metadata, url);

    if (rows.length == 0) {
        rows = plv8.execute( "INSERT into help_private.url (metadata, url) values ($1, $2) returning id", metadata, url);
    }

    return 'https://url.dorldor.org.il/' + rows[0].id;
$$ LANGUAGE plv8 security definer;
