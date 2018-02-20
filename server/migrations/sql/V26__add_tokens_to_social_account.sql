alter table help_private.social_account drop constraint social_account_pkey;
ALTER TABLE help_private.social_account ADD id serial primary key;
ALTER TABLE help_private.social_account ADD tokens jsonb;