DELETE FROM pg_enum
WHERE enumlabel = 'spouse_of'
AND enumtypid = (
  SELECT oid FROM pg_type WHERE typname = 'person_relation_type'
)