CREATE ROLE "ANONYMOUS" WITH
  NOLOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE
  NOREPLICATION;

grant usage on schema help to "ANONYMOUS";